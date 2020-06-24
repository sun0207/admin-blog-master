import React, { PureComponent } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Button,
  Table,
  Avatar,
  notification,
  message,
  Popconfirm,
  Tag,
  Select,
  Modal,
  Icon,
  Upload,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

const style = require('./userlist.less');

const FormItem = Form.Item;

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

/* eslint react/no-multi-comp:0 */
@connect(({ otherUser }) => ({
  otherUser,
}))
@Form.create()
class TableList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      loading: false,
      loadupload: false,
      keyword: '',
      queryType: '', // 1 :其他友情用户 2: 是管理员的个人用户 ,'' 代表所有用户
      pageNum: 1,
      pageSize: 10,
      columns: [
        {
          title: '用户名',
          dataIndex: 'name',
        },
        {
          title: '邮箱',
          dataIndex: 'email',
        },
        {
          title: '手机',
          dataIndex: 'phone',
        },
        {
          title: '头像',
          width: 100,
          dataIndex: 'avatar',
          render: val => <Avatar src={val} size="large" />,
        },
        {
          title: '个人介绍',
          width: 250,
          dataIndex: 'introduce',
        },
        {
          title: '类型',
          dataIndex: 'type',
          // 0：管理员 1：其他用户
          render: val =>
            !val ? <Tag color="green">管理员</Tag> : <Tag color="blue">其他用户</Tag>,
        },
        {
          title: '创建时间',
          dataIndex: 'create_time',
          sorter: true,
          render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
        },
        {
          title: '操作',
          render: (text, record) => (
            <Popconfirm title="确定删除?" onConfirm={() => this.handleDelete(text, record)}>
              <a href="javascript:;">删除</a>
            </Popconfirm>
          ),
        },
      ],
      name: '',
      addtype: 1,
      phone: '',
      email: '',
      address: '',
      avatar: '',
      introduce: '',
      password: '',
    };
    this.handleChangeKeyword = this.handleChangeKeyword.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChangeType = this.handleChangeType.bind(this);
    this.handleChangeAddtype = this.handleChangeAddtype.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.initUserInfo = this.initUserInfo.bind(this);
    this.handleAddUser = this.handleAddUser.bind(this);
  }

  componentDidMount() {
    this.handleSearch(this.state.pageNum, this.state.pageSize);
  }

  /**
   * 用户类型查询
   */
  handleChangeType = type => {
    this.setState(
      {
        queryType: type,
      },
      () => {
        this.handleSearch();
      }
    );
  };

  /**
   * 查询关键字
   */
  handleChangeKeyword = event => {
    this.setState({
      keyword: event.target.value,
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
        this.handleSearch();
      }
    );
  };

  /**
   * 查询用户
   */
  handleSearch = () => {
    this.setState({
      loading: true,
    });
    const { dispatch } = this.props;
    const params = {
      keyword: this.state.keyword,
      type: this.state.queryType,
      pageNum: this.state.pageNum,
      pageSize: this.state.pageSize,
    };
    new Promise(resolve => {
      dispatch({
        type: 'otherUser/queryUser',
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

  /**
   * 显示新增用户模态框
   */
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  /**
   * 隐藏新增用户模态框
   */
  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  /**
   * 输入框改变赋值
   */
  handleChange = (event, type) => {
    event.persist();
    switch (type) {
      case 'name':
        this.setState({
          name: event.target.value,
        });
        break;
      case 'phone':
        this.setState({
          phone: event.target.value,
        });
        break;
      case 'email':
        this.setState({
          email: event.target.value,
        });
        break;
      case 'address':
        this.setState({
          address: event.target.value,
        });
        break;
      case 'introduce':
        this.setState({
          introduce: event.target.value,
        });
        break;
      case 'password':
        this.setState({
          password: event.target.value,
        });
        break;
      default:
        break;
    }
  };

  /**
   * 选择用户类型
   */
  handleChangeAddtype = type => {
    this.setState({
      addtype: type,
    });
  };

  /**
   * 初始化新增用户信息
   */
  initUserInfo = () => {
    this.setState({
      name: '',
      addtype: 1,
      phone: '',
      email: '',
      address: '',
      avatar: '',
      introduce: '',
      password: '',
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
    this.setState({
      avatar: res,
      loadupload: false,
    });
  };

  /**
   * 添加用户
   */
  handleAddUser = () => {
    const { dispatch } = this.props;
    const params = {
      name: this.state.name,
      type: this.state.addtype,
      phone: this.state.phone,
      email: this.state.email,
      address: this.state.address,
      avatar: this.state.avatar,
      introduce: this.state.introduce,
      password: this.state.password,
    };
    console.log(params);
    new Promise(resolve => {
      dispatch({
        type: 'otherUser/addUser',
        payload: {
          resolve,
          params,
        },
      });
    }).then(res => {
      // console.log('res :', res);
      if (res.code === 0) {
        notification.success({
          message: res.message,
        });
        this.setState(
          {
            visible: false,
          },
          () => {
            this.initUserInfo();
            this.handleSearch(this.state.pageNum, this.state.pageSize);
          }
        );
      } else {
        notification.error({
          message: res.message,
        });
      }
    });
  };

  /**
   * 删除用户
   */
  handleDelete = (text, record) => {
    // console.log('text :', text);
    // console.log('record :', record);
    const { dispatch } = this.props;
    const params = {
      id: record._id,
    };
    new Promise(resolve => {
      dispatch({
        type: 'otherUser/delUser',
        payload: {
          resolve,
          params,
        },
      });
    }).then(res => {
      // console.log('res :', res);
      if (res.code === 0) {
        notification.success({
          message: res.message,
        });
        this.handleSearch(this.state.pageNum, this.state.pageSize);
      } else {
        notification.error({
          message: res.message,
        });
      }
    });
  };

  renderSimpleForm() {
    return (
      <Form layout="inline" style={{ marginBottom: '20px' }}>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={24} sm={24}>
            <FormItem>
              <Input
                placeholder="请输入查询用户名称"
                value={this.state.keyword}
                onChange={this.handleChangeKeyword}
              />
            </FormItem>

            <Select
              style={{ width: 200, marginRight: 20 }}
              placeholder="选择用户类型"
              onChange={this.handleChangeType}
            >
              <Select.Option value="">所有</Select.Option>
              <Select.Option value="1">其他用户</Select.Option>
              <Select.Option value="0">管理员</Select.Option>
            </Select>

            <span>
              <Button
                onClick={this.handleSearch}
                style={{ marginTop: '3px' }}
                type="primary"
                icon="search"
              >
                Search
              </Button>
            </span>
            <span>
              <Button
                onClick={() => {
                  this.showModal(0);
                }}
                style={{ marginTop: '3px', marginLeft: '10px' }}
                type="primary"
              >
                新增
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  render() {
    const { userList, total } = this.props.otherUser;
    const { pageNum, pageSize } = this.state;
    const pagination = {
      total,
      defaultCurrent: pageNum,
      pageSize,
      showSizeChanger: true,
      onShowSizeChange: (current, pageSize) => {
        // console.log('current, pageSize :', current, pageSize);
        this.handleChangePageParam(current, pageSize);
      },
      onChange: (current, pageSize) => {
        this.handleChangePageParam(current, pageSize);
      },
    };
    const normalCenter = {
      textAlign: 'center',
      marginBottom: 20,
    };

    const uploadButton = (
      <div>
        <Icon size="24" type={this.state.loadupload ? 'loading' : 'plus'} />
        <div className="ant-upload-text">上传头像</div>
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
              pagination={pagination}
              rowKey={record => record._id}
              columns={this.state.columns}
              bordered
              dataSource={userList}
            />
          </div>
        </Card>

        <Modal
          title="添加新用户"
          visible={this.state.visible}
          width="800px"
          onCancel={this.handleCancel}
          onOk={this.handleAddUser}
        >
          <Input
            style={normalCenter}
            addonBefore="用户名称"
            size="large"
            placeholder="请输入用户名称"
            value={this.state.name}
            name="name"
            onChange={e => this.handleChange(e, 'name')}
          />

          <Input
            style={normalCenter}
            addonBefore="用户电话"
            size="large"
            placeholder="请输入手机号"
            value={this.state.phone}
            name="phone"
            onChange={e => this.handleChange(e, 'phone')}
          />

          <Input
            style={normalCenter}
            addonBefore="用户邮箱"
            size="large"
            placeholder="请输入用户邮箱"
            value={this.state.email}
            name="email"
            onChange={e => this.handleChange(e, 'email')}
          />

          <Input
            style={normalCenter}
            addonBefore="用户地址"
            size="large"
            placeholder="请输入用户地址"
            value={this.state.address}
            name="address"
            onChange={e => this.handleChange(e, 'address')}
          />

          <Input
            style={normalCenter}
            addonBefore="用户介绍"
            size="large"
            placeholder="请输入个人简介"
            value={this.state.introduce}
            name="introduce"
            onChange={e => this.handleChange(e, 'introduce')}
          />

          <Input
            type="password"
            style={normalCenter}
            addonBefore="登录密码"
            size="large"
            placeholder="请设置登录密码"
            value={this.state.password}
            name="password"
            onChange={e => this.handleChange(e, 'password')}
          />

          <div className={style.userWrap}>
            <span className={style.title}>上传头像：</span>
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
              {avatar ? <img src={avatar} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>
            <p>支持上传 jpg、png 格式,大小 2M 以内的图片</p>
          </div>

          <div className={style.userWrap}>
            <span className={style.title}>用户类型：</span>
            <Select
              style={{ width: 200, marginRight: 20 }}
              placeholder="选择用户类型"
              defaultValue={this.state.addtype == 1 ? '其他用户' : '管理员'}
              onChange={this.handleChangeAddtype}
            >
              <Select.Option value="1">其他用户</Select.Option>
              <Select.Option value="0">管理员</Select.Option>
            </Select>
          </div>
        </Modal>
      </PageHeaderWrapper>
    );
  }
}

export default TableList;
