import React from 'react';
import ReactEcharts from 'echarts-for-react';
class Charts extends React.Component {
    constructor(){
        super()
        this.state = {
            option: this.getOption()
        }
    }
    componentDidMount () {

    }
    getOption () {
        // var {data} = this.props
        const option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'line'        // 默认为直线，可选为：'line' | 'shadow'
                },
                formatter: "{b}<br/>{a}:{c}"
            },
            legend: {
                show: false,
                data: ['信号']
            },
            toolbox: {
                show: false,
                feature: {
                    dataView: {readOnly: false},
                    restore: {},
                    saveAsImage: {}
                }
            },
            grid: {
                top: 0,
                left: 0,
                right: 0,
                bottom: 0
            },
            dataZoom: {
                show: false
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: true,
                    axisTick: {    // 轴标记
                        show: false
                    },
                    axisLabel: {
                        show: false
                    },
                    axisLine: {    // 轴线
                        show: true,
                        lineStyle: {
                            color: 'gray'
                        }
                    },
                    data: ['00:00:00', '00:00:01', '00:00:02', '00:00:03', '00:00:04', '00:00:05']
                }
            ],
            yAxis: [
                {
                    show: false,
                    type: 'value',
                    scale: true,
                    name: '值',
                    max: 5,
                    min: -5,
                    boundaryGap: [0.2, 0.2]
                }
            ],
            series: [
                {
                    name: '信号',
                    type: 'bar',
                    smooth: true,
                    data: [1, 3, 2, 5, 3]
                }
            ]
        };
        return option;
    }
    render() {
        return (
            <div className='examples'>
                <div className='parent'>
                    <ReactEcharts ref='echarts_react'
                        option={this.state.option}
                        style={{height: 30, width: 75}}/>
                </div>
            </div>
        );
    }
};
export default Charts;

