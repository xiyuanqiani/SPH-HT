<template>
  <div>
    <el-form ref="form" label-width="80px">
      <el-form-item label="SPU名称"> {{spu.spuName}} </el-form-item>
      <el-form-item label="SKU名称">
        <el-input placeholder="sku名称" v-model="skuInfo.skuName"></el-input>
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input placeholder="价格" type="number" v-model="skuInfo.price"></el-input>
      </el-form-item>
      <el-form-item label="重量">
        <el-input placeholder="重量" v-model="skuInfo.weight"></el-input>
      </el-form-item>
      <el-form-item label="规格描述">
        <el-input type="textarea" placeholder="规格描述" v-model="skuInfo.skuDesc"></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form :inline="true" ref="form" label-width="80px">
          <el-form-item :label="attr.attrName" v-for="(attr,index) in attrInfoList" :key="attr.id">
            <el-select placeholder="请选择" v-model="attr.attrIdAndValueId">
              <el-option :label="attrValue.valueName" :value="`${attr.id}:${attrValue.id}`" v-for="(attrValue,index) in attr.attrValueList" :key="attrValue.id"> </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form :inline="true" ref="form" label-width="80px">
          <el-form-item :label="saleAttr.saleAttrName" v-for="(saleAttr,index) in spuSaleAttrList" :key="saleAttr.id">
            <el-select placeholder="请选择" v-model="saleAttr.attrIdAndValueId">
              <el-option :label="saleAttrValue.saleAttrValueName" :value="`${saleAttr.id}:${saleAttrValue.id}`" v-for="(saleAttrValue,index) in saleAttr.spuSaleAttrValueList" :key="saleAttrValue.id"> </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片列表">
        <el-table style="width: 100%" border :data="spuImageList" @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            label="label"
            width="width"
          >
          </el-table-column>
          <el-table-column prop="prop" label="图片" width="width">
            <template slot-scope="{row,$index}">
              <img :src="row.imgUrl" style="width:100px;height:100px">
            </template>
          </el-table-column>
          <el-table-column prop="imgName" label="名称" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{row,$index}">
             <el-button type="primary" v-if="row.isDefault==0" @click="changeDefault(row)">设为默认</el-button>
             <el-button v-else >默认</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "SkuForm",
  data() {
    return {
      // 存储图片的信息
      spuImageList: [],
      // 存储销售属性
      spuSaleAttrList: [],
      // 存储平台属性
      attrInfoList: [],
      // 收集skuInfo的字段
      skuInfo: {
        // 第一类收集的数据，父组件给的数据
        category3Id: 0,
        spuId: 0,
        tmId: 0,
        // 第二类需要通过双向绑定的数据
        price: 0,
        skuName:"",
        skuDesc: "",
        weight: "",
        // 第三类，需要代码
        // 默认图片
        skuDefaultImg: "",
        // 平台属性
        skuAttrValueList: [
          // {
          //   attrId: 0,
          //   valueId: 0, 
          // },
        ],
        // 图片列表
        skuImageList: [
          // {
          //   id: 0,
          //   imgName: "string",
          //   imgUrl: "string",
          //   isDefault: "string",
          //   skuId: 0,
          //   spuImgId: 0,
          // },
        ],
        // 销售属性
        skuSaleAttrValueList: [
          // {
          //   id: 0,
          //   saleAttrId: 0,
          //   saleAttrName: "string",
          //   saleAttrValueId: 0,
          //   saleAttrValueName: "string",
          //   skuId: 0,
          //   spuId: 0,
          // },
        ],
        
      },
      spu:{},
      // 收集图片的字段
      imageList:[]
    };
  },
  methods: {
    // 获取SkuForm数据
    async getData(category1Id, category2Id, spu) {
      // 收集父组件给子的数据
      this.skuInfo.category3Id = spu.category3Id
      this.skuInfo.spuId = spu.id
      this.skuInfo.tmId = spu.tmId
      this.spu = spu
      let result = await this.$API.spu.reqSkuImageList(spu.id);
      if (result.code == 200) {
        let list  = result.data
        list.forEach(item=>{
          item.isDefault = 0
        })
        this.spuImageList = list
      }

      let result1 = await this.$API.spu.reqSpuSaleAttrList(spu.id);
      if (result1.code == 200) {
        this.spuSaleAttrList = result1.data;
      }

      let result2 = await this.$API.spu.reqAttrInfoList(
        category1Id,
        category2Id,
        spu.category3Id
      );
      if (result2.code == 200) {
        this.attrInfoList = result2.data;
      }
    },
    // table表格复选框按钮事件
    handleSelectionChange(selection){
      // 当前收集的字段中缺少isDefault字段
      this.imageList =selection
    },
    //设为默认排他思想
    changeDefault(row){
      this.spuImageList.forEach(item=>{
        item.isDefault = 0
      })
      row.isDefault = 1
      // 收集默认图片地址
      this.skuInfo.skuDefaultImg = row.imgUrl
    },
    cancel(){
      // 通知父组件
      this.$emit('changeScenes',0),
      // 清除数据
      Object.assign(this._data,this.$options.data())
    },
    async save(){
      // 整理参数
      // 整理平台属性
      const {attrInfoList,skuInfo,spuSaleAttrList,imageList} = this
      skuInfo.skuAttrValueList = attrInfoList.reduce((prev,item)=>{
        if(item.attrIdAndValueId){
          const [attrId,valueId] = item.attrIdAndValueId.split(":")
          prev.push({attrId,valueId})
        }
        return prev
      },[])

      // 整理销售属性
      skuInfo.skuSaleAttrValueList = spuSaleAttrList.reduce((prev,item)=>{
        if(item.attrIdAndValueId){
          const [saleAttrId,saleAttrValueId] = item.attrIdAndValueId.split(":")
          prev.push({saleAttrId,saleAttrValueId})
        }
        return prev
      },[])
      // 整理图片的数据
      skuInfo.skuImageList = imageList.map(item=>{
        return{
          imgName:item.imgName,
          imgUrl:item.imgUrl,
          isDefault:item.isDefault,
          spuImgId:item.id
        }
      })
      //发请求
      let result = await this.$API.spu.reqAddSku(skuInfo)
      if(result.code==200){
        this.$message({type:'success',message:'添加sku成功'})
        this.$emit('changeScenes',0)
      }
   }
  },
};
</script>

<style></style>
