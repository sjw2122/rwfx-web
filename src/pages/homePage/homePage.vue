<template>
  <div class="homePageHeader">

    <div style="display: flex;padding: 20px 0 0 20px;line-height: 30px;position: relative;width: 500px;">
      <div>选择条件 : </div>
      <div style="margin-left: 20px;" :class=" state == index ?'homePageCondition-border': ''" v-for="(item,index) in textList" :key="index">
        <div style="cursor:pointer;" @click="conditionClick(item,index)">
          {{item.name}}
        </div>
        <div v-if="state == index && item.state == true" style="position: absolute;left: 20px;top: 60px;width: 50%;z-index: 1">
          <div>标签{{index}}</div>
        </div>
        <div v-if="state == index && item.state == false" class="homePage-filtrate">
          <div style="width: 100%;height: 200px;background: rgba(0,123,164,0.4);border-radius: 2px;">
            <div style="border-bottom: 1px solid #fff;margin: 0 20px;line-height: 40px;">
              统战对象
              <div style="display: flex;float: right;text-align: center;line-height: 20px;margin-top:10px;border: 1px solid deepskyblue;border-radius: 4px;">
                <div style="cursor:pointer;width:40px;border-right: 1px solid deepskyblue;background: deepskyblue">@</div>
                <div style="cursor:pointer;width:40px;">@</div>
              </div>
            </div>
            <div style="margin: 0 20px">
              <div style="width: 160px;float:left;line-height: 40px;text-align: left;font-size: 12px" v-for="(TZ,TZS) in TZList" :key="TZS">
                &nbsp;<span style="border-left: 4px solid deepskyblue;height: 10px;"></span>
                &nbsp;{{TZ.name}}
              </div>
            </div>
          </div>
          <div style="width: 100%;height: 200px;border-radius: 2px;background: rgba(0,0,0,0.4);">
            sf
          </div>
          <!--<div>筛选{{index}}</div>-->
        </div>
      </div>
    </div>


  </div>
</template>
<script type="es6">
    import Utils from '../../until/index';
    export default {
      data () {
        return {
          state:0,
          num:0,
          textClick:{name:'统战对象',},
          textList:[
            {name:'统战对象',state:false},
            {name:'人大',state:true},
            {name:'政协',state:true},
          ],
          TZList:[
            {name:'民主党派成员',id:''},
            {name:'无党派人士',id:''},
            {name:'党外知识分子',id:''},
            {name:'少数民族人士',id:''},
            {name:'宗教界人士',id:''},
            {name:'非公有制经济人士',id:''},
            {name:'新的社会阶层人士',id:''},
            {name:'出国和归国留学人士',id:''},
            {name:'香港同胞澳门同胞',id:''},
            {name:'台湾同胞及其在大陆的亲戚',id:''},
            {name:'华侨归侨及侨眷',id:''},
            {name:'党外干部',id:''},
            {name:'统战部机关干部',id:''},
            {name:'统战系统机关干部',id:''},
            {name:'历史宁波帮人士',id:''},
          ]
        }
      },
      created () {
      },
      mounted() {
      },
      methods: {
        conditionClick(item,index){
          if(this.textClick.name == item.name ){
            item.state = !item.state
          }else {
            this.textClick.name = item.name
            item.state = true
          }
          return this.state = index
        }
      }
    }
</script>
<style lang="scss" scoped>
  @import "./homePage.scss";
</style>
