<template>
  <div>
    <el-row :gutter="10">
        <el-col :span="6">
            <el-card>
              <Detail title="销售额" count="￥ 126560"> 
                <template slot="charts">
                   <span>周同比56.63%&nbsp;&nbsp;<svg t="1675243778415" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2687" width="16" height="16"><path d="M799.9 96 224.1 96C153.3 96 96 153.3 96 224.1l0 420.3 185.3-185.3c12.5-12.5 32.8-12.5 45.2 0l147.1 147.1 157.7-157.7-32.6-32.6c-11.9-11.9-6.5-32.3 9.8-36.6L751.7 341c16.3-4.4 31.2 10.5 26.8 26.8l-38.4 143.1c-4.4 16.3-24.7 21.7-36.6 9.8l-26.9-26.9L496.2 674.1c-12.5 12.5-32.8 12.5-45.2 0L303.9 527l-198 198c-2.9 2.9-6.3 5-9.9 6.6l0 68.3C96 870.7 153.3 928 224.1 928l575.8 0c70.7 0 128.1-57.3 128.1-128.1L928 224.1C928 153.3 870.7 96 799.9 96z" p-id="2688" fill="#1afa29"></path></svg></span>
                    &nbsp;
                    <span>日同比19.96%&nbsp;&nbsp;<svg t="1675243888599" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3733" width="16" height="16"><path d="M799.9 96 224.1 96C153.3 96 96 153.3 96 224.1l0 68.3c3.6 1.6 7 3.7 9.9 6.6l198 198L451 349.9c12.5-12.5 32.8-12.5 45.2 0l180.3 180.3 26.9-26.9c11.9-11.9 32.3-6.5 36.6 9.8l38.4 143.1c4.4 16.3-10.5 31.2-26.8 26.8l-143.1-38.4c-16.3-4.4-21.7-24.7-9.8-36.6l32.6-32.6L473.6 417.8 326.5 564.9c-12.5 12.5-32.8 12.5-45.2 0L96 379.6l0 420.3C96 870.7 153.3 928 224.1 928l575.8 0c70.7 0 128.1-57.3 128.1-128.1L928 224.1C928 153.3 870.7 96 799.9 96z" p-id="3734" fill="#d81e06"></path></svg></span>
                </template>
                <template slot="footer">
                    <span>日销售额￥ 12432</span>
                </template>
              </Detail>
            </el-card>
        </el-col>
        <el-col :span="6">
            <el-card>
              <Detail title="访问量" count="88460">
                <template slot="charts">
                  <lineChart></lineChart>
                </template>
                <template slot="footer">
                    <span>日访问量1234</span>
                </template>
              </Detail>
            </el-card>
        </el-col>
        <el-col :span="6">
            <el-card>
              <Detail title="支付笔数" count="88460">
                <template slot="charts">
                    <barChart/>
                </template>
                <template slot="footer">
                    <span>转化率65%</span>
                </template>
              </Detail>
            </el-card>
        </el-col>
        <el-col :span="6">
            <el-card>
              <Detail title="运营活动效果" count="78%">
                <template slot="charts">
                    <progressChart/>
                </template>
                <template slot="footer">
                   <span>周同比56.63%&nbsp;&nbsp;<svg t="1675243778415" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2687" width="16" height="16"><path d="M799.9 96 224.1 96C153.3 96 96 153.3 96 224.1l0 420.3 185.3-185.3c12.5-12.5 32.8-12.5 45.2 0l147.1 147.1 157.7-157.7-32.6-32.6c-11.9-11.9-6.5-32.3 9.8-36.6L751.7 341c16.3-4.4 31.2 10.5 26.8 26.8l-38.4 143.1c-4.4 16.3-24.7 21.7-36.6 9.8l-26.9-26.9L496.2 674.1c-12.5 12.5-32.8 12.5-45.2 0L303.9 527l-198 198c-2.9 2.9-6.3 5-9.9 6.6l0 68.3C96 870.7 153.3 928 224.1 928l575.8 0c70.7 0 128.1-57.3 128.1-128.1L928 224.1C928 153.3 870.7 96 799.9 96z" p-id="2688" fill="#1afa29"></path></svg></span>
                    &nbsp;
                    <span>日同比19.96%&nbsp;&nbsp;<svg t="1675243888599" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3733" width="16" height="16"><path d="M799.9 96 224.1 96C153.3 96 96 153.3 96 224.1l0 68.3c3.6 1.6 7 3.7 9.9 6.6l198 198L451 349.9c12.5-12.5 32.8-12.5 45.2 0l180.3 180.3 26.9-26.9c11.9-11.9 32.3-6.5 36.6 9.8l38.4 143.1c4.4 16.3-10.5 31.2-26.8 26.8l-143.1-38.4c-16.3-4.4-21.7-24.7-9.8-36.6l32.6-32.6L473.6 417.8 326.5 564.9c-12.5 12.5-32.8 12.5-45.2 0L96 379.6l0 420.3C96 870.7 153.3 928 224.1 928l575.8 0c70.7 0 128.1-57.3 128.1-128.1L928 224.1C928 153.3 870.7 96 799.9 96z" p-id="3734" fill="#d81e06"></path></svg></span>
                </template>
              </Detail>
            </el-card>
        </el-col>
    </el-row>
  </div>
</template>

<script>
import Detail from './Detail'
import lineChart from './lineChart'
import barChart from './barChart'
import progressChart from './progressChart'
export default {
    name:'Card',
    components:{Detail,lineChart,barChart,progressChart}
}
</script>

<style>

</style>