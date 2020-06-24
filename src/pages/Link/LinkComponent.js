import React from 'react';
import { Input, Modal } from 'antd';

class LinkComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    const normalCenter = {
      zIndex: '1000',
      textAlign: 'center',
      marginBottom: 20,
    };
    return (
      <div>
        <Modal
          title="添加链接"
          visible={this.props.visible}
          onOk={this.props.handleOk}
          width="600px"
          onCancel={this.props.handleCancel}
        >
          <Input
            style={normalCenter}
            addonBefore="链接名称"
            size="large"
            placeholder="链接名称"
            name="name"
            value={this.props.name}
            onChange={this.props.handleChange}
          />
          <Input
            style={normalCenter}
            addonBefore="链接Icon"
            size="large"
            placeholder="链接Icon"
            name="icon"
            value={this.props.icon}
            onChange={this.props.handleIconChange}
          />
          <Input
            style={normalCenter}
            addonBefore="链接Url"
            size="large"
            placeholder="链接Url"
            name="url"
            value={this.props.url}
            onChange={this.props.handleUrlChange}
          />
          <Input
            style={normalCenter}
            addonBefore="链接类型"
            size="large"
            placeholder="1 :友情链接 2: 博主推荐 3: 在线工具"
            name="type"
            value={this.props.type}
            onChange={this.props.handleTypeChange}
          />
          <Input
            addonBefore="描述"
            size="large"
            placeholder="描述"
            name="desc"
            value={this.props.desc}
            onChange={this.props.handleDescChange}
          />
        </Modal>
      </div>
    );
  }
}

export default LinkComponent;
