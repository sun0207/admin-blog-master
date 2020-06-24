import React from 'react';
import { Input, Modal, Select, notification, Button } from 'antd';
import { connect } from 'dva';

@connect(({ article, tag, category }) => ({
  article,
  tag,
  category,
}))
class ArticleComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      he: null,
      loading: false,
      keywordCom: '',
      pageNum: 1,
      pageSize: 50,
      editorState: true,
      childContent: '',
    };
    this.handleSearchTag = this.handleSearchTag.bind(this);
    this.handleSearchCategory = this.handleSearchCategory.bind(this);
  }

  componentDidMount() {
    this.handleSearchTag();
    this.handleSearchCategory();
  }

  componentDidUpdate() {
    if (this.props.visible && this.state.editorState) {
      const heEditor = window.HE.getEditor('editorArticleRevise', {
        height: '400px',
        autoHeight: true,
        autoFloat: true,
        topOffset: 0,
        uploadPhoto: true,
        uploadPhotoHandler: '/api/uploadImg',
        uploadPhotoSize: 5 * 1024,
        uploadPhotoType: 'gif,png,jpg,jpeg',
        uploadPhotoSizeError: '不能上传大于5M的图片',
        uploadPhotoTypeError: '只能上传gif,png,jpg,jpeg格式的图片',
        lang: 'zh-jian',
        skin: 'HandyEditor',
        externalSkin: '',
        item: [
          'bold',
          'italic',
          'strike',
          'underline',
          'fontSize',
          'fontName',
          'paragraph',
          'color',
          'backColor',
          '|',
          'center',
          'left',
          'right',
          'full',
          'indent',
          'outdent',
          '|',
          'link',
          'unlink',
          'textBlock',
          'code',
          'selectAll',
          'removeFormat',
          'trash',
          '|',
          'image',
          'expression',
          'subscript',
          'superscript',
          'horizontal',
          'orderedList',
          'unorderedList',
          '|',
          'undo',
          'redo',
          '|',
          'html',
          '|',
        ],
      });
      this.setState({
        editorState: false,
        he: heEditor,
      });
    }
  }

  handleSearchTag = () => {
    this.setState({
      loading: true,
    });
    const { dispatch } = this.props;
    const params = {
      keyword: this.state.keywordCom,
      pageNum: this.state.pageNum,
      pageSize: this.state.pageSize,
    };
    new Promise(resolve => {
      dispatch({
        type: 'tag/queryTag',
        payload: {
          resolve,
          params,
        },
      });
    }).then(res => {
      // console.log('res :', res);
      if (res.code === 0) {
        this.setState({
          loading: false,
        });
      } else {
        notification.error({
          message: res.message,
        });
      }
    });
  };

  handleSearchCategory = () => {
    this.setState({
      loading: true,
    });
    const { dispatch } = this.props;
    const params = {
      keyword: this.state.keyword,
      pageNum: this.state.pageNum,
      pageSize: this.state.pageSize,
    };
    new Promise(resolve => {
      dispatch({
        type: 'category/queryCategory',
        payload: {
          resolve,
          params,
        },
      });
    }).then(res => {
      // console.log('res :', res);
      if (res.code === 0) {
        this.setState({
          loading: false,
        });
      } else {
        notification.error({
          message: res.message,
        });
      }
    });
  };

  render() {
    // 修改填充编辑器内容
    if (this.state.he) {
      let _this = this;
      let timer = setTimeout(function() {
        clearTimeout(timer);
        _this.state.he.set(_this.props.content);
        _this.state.he.show();
      }, 1000);
    }
    const { tagList } = this.props.tag;
    const { categoryList } = this.props.category;
    const children = [];
    const categoryChildren = [];
    for (let i = 0; i < tagList.length; i++) {
      const e = tagList[i];
      children.push(
        <Select.Option key={e._id} value={e._id}>
          {e.name}
        </Select.Option>
      );
    }
    for (let i = 0; i < categoryList.length; i++) {
      const e = categoryList[i];
      categoryChildren.push(
        <Select.Option key={e._id} value={e._id}>
          {e.name}
        </Select.Option>
      );
    }
    const { articleDetail } = this.props.article;
    const { changeType } = this.props;
    let originDefault = '原创';
    let stateDefault = '发布'; // 文章发布状态 => 0 草稿，1 发布
    let ownerDefault = '普通文章'; // 文章类型 => 1: 普通文章，2: 简历，3: 管理员介绍
    let categoryDefault = [];
    let tagsDefault = [];
    if (changeType) {
      originDefault = articleDetail.origin === 0 ? '原创' : '';
      stateDefault = articleDetail.state ? '已发布' : '草稿';
      ownerDefault =
        articleDetail.owner === 0 ? '所有者' : articleDetail.owner === 1 ? 'Khari' : 'Yaru';
      categoryDefault = this.props.categoryDefault;
      tagsDefault = this.props.tagsDefault;
    } else {
      originDefault = '原创';
      stateDefault = '发布'; // 文章发布状态 => 0 草稿，1 发布
      categoryDefault = [];
      tagsDefault = [];
    }
    // console.log('originDefault :', originDefault)
    // console.log('stateDefault :', stateDefault)
    // console.log('categoryDefault :', categoryDefault)
    // console.log('tagsDefault :', tagsDefault)
    const normalCenter = {
      textAlign: 'center',
      marginBottom: 20,
    };
    return (
      <div>
        <Modal
          title="添加与修改文章"
          visible={this.props.visible}
          onOk={this.props.handleOk}
          width="1200px"
          onCancel={this.props.handleCancel}
        >
          <Input
            style={normalCenter}
            addonBefore="文章标题"
            size="large"
            placeholder="文章标题"
            name="title"
            value={this.props.title}
            onChange={this.props.handleChange}
          />
          <Input
            style={normalCenter}
            addonBefore="文章作者"
            size="large"
            placeholder="文章作者"
            name="author"
            value={this.props.author}
            onChange={this.props.handleChangeAuthor}
          />
          <Input
            style={normalCenter}
            addonBefore="关键字词"
            size="large"
            placeholder="关键字（多个关键字词中文，分割）"
            name="keyword"
            value={this.props.keyword}
            onChange={this.props.handleChangeKeyword}
          />
          <Input
            style={normalCenter}
            addonBefore="文章描述"
            size="large"
            placeholder="文章描述"
            name="desc"
            value={this.props.desc}
            onChange={this.props.handleChangeDesc}
          />
          <Input
            style={normalCenter}
            addonBefore="封面链接"
            size="large"
            placeholder="封面链接"
            name="img_url"
            value={this.props.img_url}
            onChange={this.props.handleChangeImgUrl}
          />

          {this.props.changeType ? (
            <Select
              style={{ zIndex: 9999, width: 200, marginTop: 20, marginBottom: 20 }}
              placeholder="选择发布状态"
              defaultValue={stateDefault}
              onChange={this.props.handleChangeState}
            >
              {/*  0 草稿，1 发布 */}
              <Select.Option value="0">草稿</Select.Option>
              <Select.Option value="1">发布</Select.Option>
            </Select>
          ) : (
            ''
          )}

          <Select
            style={{ zIndex: 9999, width: 200, marginTop: 20, marginRight: 10, marginBottom: 20 }}
            placeholder="选择文章类型"
            defaultValue={ownerDefault}
            onChange={this.props.handleChangeOwner}
          >
            <Select.Option value="0">所有者</Select.Option>
            <Select.Option value="1">Khari</Select.Option>
            <Select.Option value="2">Yaru</Select.Option>
          </Select>

          <Select
            style={{ zIndex: 9999, width: 200, marginTop: 20, marginRight: 10, marginBottom: 20 }}
            placeholder="选择文章转载状态"
            defaultValue={originDefault}
            onChange={this.props.handleChangeOrigin}
          >
            {/* 0 原创，1 转载，2 混合 */}
            <Select.Option value="0">原创</Select.Option>
            <Select.Option value="1">转载</Select.Option>
            <Select.Option value="2">混合</Select.Option>
          </Select>

          <Select
            allowClear
            mode="multiple"
            style={{ zIndex: 9999, width: 200, marginTop: 20, marginRight: 10, marginBottom: 20 }}
            placeholder="标签"
            defaultValue={tagsDefault}
            value={this.props.tagsDefault}
            onChange={this.props.handleTagChange}
          >
            {children}
          </Select>
          <Select
            allowClear
            mode="multiple"
            style={{ zIndex: 9999, width: 200, marginTop: 20, marginRight: 10, marginBottom: 20 }}
            placeholder="文章分类"
            defaultValue={categoryDefault}
            value={this.props.categoryDefault}
            onChange={this.props.handleCategoryChange}
          >
            {categoryChildren}
          </Select>
          <Button
            onClick={() => {
              this.props.getChildContent(this.state.he.getHtml(), this.state.he.getText());
            }}
            style={{ marginTop: '3px', marginRight: '10px' }}
            type="primary"
          >
            更新内容
          </Button>
          {/* <TextArea
            style={{ marginBottom: 20 }}
            size="large"
            rows={6}
            autosize={{ minRows: 15 }}
            placeholder="文章内容，支持 markdown 格式"
            name="content"
            value={this.props.content}
            onChange={this.props.handleChangeContent}
          /> */}
          <textarea
            id="editorArticleRevise"
            style={{ marginTop: 20, width: '100%' }}
            size="large"
            rows={6}
          />
        </Modal>
      </div>
    );
  }
}

export default ArticleComponent;
