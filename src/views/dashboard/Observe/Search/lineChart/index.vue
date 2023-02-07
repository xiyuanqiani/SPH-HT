<template>
    <div>
        <div class="header">
            <span class="search-header">搜索用户数</span>
            <svg t="1675242678127" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3203" width="26" height="26"><path d="M0 0h1024v1024H0z" fill="#FFFFFF" p-id="3204"></path><path d="M512 938.666667a426.666667 426.666667 0 1 1 426.666667-426.666667 427.136 427.136 0 0 1-426.666667 426.666667z m-21.333333-426.666667a21.333333 21.333333 0 0 0-21.333334 21.333333v128a21.333333 21.333333 0 0 0 21.333334 21.333334h42.666666a21.333333 21.333333 0 0 0 21.333334-21.333334v-128a21.333333 21.333333 0 0 0-21.333334-21.333333z m0-170.666667a21.333333 21.333333 0 0 0-21.333334 21.333334v42.666666a21.333333 21.333333 0 0 0 21.333334 21.333334h42.666666a21.333333 21.333333 0 0 0 21.333334-21.333334v-42.666666a21.333333 21.333333 0 0 0-21.333334-21.333334z" p-id="3205"></path></svg>   
        </div>
        <div class="main">
            <span class="main-title">1234</span>
            <span class="main-content">17.1</span>
            <svg t="1675243778415" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2687" width="16" height="16"><path d="M799.9 96 224.1 96C153.3 96 96 153.3 96 224.1l0 420.3 185.3-185.3c12.5-12.5 32.8-12.5 45.2 0l147.1 147.1 157.7-157.7-32.6-32.6c-11.9-11.9-6.5-32.3 9.8-36.6L751.7 341c16.3-4.4 31.2 10.5 26.8 26.8l-38.4 143.1c-4.4 16.3-24.7 21.7-36.6 9.8l-26.9-26.9L496.2 674.1c-12.5 12.5-32.8 12.5-45.2 0L303.9 527l-198 198c-2.9 2.9-6.3 5-9.9 6.6l0 68.3C96 870.7 153.3 928 224.1 928l575.8 0c70.7 0 128.1-57.3 128.1-128.1L928 224.1C928 153.3 870.7 96 799.9 96z" p-id="2688" fill="#1afa29"></path></svg>
            <svg t="1675243888599" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3733" width="16" height="16"><path d="M799.9 96 224.1 96C153.3 96 96 153.3 96 224.1l0 68.3c3.6 1.6 7 3.7 9.9 6.6l198 198L451 349.9c12.5-12.5 32.8-12.5 45.2 0l180.3 180.3 26.9-26.9c11.9-11.9 32.3-6.5 36.6 9.8l38.4 143.1c4.4 16.3-10.5 31.2-26.8 26.8l-143.1-38.4c-16.3-4.4-21.7-24.7-9.8-36.6l32.6-32.6L473.6 417.8 326.5 564.9c-12.5 12.5-32.8 12.5-45.2 0L96 379.6l0 420.3C96 870.7 153.3 928 224.1 928l575.8 0c70.7 0 128.1-57.3 128.1-128.1L928 224.1C928 153.3 870.7 96 799.9 96z" p-id="3734" fill="#d81e06"></path></svg>
        </div>
        <div class="footer">
            <div class="charts" ref="charts"></div>
        </div>
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

<style scoped>
    .header{
        display: flex;
        align-items: center;
    }
    .search-header{
        margin-right:20px
    }
    .main{
        margin: 10px 0;
    }
    .main-title{
        margin-right: 30px;
    }
    .main-content{
        margin-right: 10px;
    }
    .charts{
        width: 100%;
        height: 50px;
    }
</style>