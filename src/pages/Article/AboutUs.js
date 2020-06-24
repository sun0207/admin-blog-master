import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
// import domain from '@/utils/domain.js';
import {
  Row,
  Col,
  Card,
  Form,
  Button,
  Table,
  notification,
  Popconfirm,
  Divider,
  Tag,
  Select,
  Avatar,
  message,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import AboutUsCreate from './AboutUsCreate';

@connect(({ article }) => ({
  article,
}))
@Form.create()
class AboutList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      pageNum: 1,
      pageSize: 10,
      enabledState: 2,
      who: 2,
      recordId: '',
      visible: false,
      columns: [
        {
          title: '标题',
          width: 120,
          dataIndex: 'title',
        },
        {
          title: '作者',
          width: 80,
          dataIndex: 'author',
        },
        {
          title: '关于谁',
          width: 80,
          dataIndex: 'who',
          render: val => {
            if (val === 0) {
              return 'Khari';
            }
            if (val === 1) {
              return '亚茹';
            }
          },
        },
        {
          title: '关键字',
          width: 120,
          dataIndex: 'keyword',
          render: arr => (
            <span>
              {arr.map(item => (
                <span color="magenta" key={item}>
                  {item}
                </span>
              ))}
            </span>
          ),
        },
        {
          title: '封面图',
          width: 60,
          dataIndex: 'img_url',
          render: val => <Avatar shape="square" src={val} size={40} icon="user" />,
        },
        {
          title: '状态',
          dataIndex: 'enabledState',
          width: 70,
          render: val => {
            // 关于个人启用状态 => 0 已启用，1 未启用
            if (val === 1) {
              return <Tag color="red">未启用</Tag>;
            }
            if (val === 0) {
              return <Tag color="green">已启用</Tag>;
            }
          },
        },
        {
          title: '观看/点赞/评论',
          width: 120,
          dataIndex: 'meta',
          render: val => (
            <div>
              <span>{val.views}</span> | <span>{val.likes}</span> | <span>{val.comments}</span>
            </div>
          ),
        },
        {
          title: '创建时间',
          width: 150,
          dataIndex: 'create_time',
          sorter: true,
          render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
        },
        {
          title: '操作',
          width: 180,
          render: (text, record) => (
            <div>
              <Fragment>
                <a onClick={() => this.showModal(record)}>修改</a>
              </Fragment>
              <Divider type="vertical" />
              <Popconfirm title="确认删除?" onConfirm={() => this.handleDelete(text, record)}>
                <a href="javascript:;">删除</a>
              </Popconfirm>
            </div>
          ),
        },
      ],
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.handleChangeSearchState = this.handleChangeSearchState.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.handleSearch();
  }

  //查询方法
  handleSearch = () => {
    this.setState({
      loading: true,
    });
    const { dispatch } = this.props;
    const params = {
      enabledState: this.state.enabledState,
      who: this.state.who,
      pageNum: this.state.pageNum,
      pageSize: this.state.pageSize,
    };
    new Promise(resolve => {
      dispatch({
        type: 'article/getAboutList',
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

  // 组件方法
  showModal = record => {
    if (record && record._id) {
      this.setState({
        visible: true,
        recordId: record._id,
      });
    } else {
      this.setState({
        visible: true,
        recordId: '',
      });
    }
  };

  handleChangeSearchState = searchState => {
    this.setState(
      {
        enabledState: searchState,
      },
      () => {
        this.handleSearch();
      }
    );
  };

  handleChangeWhoState = whoState => {
    this.setState(
      {
        who: whoState,
      },
      () => {
        this.handleSearch();
      }
    );
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  handleDelete = (text, record) => {
    const { dispatch } = this.props;
    const params = {
      id: record._id,
    };
    new Promise(resolve => {
      dispatch({
        type: 'article/deleteAbout',
        payload: {
          resolve,
          params,
        },
      });
    })
      .then(res => {
        message.success(res.message);
        this.handleSearch();
      })
      .catch(err => {
        message.error(err);
      });
  };

  renderSimpleForm() {
    return (
      <Form layout="inline" style={{ marginBottom: '20px' }}>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={24} sm={24}>
            <Select
              style={{ width: 200, marginRight: 20 }}
              placeholder="选择状态"
              onChange={this.handleChangeSearchState}
            >
              {/* 关于我们启用状态 => 0 已启用，1 未启用'' 查询全部 */}
              <Select.Option value={2}>全部</Select.Option>
              <Select.Option value={0}>已启用</Select.Option>
              <Select.Option value={1}>未启用</Select.Option>
            </Select>
            <Select
              style={{ width: 200, marginRight: 20 }}
              placeholder="关于谁"
              onChange={this.handleChangeWhoState}
            >
              {/* 关于我们启用状态 => 0 已启用，1 未启用'' 查询全部 */}
              <Select.Option value={2}>全部</Select.Option>
              <Select.Option value={0}>Khari</Select.Option>
              <Select.Option value={1}>亚茹</Select.Option>
            </Select>
            <span>
              <Button
                onClick={() => {
                  this.showModal();
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
    const { aboutList, aboutListTotal } = this.props.article;
    return (
      <PageHeaderWrapper title="关于我们">
        <Card bordered={false}>
          <div className="">
            <div className="">{this.renderSimpleForm()}</div>
            <Table
              size="middle"
              loading={this.state.loading}
              rowKey={record => record._id}
              columns={this.state.columns}
              bordered
              dataSource={aboutList}
            />
          </div>
        </Card>
        <AboutUsCreate
          ref="createModal"
          recordId={this.state.recordId}
          visible={this.state.visible}
          handleCancel={this.handleCancel}
          handleSearch={this.handleSearch}
        />
      </PageHeaderWrapper>
    );
  }
}

export default AboutList;
