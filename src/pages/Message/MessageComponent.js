import React from 'react';
import { Row, Modal, notification, Tag, Select } from 'antd';
import { connect } from 'dva';
import style from './message.less';
import message from '@/models/message';

@connect(({ message }) => ({
  message,
}))
class MessageComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChangeIllegal = this.handleChangeIllegal.bind(this);
    this.initIllegal = this.initIllegal.bind(this);
    this.submitUpload = this.submitUpload.bind(this);
  }

  componentDidMount() {}

  submitUpload = (illegal, messageObj, replyObj) => {
    const { dispatch } = this.props;
    const params = {
      is_illegal: illegal,
      message_id: messageObj._id,
      reply_id: replyObj ? replyObj._id : '',
    };
    new Promise(resolve => {
      dispatch({
        type: 'message/updateMessageBoard',
        payload: {
          resolve,
          params,
        },
      });
    }).then(res => {
      console.log(res);
      if (res.code === 0) {
        notification.success({
          message: res.message,
        });
        this.searchMessageDetail(messageObj);
      } else {
        notification.error({
          message: res.message,
        });
      }
    });
  };

  handleChangeIllegal = (value, messageObj, replyObj) => {
    this.submitUpload(value, messageObj, replyObj);
  };

  searchMessageDetail = messageObj => {
    this.props.getMessageDetail(messageObj);
  };

  initIllegal = illegal => {
    let defaultValue = '';
    if (illegal === 0) {
      defaultValue = '待审核';
    } else if (illegal === 1) {
      defaultValue = '正常通过';
    } else if (illegal === -1) {
      defaultValue = '删除';
    } else if (illegal === -2) {
      defaultValue = '垃圾评论';
    }
    console.log(defaultValue);
    return defaultValue;
  };

  render() {
    const titleStyle = {
      textAlign: 'left',
      borderLeft: '3px solid #1890FF',
      paddingLeft: '10px',
      fontSize: '18px',
      margin: '20px 0',
    };
    const contentStyle = {
      textAlign: 'left',
      padding: '0 0 30px 0',
    };

    const { messageDetail } = this.props.message;
    const replyList = messageDetail.reply_list.map(e => (
      <li key={e._id} style={contentStyle} className={style.messageWrap}>
        <div
          key={e._id}
          className={style.message}
          dangerouslySetInnerHTML={{ __html: e.content }}
        />
        {e.is_handle === 2 ? <Tag color="red">未处理过</Tag> : <Tag color="green">已经处理过</Tag>}
        <Select
          style={{ width: 200, marginBottom: 10, marginLeft: 10 }}
          placeholder="选择审核状态"
          defaultValue={this.initIllegal(e.is_illegal)}
          onChange={value => {
            this.handleChangeIllegal(value, messageDetail, e);
          }}
        >
          {/* 状态 => 0 待审核 / 1 正常通过 / -1 已删除 / -2 垃圾评论 */}
          <Select.Option value="1">正常通过</Select.Option>
          <Select.Option value="-1">删除</Select.Option>
          <Select.Option value="-2">垃圾评论</Select.Option>
        </Select>
      </li>
    ));
    return (
      <div>
        <Modal
          title="留言详情与回复"
          visible={this.props.visible}
          onOk={this.props.handleOk}
          width="1000px"
          onCancel={this.props.handleCancel}
        >
          <Row style={contentStyle} className={style.messageWrap}>
            <div style={titleStyle}> 主留言 </div>
            <div
              className={style.message}
              dangerouslySetInnerHTML={{ __html: messageDetail.content }}
            />
            {messageDetail.is_handle === 2 ? (
              <Tag color="red">未处理过</Tag>
            ) : (
              <Tag color="green">已经处理过</Tag>
            )}
            <Select
              style={{ width: 200, marginBottom: 10, marginLeft: 10 }}
              placeholder="选择审核状态"
              defaultValue={this.initIllegal(messageDetail.is_illegal)}
              onChange={value => {
                this.handleChangeIllegal(value, messageDetail);
              }}
            >
              {/* 状态 => 0 待审核 / 1 正常通过 / -1 已删除 / -2 垃圾评论 */}
              <Select.Option value="1">正常通过</Select.Option>
              <Select.Option value="-1">删除</Select.Option>
              <Select.Option value="-2">垃圾评论</Select.Option>
            </Select>
          </Row>
          <Row>
            <div style={titleStyle}> 回复列表 </div>
            {replyList.length > 0 ? (
              <ul>{replyList}</ul>
            ) : (
              <div style={contentStyle}>暂无回复！</div>
            )}
          </Row>
        </Modal>
      </div>
    );
  }
}

export default MessageComponent;
