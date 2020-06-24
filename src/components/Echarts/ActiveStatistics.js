import React, { PureComponent } from 'react';
import ReactEcharts from 'echarts-for-react';

export default class Events extends PureComponent {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState = () => ({ option: this.getOption(), cnt: 0 });

  getOption = () => {
    // 数据
    var dateBase = new Date();
    var year = dateBase.getFullYear();
    var dottedBase = +dateBase + 1000 * 3600 * 24;
    var weekCategory = [];
    var radarData = [];
    var radarDataAvg = [];
    var maxData = 12000;
    var weekMaxData = [];
    var weekLineData = [];

    // 周数据
    for (var i = 0; i < 7; i++) {
      // 日期
      var date = new Date((dottedBase -= 1000 * 3600 * 24));
      weekCategory.unshift([date.getMonth() + 1, date.getDate()].join('/'));

      // 折线图数据
      weekMaxData.push(maxData);
      var distance = Math.round(Math.random() * 11000 + 500);
      weekLineData.push(distance);

      // 雷达图数据
      // 我的指标
      var averageSpeed = +(Math.random() * 5 + 3).toFixed(3);
      var maxSpeed = averageSpeed + +(Math.random() * 3).toFixed(2);
      var hour = +(distance / 1000 / averageSpeed).toFixed(1);
      var radarDayData = [distance, averageSpeed, maxSpeed, hour];
      radarData.unshift(radarDayData);

      // 平均指标
      var distanceAvg = Math.round(Math.random() * 8000 + 4000);
      var averageSpeedAvg = +(Math.random() * 4 + 4).toFixed(3);
      var maxSpeedAvg = averageSpeedAvg + +(Math.random() * 2).toFixed(2);
      var hourAvg = +(distance / 1000 / averageSpeed).toFixed(1);
      var radarDayDataAvg = [distanceAvg, averageSpeedAvg, maxSpeedAvg, hourAvg];
      radarDataAvg.unshift(radarDayDataAvg);
    }

    // 颜色设置
    var color = {
      linearYtoG: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 1,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: '#f5b44d',
          },
          {
            offset: 1,
            color: '#28f8de',
          },
        ],
      },
      linearGtoB: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 1,
        y2: 0,
        colorStops: [
          {
            offset: 0,
            color: '#43dfa2',
          },
          {
            offset: 1,
            color: '#28f8de',
          },
        ],
      },
      linearBtoG: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 1,
        y2: 0,
        colorStops: [
          {
            offset: 0,
            color: '#1c98e8',
          },
          {
            offset: 1,
            color: '#28f8de',
          },
        ],
      },
      areaBtoG: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: 'rgba(35,184,210,.7)',
          },
          {
            offset: 1,
            color: 'rgba(35,184,210,.5)',
          },
        ],
      },
    };

    return {
      title: {
        text: '网站访问量',
        textStyle: {
          color: '#1890FF',
          fontSize: 18,
          fontWeight: 'normal',
        },
        // subtext: year + '/' + weekCategory[6],
        subtextStyle: {
          color: '#1890FF',
          fontSize: 16,
        },
        top: 0,
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
      },
      grid: {
        left: 60,
        right: 50,
        bottom: 40,
        top: 60,
      },
      xAxis: {
        type: 'category',
        position: 'bottom',
        axisLine: true,
        axisLabel: {
          color: 'rgba(0,0,0,.7)',
          fontSize: 12,
        },
        axisTick: {
          show: false,
        },
        data: weekCategory,
      },
      yAxis: {
        name: '人',
        nameLocation: 'end',
        nameGap: 24,
        nameTextStyle: {
          color: 'rgba(0,0,0,.7)',
          fontSize: 14,
        },
        max: maxData,
        splitNumber: 4,

        axisLine: {
          lineStyle: {
            opacity: 0,
          },
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: '#000',
            opacity: 0.1,
          },
        },
        axisLabel: {
          color: 'rgba(0,0,0,.8)',
          fontSize: 12,
        },
        axisTick: {
          show: false,
        },
      },
      series: [
        {
          name: '活跃量',
          type: 'line',
          smooth: true,
          symbol: 'emptyCircle',
          symbolSize: 8,
          itemStyle: {
            normal: {
              color: '#1890FF',
            },
          },
          lineStyle: {
            normal: {
              color: color.linearBtoG,
              width: 2,
            },
          },
          areaStyle: {
            normal: {
              color: color.areaBtoG,
            },
          },
          data: weekLineData,
          lineSmooth: true,
          markLine: {
            silent: true,
            data: [
              {
                type: 'average',
                name: '平均值',
              },
            ],
            precision: 0,
            label: {
              normal: {
                formatter: '平均值: \n {c}',
              },
            },
            lineStyle: {
              normal: {
                color: '#FFAC4C',
              },
            },
          },
          tooltip: {
            position: 'top',
            formatter: '{c} m',
            backgroundColor: '#FFAC4C',
            padding: 6,
          },
        },
        {
          name: '占位背景',
          type: 'bar',
          itemStyle: {
            normal: {
              show: true,
              color: '#000',
              opacity: 0,
            },
          },
          silent: true,
          barWidth: '50%',
          data: weekMaxData,
          animation: false,
        },
        {
          name: '占位背景',
          type: 'bar',
          itemStyle: {
            normal: {
              show: true,
              color: '#000',
              opacity: 0.1,
            },
          },
          silent: true,
          barWidth: '50%',
          barGap: 0,
          data: weekMaxData,
          animation: false,
        },
      ],
    };
  };

  onChartClick = (params, echarts) => {
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
            option={this.state.option}
            style={{ height: 300 }}
            onChartReady={this.onChartReady}
            onEvents={onEvents}
          />
        </div>
      </div>
    );
  }
}
