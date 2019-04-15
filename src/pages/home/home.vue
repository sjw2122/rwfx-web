<template>
    <div>
      <div class="header">
        宁波市统一战线任务信息分析系统
      </div>
      <div class="sider">
        <div v-for="item of siderList" @click="pagePush(item.pageName)">
          {{item.name}}
        </div>
      </div>
      <div class="top">

      </div>
      <div class="frame">
        <keep-alive>
          <router-view/>
        </keep-alive>
      </div>
    </div>
</template>
<script type="es6">
    export default {
      data () {
        return {
          siderList:[
            {name:'人物管理权限',pageName:'PersonManageAuth'},
            {name:'人物信息采集',pageName:'PersonInforCollect'}
          ]
        }
      },
      created () {

      },
      methods: {
        pagePush(pageName){
          this.$router.push({ name: pageName})
        }
      }
    }

</script>
<style lang="scss" scoped>
  @import "./home.scss";
</style>
