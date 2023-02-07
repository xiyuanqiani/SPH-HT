<template>
  <div>
    <el-form ref="form" label-width="80px" :model="spu">
      <el-form-item label="SPU名称">
        <el-input placeholder="SPU名称" v-model="spu.spuName"></el-input>
      </el-form-item>
      <el-form-item label="品牌">
        <el-select placeholder="请选择品牌" v-model="spu.tmId">
          <el-option
            :label="tm.tmName"
            :value="tm.id"
            v-for="(tm, index) in tradeMarkList"
            :key="tm.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input
          type="textarea"
          rows="4"
          placeholder="SPU描述"
          v-model="spu.description"
        ></el-input>
      </el-form-item>
      <el-form-item label="SPU图片">
        <el-upload
          action="/dev-api/admin/product/fileUpload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
          :file-list="spuImageList"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-select
          :placeholder="`还有${unSelectSaleAttr.length}未选择`"
          v-model="attrIdAndName"
        >
          <el-option :label="unSelect.name" :value="`${unSelect.id}:${unSelect.name}`" v-for="(unSelect,index) in unSelectSaleAttr" :key="unSelect.id"></el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-plus" :disabled="!attrIdAndName" @click="addSaleAttr">添加销售属性</el-button>
        <!-- 展示的是当前SPU已有的销售属性 -->
        <el-table style="width: 100%" border :data="spu.spuSaleAttrList">
          <el-table-column
            type="index"
            label="序号"
            width="80px"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="saleAttrName" label="属性名" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="属性值名称列表" width="width">
            <template slot-scope="{ row, $index }">
              
              <el-tag
                :key="tag.id"
                v-for="(tag,index) in row.spuSaleAttrValueList"
                closable
                :disable-transitions="false"
                @close="row.spuSaleAttrValueList.splice(index,1)"
              >
                {{ tag.saleAttrValueName }}
              </el-tag>
              <!-- 相对于span与input的转换 -->
              <!-- @keyup.enter.native="handleInputConfirm"
                 -->
              <el-input
                class="input-new-tag"
                v-if="row.inputVisible"
                v-model="row.inputValue"
                ref="saveTagInput"
                size="small"
                @blur="handleInputConfirm(row)"
              >
              </el-input>
              <el-button v-else class="button-new-tag" size="small" @click="showInput(row)"
                >添加</el-button
              >
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{row,$index}">
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="spu.spuSaleAttrList.splice($index,1)"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" @click="addOrUpdateSpu">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "SpuForm",
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      // 存储spu信息属性
      // spu属性初始化的时候是一个空对象，在修改spu的时候，会向服务器发请求，返回spu对象，在修改时就可以利用这个spu返回给服务器
      // 但是添加的时候并没有向服务器发请求，数据收集到哪里，有哪些字段，看文档。
      // spu:{},
      spu: {
        // 3级分类的id
        category3Id: 0,
        // 描述
        description: "string",
        // spu名称
        spuName: "",
        // 品牌的id
        tmId: 0,
        // spu图片信息
        spuImageList: [
          {
            id: 0,
            imgName: "string",
            imgUrl: "string",
            spuId: 0,
          },
        ],
        // 平台属性与属性值
        spuSaleAttrList: [
          //   {
          //     baseSaleAttrId: 0,
          //     id: 0,
          //     saleAttrName: "string",
          //     spuId: 0,
          //     spuSaleAttrValueList: [
          //       {
          //         baseSaleAttrId: 0,
          //         id: 0,
          //         isChecked: "string",
          //         saleAttrName: "string",
          //         saleAttrValueName: "string",
          //         spuId: 0,
          //       },
          //     ],
          //   },
        ],
      },
      // 存储品牌信息
      tradeMarkList: [],
      // 存储spu图片
      spuImageList: [],
      // 存储平台全部销售属性
      saleAttrList: [],
    //   收集未选择的销售属性id
      attrIdAndName:''
    };
  },
  methods: {
    handleRemove(file, fileList) {
        // file代表删除的图，fileList剩余的图片
    //   console.log(file, fileList);
    // 对于服务器而言，不需要name，url字段，将来提交给服务器的时候需要处理
        this.spuImageList = fileList
    },
    handlePictureCardPreview(file) {
        // 将图片地址赋值给这个属性
      this.dialogImageUrl = file.url;
    //   控制对话框显示
      this.dialogVisible = true;
    },
    // 照片墙上传成功的回调
    handleSuccess(response,file,fileList){
        this.spuImageList = fileList
    },
    //   初始化SouForm的数据
    async initSpuData(spu) {
      // 获取spu信息的数据
      let spuResult = await this.$API.spu.reqSpu(spu.id);
      if (spuResult.code == 200) {
        this.spu = spuResult.data;
      }
      // 获取品牌信息
      let tradeMarkResult = await this.$API.spu.reqTradeMarkList();
      if (tradeMarkResult.code == 200) {
        this.tradeMarkList = tradeMarkResult.data;
      }
      // 获取spu图片数据
      let spuImageResult = await this.$API.spu.reqSpuImageList(spu.id);
      if (spuImageResult.code == 200) {
        let listArr = spuImageResult.data;
        // 由于照片墙展示的图片需要数组，且要有name和url字段
        // 需要把服务器返回的数据修改
        listArr.forEach((item) => {
          item.name = item.imgName;
          item.url = item.imgUrl;
        });
        this.spuImageList = listArr;
      }
      // 获取平台全部销售属性
      let saleResult = await this.$API.spu.reqBaseSaleAttrList();
      if (saleResult.code == 200) {
        this.saleAttrList = saleResult.data;
      }
    },
    // 添加销售属性
    addSaleAttr(){
        // 把收集到的销售属性数据进行分割
        const [baseSaleAttrId,saleAttrName] = this.attrIdAndName.split(':')
        // 向spu对象里spuSaleAttrList里添加新的销售属性
        let newSaleAttr = {baseSaleAttrId,saleAttrName,spuSaleAttrValueList:[]}
        this.spu.spuSaleAttrList.push(newSaleAttr)
        this.attrIdAndName = ''
    },
    // 添加销售属性值
    showInput(row){
      this.$set(row,'inputVisible',true)
      this.$set(row,'inputValue','')
    },
    // 失去焦点
    handleInputConfirm(row){
      // 需要携带两个字段
      const {baseSaleAttrId,inputValue} = row
      if(inputValue.trim()==''){
        this.$message('属性值不能为空')
        return 
      }
      // 不能重复
      let result = row.spuSaleAttrValueList.every(item=>item.saleAttrValueName!=inputValue);
      if(!result) {
        this.$message('不能重复')
        return
      }
      let newSaleAttrValue = {baseSaleAttrId,saleAttrValueName:inputValue}
      row.spuSaleAttrValueList.push(newSaleAttrValue)
      row.inputVisible = false
    },
    //保存
    async addOrUpdateSpu(){
      // 整理参数,照片墙需要imgName和imgUrl
      this.spu.spuImageList = this.spuImageList.map((item)=>{
        return {
          imgName:item.name,
          imgUrl:(item.response&&item.response.data)||item.url
        }
      })
      let result = await this.$API.spu.reqAddOrUpdateSpu(this.spu)
      console.log(result);
      if(result.code==200){
        this.$message({type:'success',message:'保存成功'})
        // 通知父组件回到场景0
        this.$emit('changeScene',{scene:0,flag:this.spu.id?'修改':'添加'})
      }
      // 清除数据
      Object.assign(this._data,this.$options.data())
    },
    // 点击添加Spu
    async addSpuData(category3Id){
      // 收集分类3的id
      this.spu.category3Id = category3Id
      // 获取品牌信息
      let tradeMarkResult = await this.$API.spu.reqTradeMarkList();
      if (tradeMarkResult.code == 200) {
        this.tradeMarkList = tradeMarkResult.data;
      }
      // 获取平台全部销售属性
      let saleResult = await this.$API.spu.reqBaseSaleAttrList();
      if (saleResult.code == 200) {
        this.saleAttrList = saleResult.data;
      }
    },
    //取消
    cancel(){
      this.$emit('changeScene', {scene:0,flag:''})
      // 清理数据
      // Object.assign合并对象
      // 组件实例this._data可以操作data中响应式数据
      // this.$options可以获取配置对象，配置对象的data函数执行，返回的响应式数据为空
      Object.assign(this._data,this.$options.data())
    } 

  },
  computed: {
    // 计算未选中的销售属性
    unSelectSaleAttr() {
      // 整个平台的所有属性---saleAttrList
      // 当前spu拥有的属性-----spu.spuSaleAttrList
      return this.saleAttrList.filter((item) => {
        return this.spu.spuSaleAttrList.every((item1) => {
          return item.name != item1.saleAttrName;
        });
      });
    },
  },
};
</script>

<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
