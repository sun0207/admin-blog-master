import React from 'react';
import { Card, Button } from 'antd';
import { Minimap } from 'gg-editor';
import Canvas2Image from 'canvas2image-es6';

class EditorMinimap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  saveImage = () => {
    const name = this.refs.saveimage2.minimap.background;
    const FlowDom = name;
    const canvasNode = FlowDom.childNodes[0];
    const canvasDom = document.getElementById(canvasNode.id);
    Canvas2Image.saveAsImage(
      canvasDom,
      parseInt(canvasDom.style.width),
      parseInt(canvasDom.style.height),
      undefined,
      '流程图'
    );
  };
  render() {
    return (
      <Card type="inner" size="small" title="Minimap" bordered={false}>
        <Minimap height={200} ref="saveimage2" />
        {/* <Button type="primary" icon="download" size='large' style={{width:'100%'}} onClick={this.saveImage}>Download</Button> */}
      </Card>
    );
  }
}

export default EditorMinimap;
