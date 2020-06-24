import React, { PureComponent } from 'react';
import {
  Avatar,
  Icon,
  Card,
  Form,
  Input,
  Select,
  Button,
  notification,
  Popconfirm,
  Upload,
  Table,
  Modal,
  message,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { connect } from 'dva';
import moment from 'moment';

const style = require('./photoAlbum.less');

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('只能上传格式为JPG/PNG的图片');
    return false;
  }
  const isLt5M = file.size / 1024 / 1024 < 5;
  if (!isLt5M) {
    message.error('图片大小不能超过5MB!');
    return false;
  }
  return isJpgOrPng && isLt5M;
}
@connect(({ photoAlbum }) => ({
  photoAlbum,
}))
@Form.create()
class PhotoAlbum extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible2: false,
      visible: false,
      loading: false,
      loadupload: false,
      pageNum: 1,
      pageSize: 10,
      albumName: '',
      albumDesc: '',
      photoDesc: '',
      avatar: '',
      search_album_id: '',
      choose_album_id: '',
      choose_album_name: '',
      columns: [
        {
          title: '照片描述',
          width: 350,
          dataIndex: 'photo_desc',
        },
        {
          title: '照片展示',
          width: 150,
          dataIndex: 'photo_url',
          render: val => <Avatar src={val} size="large" />,
        },
        {
          title: '所属相册',
          width: 150,
          dataIndex: 'album_name',
        },
        {
          title: '创建时间',
          dataIndex: 'create_time',
          sorter: true,
          render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
        },
        {
          title: '操作',
          render: record => (
            <Popconfirm title="确定删除?" onConfirm={() => this.handleDeletePhoto(record)}>
              <a href="javascript:;">删除</a>
            </Popconfirm>
          ),
        },
      ],
    };
  }

  componentDidMount() {
    this.handleSearchPhotoList();
    this.handleSearchAlbumList();
  }

  // 新增相册
  handleShowModal2 = () => {
    this.setState({
      visible2: true,
    });
  };

  handleCancel2 = () => {
    this.setState({
      visible2: false,
    });
  };

  handleAddAlbum = () => {
    this.setState({
      loading: true,
    });
    const { dispatch } = this.props;
    const params = {
      album_name: this.state.album_name,
      album_desc: this.state.album_desc,
    };
    new Promise(resolve => {
      dispatch({
        type: 'photoAlbum/addAlbum',
        payload: {
          resolve,
          params,
        },
      });
    }).then(res => {
      if (res.code === 0) {
        this.setState({
          loading: false,
          visible2: false,
        });
        notification.success({
          message: res.message,
        });
        this.handleSearchAlbumList();
      } else {
        notification.error({
          message: res.message,
        });
      }
    });
  };

  // 新增照片
  handleShowModal = () => {
    if (this.props.photoAlbum.albumList.length <= 0) {
      notification.warning({
        message: '暂无相册请先创建相册',
      });
      this.setState({
        visible2: true,
      });
      return;
    }
    this.setState({
      visible: true,
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  handleAddPhoto = () => {
    this.setState({
      loading: true,
    });
    const { dispatch } = this.props;
    const params = {
      photo_desc: this.state.photo_desc,
      photo_url: this.state.avatar,
      album_id: this.state.choose_album_id,
      album_name: this.state.choose_album_name,
    };
    new Promise(resolve => {
      dispatch({
        type: 'photoAlbum/addPhoto',
        payload: {
          resolve,
          params,
        },
      });
    }).then(res => {
      if (res.code === 0) {
        this.setState({
          loading: false,
          visible: false,
          pageNum: 1,
          pageSize: 10,
        });
        notification.success({
          message: res.message,
        });
        this.handleSearchPhotoList();
      } else {
        notification.error({
          message: res.message,
        });
      }
    });
  };

  handleDeletePhoto = record => {
    this.setState({
      loading: true,
    });
    const { dispatch } = this.props;
    const params = {
      photo_id: record._id,
      album_id: record.album_id,
    };
    new Promise(resolve => {
      dispatch({
        type: 'photoAlbum/deletePhoto',
        payload: {
          resolve,
          params,
        },
      });
    }).then(res => {
      if (res.code === 0) {
        this.setState({
          loading: false,
        });
        notification.success({
          message: res.message,
        });
        this.handleSearchPhotoList();
      } else {
        notification.error({
          message: res.message,
        });
      }
    });
  };

  handleUploadChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loadupload: true });
      return;
    }
    if (info.file.status === 'done') {
      console.log(info.file);
    }
  };

  /**
   * 上传成功
   */
  uploadSuccess = res => {
    console.log(res);
    this.setState({
      avatar: res,
      loadupload: false,
    });
  };

  /**
   * 分页查询
   */
  handleChangePageParam = (pageNum, pageSize) => {
    this.setState(
      {
        pageNum,
        pageSize,
      },
      () => {
        this.handleSearchPhotoList();
      }
    );
  };

  /**
   * 查询相册
   */
  handleSearchAlbumList = () => {
    const { dispatch } = this.props;
    const params = {
      state: 1,
    };
    new Promise(resolve => {
      dispatch({
        type: 'photoAlbum/getAlbumList',
        payload: {
          resolve,
          params,
        },
      });
    }).then(res => {
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

  /**
   * 查询照片
   */
  handleSearchPhotoList = () => {
    this.setState({
      loading: true,
    });
    const { dispatch } = this.props;
    const params = {
      pageNum: this.state.pageNum,
      pageSize: this.state.pageSize,
      album_id: this.state.search_album_id,
    };
    new Promise(resolve => {
      dispatch({
        type: 'photoAlbum/getPhotoList',
        payload: {
          resolve,
          params,
        },
      });
    }).then(res => {
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

  /**
   * change
   */
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleChangeAlbum = val => {
    this.setState({
      pageNum: 1,
      pageSize: 10,
      search_album_id: val,
    });
    this.handleSearchPhotoList();
  };

  handleChooseAlbum = (val, option) => {
    this.setState({
      choose_album_id: val,
      choose_album_name: option.props.children,
    });
  };

  /**
   * 查询控件
   */

  renderSimpleForm() {
    let { albumList } = this.props.photoAlbum;
    const albumOptions = [];
    for (let i = 0; i < albumList.length; i++) {
      const e = albumList[i];
      albumOptions.push(
        <Select.Option key={e._id} value={e._id}>
          {e.album_name} ({e.album_num})
        </Select.Option>
      );
    }
    return (
      <Form layout="inline" style={{ marginBottom: '20px' }}>
        <Select
          style={{ width: 200, marginRight: 20 }}
          placeholder="选择照片墙"
          onChange={this.handleChangeAlbum}
        >
          <Select.Option value="">所有</Select.Option>
          {albumOptions}
        </Select>

        <Button
          onClick={this.handleSearchPhotoList}
          style={{ marginTop: '3px' }}
          type="primary"
          icon="search"
        >
          查询
        </Button>
        <Button
          onClick={() => {
            this.handleShowModal2(0);
          }}
          style={{ marginTop: '3px', marginLeft: '10px' }}
          type="primary"
        >
          新增相册
        </Button>
        <Button
          onClick={() => {
            this.handleShowModal(0);
          }}
          style={{ marginTop: '3px', marginLeft: '10px' }}
          type="primary"
        >
          新增照片
        </Button>
      </Form>
    );
  }

  render() {
    const { total, photoList, albumList } = this.props.photoAlbum;
    const { pageNum, pageSize } = this.state;
    const pagination = {
      total,
      defaultCurrent: pageNum,
      pageSize,
      showSizeChanger: true,
      onShowSizeChange: (current, pageSize) => {
        this.handleChangePageParam(current, pageSize);
      },
      onChange: (current, pageSize) => {
        this.handleChangePageParam(current, pageSize);
      },
    };
    const normalCenter = {
      width: 450,
      textAlign: 'center',
      marginBottom: 20,
    };
    const albumOptions = [];
    for (let i = 0; i < albumList.length; i++) {
      const e = albumList[i];
      albumOptions.push(
        <Select.Option key={e._id} value={e._id} title={e.album_desc}>
          {e.album_name}
        </Select.Option>
      );
    }

    const uploadButton = (
      <div>
        <Icon size="24" type={this.state.loadupload ? 'loading' : 'plus'} />
        <div className="ant-upload-text">上传相册</div>
      </div>
    );
    const { avatar } = this.state;
    return (
      <PageHeaderWrapper title="用户管理">
        <Card bordered={false}>
          <div>
            <div>{this.renderSimpleForm()}</div>
            <Table
              pagination={pagination}
              loading={this.state.loading}
              rowKey={record => record._id}
              columns={this.state.columns}
              bordered
              dataSource={photoList}
            />
          </div>
        </Card>

        <Modal
          title="新增相册"
          visible={this.state.visible2}
          width="500px"
          onCancel={this.handleCancel2}
          onOk={this.handleAddAlbum}
        >
          <Input
            style={normalCenter}
            addonBefore="相册名称"
            size="default"
            placeholder="请输入相册名称说明"
            value={this.state.album_name}
            name="album_name"
            onChange={this.handleChange}
          />
          <Input
            style={normalCenter}
            addonBefore="相册描述"
            size="default"
            placeholder="请输入相册描述（选填）"
            value={this.state.album_desc}
            name="album_desc"
            onChange={this.handleChange}
          />
        </Modal>
        {/* 上传图片Modal */}
        <Modal
          title="新增照片"
          visible={this.state.visible}
          width="550px"
          onCancel={this.handleCancel}
          onOk={this.handleAddPhoto}
        >
          <div className={style.imgWrap}>
            <span className={style.title}>图片描述：</span>
            <Input
              style={{ width: 400 }}
              size="default"
              placeholder="请输入图片描述（选填）"
              value={this.state.photo_desc}
              name="photo_desc"
              onChange={this.handleChange}
            />
          </div>
          <div className={style.imgWrap}>
            <span className={style.title}>选择相册：</span>
            <Select
              style={{ width: 400, marginRight: 20 }}
              placeholder="选择相册"
              onChange={this.handleChooseAlbum}
            >
              {albumOptions}
            </Select>
          </div>
          <div className={style.imgWrap}>
            <span className={style.title}>上传图片：</span>
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="/api/uploadImg"
              beforeUpload={beforeUpload}
              onSuccess={this.uploadSuccess}
              onChange={this.handleUploadChange}
            >
              {avatar ? <img src={avatar} className={style.img} alt="avatar" /> : uploadButton}
            </Upload>
            <p>支持上传 jpg、png 格式,大小 5M 以内的图片</p>
          </div>
        </Modal>
      </PageHeaderWrapper>
    );
  }
}
export default PhotoAlbum;
