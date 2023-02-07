<template>
  <div>
    <div class="card-header">
        <span>{{title}}</span>
        <svg t="1675242678127" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3203" width="16" height="16"><path d="M0 0h1024v1024H0z" fill="#FFFFFF" p-id="3204"></path><path d="M512 938.666667a426.666667 426.666667 0 1 1 426.666667-426.666667 427.136 427.136 0 0 1-426.666667 426.666667z m-21.333333-426.666667a21.333333 21.333333 0 0 0-21.333334 21.333333v128a21.333333 21.333333 0 0 0 21.333334 21.333334h42.666666a21.333333 21.333333 0 0 0 21.333334-21.333334v-128a21.333333 21.333333 0 0 0-21.333334-21.333333z m0-170.666667a21.333333 21.333333 0 0 0-21.333334 21.333334v42.666666a21.333333 21.333333 0 0 0 21.333334 21.333334h42.666666a21.333333 21.333333 0 0 0 21.333334-21.333334v-42.666666a21.333333 21.333333 0 0 0-21.333334-21.333334z" p-id="3205"></path></svg>
    </div>
    <div class="card-content">{{count}}</div>
    <div class="card-charts">
        <slot name="charts"></slot>
    </div>
    <div class="card-footer">
        <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
    name:'Detail',
    props:['title','count']
}
</script>

<style >
    .card-header{
        display:flex;
        justify-content: space-between;
        color: #cdcdcd;
    }
    .card-content{
        font-size: 30px;
        padding: 10px 0;
    }
    .card-charts{
        height:40px
    }
    .card-footer{
        border-top: 1px solid #ccc;
        padding-top: 10px;
    }
</style>