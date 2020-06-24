import React from 'react';
import { Input, Select, Button, notification, Modal } from 'antd';
import { connect } from 'dva';
import './style.less';

@connect(({ article, tag, category }) => ({
  article,
  tag,
  category,
}))
class ArticleCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      he: null,
      loading: false,
      keywordCom: '',
      pageNum: 1,
      pageSize: 50,
      changeType: false,
      title: '',
      author: 'Khari',
      keyword: '',
      desc: '',
      img_url: '',
      recommend: 0,
      origin: 0,
      owner: 0,
      state: 1,
      tags: '',
      tagsName: '',
      category: '',
      tagsDefault: [],
      categoryDefault: [],
      previewVisible: false,
      editorState: true,
    };
    this.handleSearchTag = this.handleSearchTag.bind(this);
    this.handleSearchCategory = this.handleSearchCategory.bind(this);
    // this.getSmdeValue = this.getSmdeValue.bind(this);
    // this.setSmdeValue = this.setSmdeValue.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleChangeState = this.handleChangeState.bind(this);
    this.handleTagChange = this.handleTagChange.bind(this);
    this.handleChangeOrigin = this.handleChangeOrigin.bind(this);
    this.handleChangeRecommend = this.handleChangeRecommend.bind(this);
    this.handleChangeOwner = this.handleChangeOwner.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.initContent = this.initContent.bind(this);
  }

  componentDidMount() {
    this.handleSearchTag();
    this.handleSearchCategory();
    // $('#editor2').froalaEditor({
    //   language: 'zh_cn',
    //   heightMin: 400,
    //   toolbarButtons: ['fullscreen', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'fontSize', 'color', 'inlineStyle', 'paragraphStyle', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', '|', 'insertLink','emoticons', 'insertImage', 'insertVideo', 'insertFile', 'insertTable', '|', 'quote', 'insertHR', 'undo', 'redo', 'clearFormatting', 'selectAll', 'html'],
    //   toolbarStickyOffset: 0,
    //   fontSizeSelection: true,
    // }).on('froalaEditor.contentChanged', function(e, editor){
    //   console.log(e);
    //   $('#preview').html(editor.html.get());
    // });

    if (this.state.editorState) {
      this.state.he = window.HE.getEditor('editorArticle', {
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
      });
    }
  }

  handleSubmit = () => {
    const { dispatch } = this.props;
    const { articleDetail } = this.props.article;
    if (!this.state.title) {
      notification.error({
        message: '文章标题不能为空',
      });
      return;
    }
    if (!this.state.keyword) {
      notification.error({
        message: '文章关键字不能为空',
      });
      return;
    }
    if (!this.state.he.getHtml()) {
      notification.error({
        message: '文章内容不能为空',
      });
      return;
    }
    let keyword = this.state.keyword;
    if (keyword instanceof Array) {
      keyword = keyword.join(',');
    }
    this.setState({
      loading: true,
    });
    // 修改
    if (this.state.changeType) {
      const params = {
        id: articleDetail._id,
        title: this.state.title,
        author: this.state.author,
        desc: this.state.desc,
        keyword,
        content: this.state.he.getHtml(),
        numbers: this.state.he.getText().length,
        img_url: this.state.img_url,
        recommend: this.state.recommend,
        origin: this.state.origin,
        owner: this.state.owner,
        state: this.state.state,
        tags: this.state.tags,
        tagsName: this.state.tagsName,
        category: this.state.category,
      };
      new Promise(resolve => {
        dispatch({
          type: 'article/updateArticle',
          payload: {
            resolve,
            params,
          },
        });
      }).then(res => {
        if (res.code === 0) {
          notification.success({
            message: res.message,
          });
          this.initContent();
          this.handleSearch(this.state.pageNum, this.state.pageSize);
        } else {
          notification.error({
            message: res.message,
          });
        }
      });
    } else {
      // 添加
      const params = {
        title: this.state.title,
        author: this.state.author,
        desc: this.state.desc,
        keyword: this.state.keyword,
        content: this.state.he.getHtml(),
        numbers: this.state.he.getText().length,
        img_url: this.state.img_url,
        recommend: this.state.recommend,
        origin: this.state.origin,
        owner: this.state.owner,
        state: this.state.state,
        tags: this.state.tags,
        tagsName: this.state.tagsName,
        category: this.state.category,
      };
      new Promise(resolve => {
        dispatch({
          type: 'article/addArticle',
          payload: {
            resolve,
            params,
          },
        });
      }).then(res => {
        if (res.code === 0) {
          notification.success({
            message: res.message,
          });
          this.initContent();
          this.setState({
            loading: false,
          });
        } else {
          notification.error({
            message: res.message,
          });
        }
      });
    }
  };

  initContent = () => {
    this.state.he.set('');
    this.state.he.show();
    this.setState({
      changeType: false,
      title: '',
      author: 'Khari',
      keyword: '',
      desc: '',
      img_url: '',
      recommend: 0,
      origin: 0,
      owner: 0,
      state: 1,
      tags: '',
      tagsName: '',
      category: '',
      tagsDefault: [],
      categoryDefault: [],
    });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleTagChange = (value, option) => {
    const tags = value.join();
    let tagsName = '';
    option.forEach(item => {
      tagsName += item.props.children + ',';
    });
    this.setState({
      tagsDefault: value,
      tags,
      tagsName,
    });
  };

  handleCategoryChange = value => {
    const category = value.join();
    this.setState({
      categoryDefault: value,
      category,
    });
  };

  handleChangeState = value => {
    this.setState({
      state: value,
    });
  };

  handleChangeOrigin = value => {
    this.setState({
      origin: value,
    });
  };

  handleChangeRecommend = value => {
    this.setState({
      recommend: value,
    });
  };

  handleChangeOwner = value => {
    this.setState({
      owner: value,
    });
  };

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

  showPreviewModal = () => {
    this.setState({
      previewVisible: true,
    });
  };

  hidePreviewModal = () => {
    this.setState({
      previewVisible: false,
    });
  };

  render() {
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
    let originDefault = '原创';
    let categoryDefault = [];
    let tagsDefault = [];
    let ownerDefault = '所有者';
    let recommendDefault = '不推荐';
    const normalCenter = {
      textAlign: 'center',
      marginBottom: 10,
    };

    return (
      <div className="createArticle">
        <Input
          style={normalCenter}
          addonBefore="文章标题"
          size="large"
          placeholder="文章标题"
          name="title"
          value={this.state.title}
          onChange={this.handleChange}
        />
        <Input
          style={normalCenter}
          addonBefore="文章作者"
          size="large"
          placeholder="文章作者"
          name="author"
          value={this.state.author}
          onChange={this.handleChange}
        />
        <Input
          style={normalCenter}
          addonBefore="关键字词"
          size="large"
          placeholder="关键字词（多个关键字词中文，分割）"
          name="keyword"
          value={this.state.keyword}
          onChange={this.handleChange}
        />
        <Input
          style={normalCenter}
          addonBefore="文章描述"
          size="large"
          placeholder="文章描述"
          name="desc"
          value={this.state.desc}
          onChange={this.handleChange}
        />
        <Input
          style={normalCenter}
          addonBefore="封面链接"
          size="large"
          placeholder="封面链接"
          name="img_url"
          value={this.state.img_url}
          onChange={this.handleChange}
        />

        <Select
          style={{ float: 'left', width: 200, marginBottom: 20 }}
          placeholder="选择文章转载状态"
          defaultValue={originDefault}
          onChange={this.handleChangeOrigin}
        >
          {/* 0 原创，1 转载，2 混合 */}
          <Select.Option value="0">原创</Select.Option>
          <Select.Option value="1">转载</Select.Option>
          <Select.Option value="2">混合</Select.Option>
        </Select>

        <Select
          style={{ float: 'left', width: 200, marginLeft: 10, marginBottom: 20 }}
          placeholder="选择文章所属人"
          defaultValue={ownerDefault}
          onChange={this.handleChangeOwner}
        >
          {/* 0 所有者，1 Khari，2 Yaru */}
          <Select.Option value="0">所有者</Select.Option>
          <Select.Option value="1">Khari</Select.Option>
          <Select.Option value="2">Yaru</Select.Option>
        </Select>

        <Select
          style={{ float: 'left', width: 200, marginLeft: 10, marginBottom: 20 }}
          placeholder="是否推荐"
          defaultValue={recommendDefault}
          onChange={this.handleChangeRecommend}
        >
          {/* 0 不推荐，1 推荐 */}
          <Select.Option value="0">不推荐</Select.Option>
          <Select.Option value="1">推荐</Select.Option>
        </Select>

        <Select
          allowClear
          mode="multiple"
          style={{ float: 'left', width: 200, marginLeft: 10, marginBottom: 20 }}
          placeholder="标签"
          defaultValue={tagsDefault}
          value={this.state.tagsDefault}
          onChange={this.handleTagChange}
        >
          {children}
        </Select>

        <Select
          allowClear
          mode="multiple"
          style={{ float: 'left', width: 200, marginLeft: 10, marginBottom: 20, marginRight: 10 }}
          placeholder="文章分类"
          defaultValue={categoryDefault}
          value={this.state.categoryDefault}
          onChange={this.handleCategoryChange}
        >
          {categoryChildren}
        </Select>
        <div>
          <Button
            onClick={() => {
              this.handleSubmit();
            }}
            loading={this.state.loading}
            style={{ marginBottom: '20px' }}
            type="primary"
          >
            提交
          </Button>
          {/* <Button
        onClick={() => {this.showPreviewModal();}}
        style={{ marginBottom: '10px',marginLeft:"10px"}}
        type="primary">
				预览
      </Button> */}
        </div>

        {/* <div width="1200px">
      <textarea id="editor2" style={{ marginBottom: 20, width: 800 }} size="large" rows={6} />
    </div> */}

        <textarea
          id="editorArticle"
          style={{ marginTop: 20, width: '100%' }}
          size="large"
          rows={6}
        />

        <Modal
          width="850px"
          title="Modal"
          visible={this.state.previewVisible}
          onOk={this.hidePreviewModal}
          onCancel={this.hidePreviewModal}
          okText="确认"
          cancelText="取消"
        >
          <div id="preview">预览</div>
        </Modal>
      </div>
    );
  }
}

export default ArticleCreate;
