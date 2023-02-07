<template>
  <div>
    <el-table  style="width: 100%" border :data="records">
      <el-table-column  type="index"  label="序号" width="80" align="center">
      </el-table-column>
      <el-table-column  prop="skuName"  label="名称" width="width">
      </el-table-column>
      <el-table-column  prop="skuDesc"  label="描述" width="width">
      </el-table-column>
      <el-table-column  prop="prop"  label="默认图片" width="120">
        <template slot-scope="{row,$index}">
          <img :src="row.skuDefaultImg" style="height:100px;width:100px">
        </template>
      </el-table-column>
      <el-table-column  prop="weight"  label="重量" width="80">
      </el-table-column>
      <el-table-column  prop="price"  label="价格" width="80">
      </el-table-column>
      <el-table-column  prop="prop"  label="操作" width="width">
        <template slot-scope="{row,$index}">
            <el-button type="success" icon="el-icon-top" size="mini" v-if="row.isSale==0" @click="cancelSale(row)"></el-button>
            <el-button type="success" icon="el-icon-bottom" size="mini" v-else @click="onSale(row)"></el-button>
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="edit"></el-button>
            <el-button type="info" icon="el-icon-info" size="mini" @click="getSkuInfo(row)"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
        </template>
      </el-table-column>
    </el-table>

   <el-pagination
   @current-change="getSkuList"
   @size-change="handleSizeChange"
   style="text-align:center"
    :current-page="page"
    :page-sizes="[3,5,10]"
    :page-size="limit"
    layout="prev, pager, next, jumper,->,total, sizes"
    :total="total">
   </el-pagination>
   <!-- 抽屉效果 -->
   <el-drawer :visible.sync="drawer" :show-close="false" size="50%">
    <el-row>
      <el-col :span="5">名称</el-col>
      <el-col :span="16">{{skuInfo.skuName}}</el-col>
    </el-row>
    <el-row>
      <el-col :span="5">描述</el-col>
      <el-col :span="16">{{skuInfo.skuDesc}}</el-col>
    </el-row>
    <el-row>
      <el-col :span="5">价格</el-col>
      <el-col :span="16">{{skuInfo.price}}元</el-col>
    </el-row>
    <el-row>
      <el-col :span="5">平台属性</el-col>
      <el-col :span="16">
        <template>
          <el-tag type="success" v-for="(attr,index) in skuInfo.skuAttrValueList" :key="attr.id" style="margin-right:10px">{{attr.attrId}}-{{attr.valueId}}</el-tag>
        </template>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="5">商品图片</el-col>
      <el-col :span="16">
         <el-carousel height="450px">
          <el-carousel-item v-for="item in skuInfo.skuImageList" :key="item.id">
            <img :src="item.imgUrl" alt="">
          </el-carousel-item>
          </el-carousel>
      </el-col>
    </el-row>
    </el-drawer>
  </div>
</template>

<script>
export default {
    name:'Sku',
    data(){
      return {
        page:1,
        limit:10,
        records:[],
        total:0,
        drawer:false,
        skuInfo:{}
      }
    },
    mounted() {
      this.getSkuList()
    },
    methods: {
      async getSkuList(pager = 1){
        this.page = pager
        const {page,limit} = this
        let result = await this.$API.sku.reqSkuList(page,limit)
        if(result.code==200){
          this.records = result.data.records
          this.total = result.data.total
        }
      },
      handleSizeChange(limit){
        this.limit = limit
        this.getSkuList()
      },
      async onSale(row){     
        let result = await this.$API.sku.reqOnSale(row.id)
        if(result.code==200){
          row.isSale = 0
        this.$message({type:'success',message:'上架成功'})
        }
      },
      async cancelSale(row){
        let result = await this.$API.sku.reqCancelSale(row.id)
        if(result.code==200){
          row.isSale = 1  
        this.$message({type:'success',message:'下架成功'})
        }
      },
      edit(){
        this.$message('此功能正在开发中')
      },
      //获取sku详情
      async getSkuInfo(sku){
        this.drawer = true
        let result = await this.$API.sku.reqSkuById(sku.id)
        if(result.code==200){
          this.skuInfo = result.data
        }
      }

    },
}
</script>

<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
  
  
</style>

<style scoped>
  .el-row .el-col-5{
    font-size: 18px;
    text-align: right;
  }
  .el-col{
    margin: 10px 10px;
  }
  /* 深度选择器 */
  >>>.el-carousel__button{
    width:10px;
    height:10px;
    background:red;
    border-radius: 50%;
  }
  
</style>