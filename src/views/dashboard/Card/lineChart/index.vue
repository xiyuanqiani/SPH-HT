<template>
  <div  class="charts" ref="charts">

  </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
    mounted(){
        // 初始化echarts实例
        let lineCharts = echarts.init(this.$refs.charts)
        // 配置数据
        lineCharts.setOption({
            xAxis:{
                // 是否显示
                show:false,
                // 坐标轴类型(均分)
                type:'category'
            },
            yAxis:{
                show:false,
                
            },
            // 系列
            series:[
                {
                    type:'line',
                    data:[10,5,22,12,23,2,24],
                    // 折线拐点标志的样式。
                    itemStyle:{
                        opacity:0
                    },
                    // 线条的样式
                    lineStyle:{
                        color:'purple'
                    },
                    // 填充颜色设置
                    areaStyle:{     
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0, color: 'purple' // 0% 处的颜色
                        }, {
                            offset: 1, color: '#fff' // 100% 处的颜色
                        }],
                        global: false ,// 缺省为 false
                        opacity:0.2
                    },
                    // 曲线平滑
                    smooth:true
                }
            ],
            // 布局
            grid:{
                left:0,
                right:0,
                top:0,
                bottom:0
            }

        })
    }
}
</script>

<style>
    .charts{
        width:100%;
        height:100%;
    }
</style>