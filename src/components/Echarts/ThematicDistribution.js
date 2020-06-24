import React, { PureComponent } from 'react';
import ReactEcharts from 'echarts-for-react';

export default class Events extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      cnt: 0,
    };
  }

  getOption = () => ({
    title: {
      text: '网站内容分布',
      textStyle: {
        color: '#1890FF',
        fontSize: 18,
        fontWeight: 'normal',
      },
      x: 'center',
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: ['专题1', '专题2', '专题3', '专题4', '专题5'],
    },
    series: [
      {
        name: '专题分布',
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
        data: [
          { value: 335, name: '专题1' },
          { value: 310, name: '专题2' },
          { value: 234, name: '专题3' },
          { value: 135, name: '专题4' },
          { value: 1548, name: '专题5' },
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  });

  onChartClick = (param, echarts) => {
    console.log(param, echarts);
    this.setState({
      cnt: this.state.cnt + 1,
    });
  };

  onChartLegendselectchanged = (param, echart) => {
    console.log(param, echart);
  };

  onChartReady = echarts => {
    console.log('echart is ready', echarts);
  };

  render() {
    let onEvents = {
      click: this.onChartClick,
      legendselectchanged: this.onChartLegendselectchanged,
    };
    return (
      <div className="examples">
        <div className="parent">
          <ReactEcharts
            option={this.getOption()}
            style={{ height: 300 }}
            onChartReady={this.onChartReady}
            onEvents={onEvents}
          />
        </div>
      </div>
    );
  }
}
