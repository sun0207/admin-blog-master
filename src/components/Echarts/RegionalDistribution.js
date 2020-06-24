import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';

require('echarts/map/js/china.js');

export default class MapEcharts extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  timeTicket = null;

  getInitialState = () => ({ option: this.getOption() });

  componentDidMount() {
    if (this.timeTicket) {
      clearInterval(this.timeTicket);
    }
    this.timeTicket = setInterval(() => {
      const option = this.state.option;
      const r = new Date().getSeconds();
      option.title.text = '分布' + r;
      option.series[0].name = '分布' + r;
      this.setState({ option: option });
    }, 1000);
  }

  componentWillUnmount() {
    if (this.timeTicket) {
      clearInterval(this.timeTicket);
    }
  }

  randomData() {
    return Math.round(Math.random() * 1000);
  }

  getOption = () => {
    //数据纯属虚构
    var data = [
      {
        name: '江苏省',
        value: this.randomData(),
      },
      {
        name: '北京市',
        value: this.randomData(),
      },
      {
        name: '上海',
        value: this.randomData(),
      },
      {
        name: '重庆',
        value: this.randomData(),
      },
      {
        name: '河北',
        value: this.randomData(),
      },
      {
        name: '河南',
        value: this.randomData(),
      },
      {
        name: '云南',
        value: this.randomData(),
      },
      {
        name: '辽宁',
        value: this.randomData(),
      },
      {
        name: '黑龙江',
        value: this.randomData(),
      },
      {
        name: '湖南',
        value: this.randomData(),
      },
      {
        name: '安徽',
        value: this.randomData(),
      },
      {
        name: '山东',
        value: this.randomData(),
      },
      {
        name: '新疆',
        value: this.randomData(),
      },
      {
        name: '江苏',
        value: this.randomData(),
      },
      {
        name: '浙江',
        value: this.randomData(),
      },
      {
        name: '江西',
        value: this.randomData(),
      },
      {
        name: '湖北',
        value: this.randomData(),
      },
      {
        name: '广西',
        value: this.randomData(),
      },
      {
        name: '甘肃',
        value: this.randomData(),
      },
      {
        name: '山西',
        value: this.randomData(),
      },
      {
        name: '内蒙古',
        value: this.randomData(),
      },
      {
        name: '陕西',
        value: this.randomData(),
      },
      {
        name: '吉林',
        value: this.randomData(),
      },
      {
        name: '福建',
        value: this.randomData(),
      },
      {
        name: '贵州',
        value: this.randomData(),
      },
      {
        name: '广东',
        value: this.randomData(),
      },
      {
        name: '青海',
        value: this.randomData(),
      },
      {
        name: '西藏',
        value: this.randomData(),
      },
      {
        name: '四川',
        value: this.randomData(),
      },
      {
        name: '宁夏',
        value: this.randomData(),
      },
      {
        name: '海南',
        value: this.randomData(),
      },
      {
        name: '台湾',
        value: this.randomData(),
      },
      {
        name: '香港',
        value: this.randomData(),
      },
      {
        name: '澳门',
        value: this.randomData(),
      },
    ];

    var yData = [];
    var barData = [];
    data.sort(function(o1, o2) {
      if (isNaN(o1.value) || o1.value == null) return -1;
      if (isNaN(o2.value) || o2.value == null) return 1;
      return o2.value - o1.value;
    });
    for (var i = 0; i < 10; i++) {
      barData.push(data[i]);
      yData.push(i + data[i].name);
    }
    return {
      title: [
        {
          show: true,
          text: '访问地区分布',
          textStyle: {
            color: '#1890FF',
            fontSize: 18,
            fontWeight: 'normal',
          },
          right: 160,
          top: 20,
        },
      ],
      tooltip: {
        trigger: 'item',
        formatter: function(params) {
          if (params.data) {
            return params.data.name + '<br/>' + params.data.value + '个';
          } else {
            return '暂无';
          }
        },
      },
      visualMap: {
        type: 'continuous',
        orient: 'horizontal',
        min: 0,
        max: 1000,
        text: ['高', '低'],
        bottom: 30,
        left: 'left',
        hoverLink: true,
        calculable: true,
        seriesIndex: 0,
        inRange: {
          color: ['#d0f4fc', '#a9dbf6', '#9cd3f4', '#93cdf3', '#83c2f0', '#6eb5ed', '#51a2e9'],
        },
        textStyle: {
          color: '#7B93A7',
        },
      },
      grid: {
        right: 60,
        top: 70,
        bottom: 100,
        width: '20%',
      },
      xAxis: {
        show: false,
      },
      yAxis: {
        type: 'category',
        inverse: true,
        nameGap: 16,
        axisLine: {
          show: false,
          lineStyle: {
            color: '#ddd',
          },
        },
        axisTick: {
          show: false,
          lineStyle: {
            color: '#ddd',
          },
        },
        axisLabel: {
          interval: 0,
          margin: 85,
          textStyle: {
            color: '#455A74',
            align: 'left',
            fontSize: 14,
          },
          rich: {
            a: {
              color: '#fff',
              backgroundColor: '#FAAA39',
              width: 20,
              height: 20,
              align: 'center',
              borderRadius: 2,
            },
            b: {
              color: '#fff',
              backgroundColor: '#4197FD',
              width: 20,
              height: 20,
              align: 'center',
              borderRadius: 2,
            },
          },
          formatter: function(params) {
            if (parseInt(params.slice(0, 1)) < 3) {
              return [
                '{a|' + (parseInt(params.slice(0, 1)) + 1) + '}' + '  ' + params.slice(1),
              ].join('\n');
            } else {
              return [
                '{b|' + (parseInt(params.slice(0, 1)) + 1) + '}' + '  ' + params.slice(1),
              ].join('\n');
            }
          },
        },
        data: yData,
      },
      geo: {
        roam: false,
        map: 'china',
        left: '7%',
        right: '40%',
        label: {
          emphasis: {
            show: false,
          },
        },
        itemStyle: {
          emphasis: {
            areaColor: '#fff464',
          },
        },
        regions: [
          {
            name: '南海诸岛',
            value: 0,
            itemStyle: {
              normal: {
                opacity: 0,
                label: {
                  show: false,
                },
              },
            },
          },
        ],
      },
      toolbox: {
        show: true,
        orient: 'vertical',
        left: 'right',
        top: 'center',
        feature: {
          dataView: { readOnly: false },
          restore: {},
          saveAsImage: {},
        },
      },
      series: [
        {
          name: 'mapSer',
          type: 'map',
          roam: false,
          geoIndex: 0,
          label: {
            show: false,
          },
          data: data,
        },
        {
          name: 'barSer',
          type: 'bar',
          roam: false,
          visualMap: false,
          zlevel: 2,
          barMaxWidth: 8,
          barGap: 1,
          itemStyle: {
            normal: {
              color: function(params) {
                var colorList = [
                  {
                    colorStops: [
                      {
                        offset: 0,
                        color: '#FFD119', // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: '#FFAC4C', // 100% 处的颜色
                      },
                    ],
                  },
                  {
                    colorStops: [
                      {
                        offset: 0,
                        color: '#00C0FA', // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: '#2F95FA', // 100% 处的颜色
                      },
                    ],
                  },
                ];
                if (params.dataIndex < 3) {
                  return colorList[0];
                } else {
                  return colorList[1];
                }
              },
              barBorderRadius: 15,
            },
          },
          data: barData,
        },
      ],
    };
  };

  render() {
    return (
      <div className="examples">
        <div className="parent">
          <ReactEcharts
            option={this.state.option}
            style={{ height: '500px', width: '100%' }}
            className="react_for_echarts"
          />
        </div>
      </div>
    );
  }
}
