import React from 'react';
import { Row, Col, Button } from 'antd';
import GGEditor, { Flow } from 'gg-editor';
import EditorMinimap from '../components/EditorMinimap';
import { FlowContextMenu } from '../components/EditorContextMenu';
import { FlowToolbar } from '../components/EditorToolbar';
import { FlowItemPanel } from '../components/EditorItemPanel';
import { FlowDetailPanel } from '../components/EditorDetailPanel';
import Canvas2Image from 'canvas2image-es6';
import styles from './index.less';
import { FormattedMessage } from 'umi-plugin-react/locale';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

GGEditor.setTrackable(false);

// const FlowPage = () => {
class FlowPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  saveImage = () => {
    const name = this.refs.saveimage.config.className;
    const FlowDom = document.getElementsByClassName(name)[0];
    const canvasNode = FlowDom.childNodes[0].childNodes;
    const canvasDom = document.getElementById(canvasNode[0].id);
    Canvas2Image.saveAsImage(
      canvasDom,
      parseInt(canvasDom.attributes.width.value),
      parseInt(canvasDom.attributes.height.value),
      'jpg',
      '流程图'
    );
  };

  render() {
    return (
      <PageHeaderWrapper
        title={<FormattedMessage id="app.editor.flow.title" />}
        content={<FormattedMessage id="app.editor.flow.description" />}
      >
        <GGEditor className={styles.editor}>
          <Row type="flex" className={styles.editorHd}>
            <Col span={24}>
              <FlowToolbar />
            </Col>
          </Row>
          <Row type="flex" className={styles.editorBd}>
            <Col span={3} className={styles.editorSidebar}>
              <FlowItemPanel />
            </Col>
            <Col span={16} className={styles.editorContent}>
              {/* <Flow className={styles.flow} graph={{ edgeDefaultShape: 'flow-polyline-round' }} style={{ height: 300 }} /> */}
              <Flow ref="saveimage" className={styles.flow} style={{ height: 300 }} />
            </Col>
            <Col span={5} className={styles.editorSidebar}>
              <FlowDetailPanel />
              <EditorMinimap />
              <Button
                type="primary"
                icon="download"
                size="large"
                style={{ width: '100%' }}
                onClick={this.saveImage}
              >
                Download
              </Button>
            </Col>
          </Row>
          <FlowContextMenu />
        </GGEditor>
      </PageHeaderWrapper>
    );
  }
}

export default FlowPage;
