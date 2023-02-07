<template>
  <div class="charts" ref="charts"></div>
</template>

<script>
import * as echarts from 'echarts';
export default {
    mounted() {
        let barCharts = echarts.init(this.$refs.charts)
        barCharts.setOption({
            xAxis:{
                show:false,
                type:'category'
            },
            yAxis:{
                show:false
            },
            series:[
                {
                    type:'bar',
                    data:[12,14,23,15,27,12,43,34,39,34,23,12,19],
                    color:'skyblue'
                }
            ],
            grid:{
                left:0,
                right:0,
                top:0,
                bottom:0
            },
            //提示
            tooltip:{

            }
        })
    },
}
</script>

<style>
.charts{
        width:100%;
        height:100%;
    }
</style>