import React from 'react';
import { Card } from 'antd';
import { ItemPanel, Item } from 'gg-editor';
import styles from './index.less';

const FlowItemPanel = () => {
  return (
    <ItemPanel className={styles.itemPanel}>
      <Card bordered={false}>
        <Item
          type="node"
          size="72*72"
          shape="flow-circle"
          model={{
            color: '#FA8C16',
            label: '开始',
          }}
          src="/ggeditor/flow/start.svg"
        />
        <Item
          type="node"
          size="80*48"
          shape="flow-rect"
          model={{
            color: '#1890FF',
            label: '矩形节点',
          }}
          src="/ggeditor/flow/normal.svg"
        />
        <Item
          type="node"
          size="80*72"
          shape="flow-rhombus"
          model={{
            color: '#13C2C2',
            label: '菱形节点',
          }}
          src="/ggeditor/flow/decision.svg"
        />
        <Item
          type="node"
          size="80*48"
          shape="flow-capsule"
          model={{
            color: '#722ED1',
            label: '结束',
          }}
          src="/ggeditor/flow/model.svg"
        />
      </Card>
    </ItemPanel>
  );
};

export default FlowItemPanel;
