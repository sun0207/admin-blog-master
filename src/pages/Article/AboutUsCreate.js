import React from 'react';
import { Input, Modal, Select, Button, message } from 'antd';
import { connect } from 'dva';

@connect(({ article }) => ({
  article,
}))
class AboutUsCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      keyword: '',
      author: '',
      who: 0,
      desc: '',
      img_url: '',
      enabledState: 0,
      he: null,
      editorState: true,
      detailState: true,
    };
    this.getAboutDetail = this.getAboutDetail.bind(this);
    this.addAbout = this.addAbout.bind(this);
    this.initForm = this.initForm.bind(this);
    this.changeEnabledState = this.changeEnabledState.bind(this);
    this.changeWho = this.changeWho.bind(this);
    this.inputChange = this.inputChange.bind(this);
  }

  componentWillReceiveProps(props) {
    this.initForm();
    const { recordId, visible } = props;
    if (recordId !== '' && visible && this.state.detailState) {
      this.setState({
        detailState: false,
      });
      this.getAboutDetail(recordId);
    }
    if (!visible) {
      this.setState({ detailState: true });
    }
  }

  componentDidUpdate() {
    if (this.props.visible && this.state.editorState) {
      let heEditor = window.HE.getEditor('editorAbout', {
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

  getAboutDetail = id => {
    const { dispatch } = this.props;
    const params = {
      id,
    };
    new Promise(resolve => {
      dispatch({
        type: 'article/getAboutDetail',
        payload: {
          resolve,
          params,
        },
      });
    }).then(res => {
      this.setState({
        title: res.data.title,
        keyword: res.data.keyword.join(','),
        author: res.data.author,
        who: res.data.who,
        desc: res.data.desc,
        img_url: res.data.img_url,
        enabledState: res.data.enabledState,
      });
      this.state.he.set(res.data.content);
    });
  };

  addAbout = () => {
    const { dispatch, recordId } = this.props;
    const params = {
      id: recordId,
      title: this.state.title,
      keyword: this.state.keyword,
      author: this.state.author,
      who: this.state.who,
      enabledState: this.state.enabledState,
      content: this.state.he.getHtml(),
      desc: this.state.desc,
      img_url: this.state.img_url,
    };
    if (recordId) {
      new Promise(resolve => {
        dispatch({
          type: 'article/updateAbout',
          payload: {
            resolve,
            params,
          },
        });
      }).then(res => {
        if (res.code == 0) {
          message.success(res.message);
          this.initForm();
          this.props.handleSearch();
          this.props.handleCancel();
        } else {
          message.error(res.message);
        }
      });
    } else {
      new Promise(resolve => {
        dispatch({
          type: 'article/addAbout',
          payload: {
            resolve,
            params,
          },
        });
      }).then(res => {
        if (res.code == 0) {
          message.success(res.message);
          this.initForm();
          this.props.handleSearch();
          this.props.handleCancel();
        } else {
          message.error(res.message);
        }
      });
    }
  };

  initForm = () => {
    this.setState({
      title: '',
      keyword: '',
      author: '',
      content: '',
      contentHtml: '',
      desc: '',
      img_url: '',
    });
    if (this.state.he) {
      this.state.he.set('');
    }
  };

  inputChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  changeEnabledState = value => {
    this.setState({
      enabledState: value,
    });
  };

  changeWho = value => {
    this.setState({
      who: value,
    });
  };

  render() {
    const normalCenter = {
      textAlign: 'center',
      marginBottom: 20,
    };
    return (
      <div>
        <Modal
          title="增加个人简介模板"
          visible={this.props.visible}
          width="1200px"
          onCancel={this.props.handleCancel}
          onOk={this.addAbout}
        >
          <Input
            style={normalCenter}
            addonBefore="标题"
            size="large"
            placeholder="标题"
            name="title"
            value={this.state.title}
            onChange={this.inputChange}
          />
          <Input
            style={normalCenter}
            addonBefore="关键字"
            size="large"
            placeholder="请输入关键字,使用','分割"
            name="keyword"
            value={this.state.keyword}
            onChange={this.inputChange}
          />
          <Input
            style={normalCenter}
            addonBefore="作者"
            size="large"
            placeholder="请输入作者"
            name="author"
            value={this.state.author}
            onChange={this.inputChange}
          />
          <Input
            style={normalCenter}
            addonBefore="描述"
            size="large"
            placeholder="请输入个人简介描述"
            name="desc"
            value={this.state.desc}
            onChange={this.inputChange}
          />
          <Input
            style={normalCenter}
            addonBefore="封面图"
            size="large"
            placeholder="请输入封面图地址"
            name="img_url"
            value={this.state.img_url}
            onChange={this.inputChange}
          />

          <Select
            style={{ width: 200, marginRight: 20 }}
            placeholder="是否启用(默认启用)"
            defaultValue="已启用"
            onChange={this.changeEnabledState}
          >
            <Select.Option value={0}>已启用</Select.Option>
            <Select.Option value={1}>未启用</Select.Option>
          </Select>

          <Select
            style={{ width: 200, marginRight: 20 }}
            placeholder="关于谁(默认Khari)"
            defaultValue={this.state.who == 0 ? 'Khari' : 'Yaru'}
            onChange={this.changeWho}
          >
            <Select.Option value={0}>Khari</Select.Option>
            <Select.Option value={1}>Yaru</Select.Option>
          </Select>

          <textarea
            id="editorAbout"
            style={{ marginTop: 20, width: '100%' }}
            size="large"
            rows={6}
          />
        </Modal>
      </div>
    );
  }
}

export default connect(
  state => ({
    state,
  }),
  {},
  null,
  {
    withRef: true,
  }
)(AboutUsCreate);
