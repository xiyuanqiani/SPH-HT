import request from '@/utils/request'

// 获取spu列表数据
export const reqSpuList = (page,limit,category3Id) => request({url:`/admin/product/${page}/${limit}`,method:'get',params:{category3Id}})

// 获取spu信息
export const reqSpu = (spuId) => request({url:`/admin/product/getSpuById/${spuId}`,method:'get'})

//获取品牌信息
export const reqTradeMarkList = () => request({url:'/admin/product/baseTrademark/getTrademarkList',method:'get'})

// 获取spu图片
export const reqSpuImageList=(spuId) => request({url:`/admin/product/spuImageList/${spuId}`,method:'get'})

// 获取平台全部销售属性,最多3个
export const reqBaseSaleAttrList = () => request({url:'/admin/product/baseSaleAttrList',method:'get'})

// 增加或修改SPU
export const reqAddOrUpdateSpu = (spuInfo)=>{
    // 带有id---修改SPU
    if(spuInfo.id){
        // !!!!!!!!记得return
        return request({url:'/admin/product/updateSpuInfo',method:'post',data:spuInfo})
    }else{
        return request({url:'/admin/product/saveSpuInfo',method:'post',data:spuInfo})
    }
}

// 删除Spu
export const reqDeleteSpu = (spuId) => request({url:`/admin/product/deleteSpu/${spuId}`,method:'delete'})

// 获取图片数据
export const reqSkuImageList = (spuId) => request({url:`/admin/product/spuImageList/${spuId}`,method:'get'})

// 获取销售属性的数据
export const reqSpuSaleAttrList = (spuId) => request({url:`/admin/product/spuSaleAttrList/${spuId}`,method:'get'}) 

// 获取平台属性数据
export const reqAttrInfoList = (category1Id,category2Id,category3Id) => request({url:`/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,method:'get'})

//添加sku
export const reqAddSku = (skuInfo) => request({url:'/admin/product/saveSkuInfo',method:'post',data:skuInfo})

// 查看sku列表
export const reqSkuList = (spuId) => request({url:`/admin/product/findBySpuId/${spuId}`,method:'get'})