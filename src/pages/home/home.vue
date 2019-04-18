<template>
    <div>
      <div class="header">
        <img class="sider_icon" src="/static/imgs/home/sider_title.png" @click="side_active()">
        <img class="logo" src="/static/imgs/home/logo.png">
        <div class="title">
          <div>宁波市统一战线人物信息分析系统</div>
          <div>中共宁波市委统战部</div>
        </div>
        <div class="set_box">
          <img class="login_out" src="../../../static/imgs/home/loginOut.png" />
          <img class="set" src="../../../static/imgs/home/set.png" />
        </div>
        <div class="set_box" style="width: 180px">
          <div class="people_infor">
            <div>办公室</div>
            <div>张XX</div>
          </div>
          <img class="people_img"/>
        </div>
      </div>
      <div class="sider" :class="{active:side_flag}">
        <!--<div v-for="item of siderList" @click="pagePush(item.pageName)">
          {{item.name}}
        </div>-->

        <!--<div class="menu_1">首页</div>
        <div class="menu_1">人物管理</div>
        <div class="menu_2"><img src="/static/imgs/home/sider_test.png" />人物信息采集</div>
        <div class="menu_3_box">
          <div class="menu_3">人物信息采集</div>
          <div class="menu_3">人物信息采集</div>
          <div class="menu_3">来自工作管理系统审批</div>
        </div>
        <div class="menu_2"><img src="/static/imgs/home/sider_test.png" />人物信息查询</div>
        <div class="menu_2"><img src="/static/imgs/home/sider_test.png" />定义历史宁波帮人士</div>
        <div class="menu_1">组织管理</div>-->

        <template v-for="(item,key) in siderList">
          <div class="menu_1" @click="sider_click(1,key,'','','')" :class="{active:menu_1_selected == key}">{{item.name}}</div>
          <template v-if="item.child != []" v-for="(child_item,key1) in item.child">
            <div class="menu_2" @click="sider_click(2,key,key1,'','')" :class="{active:child_item.selected,active1:menu_2_selected==key+','+key1}">
              <img :src="child_item.imgUrl">
              {{child_item.name}}
            </div>
            <div class="menu_3_box" v-if="child_item.child != []">
              <div class="menu_3" v-for="(grandson_item,key2) in child_item.child" @click="sider_click(3,key,key1,key2,grandson_item.url)" :class="{active:menu_3_selected==key+','+key1+','+key2}">
                {{grandson_item.name}}
              </div>
            </div>
          </template>
        </template>

      </div>
      <div class="top" :class="{active:side_flag}">
        <span :class="{active:tagSelected == '首页'}">首页</span>
        <span v-for="item in tagList" :class="{active:tagSelected == item.name}" @click="side_tag(item.name,item.url)">{{item.name}}<i @click.stop="close_tag(item.name)"></i></span>
      </div>
      <div class="frame" :class="{active:side_flag}">
        <keep-alive>
          <router-view/>
        </keep-alive>
      </div>
    </div>
</template>
<script type="es6">
    import Utils from '../../until/index';
    export default {
      data () {
        return {
          menu_1_selected:null,
          menu_2_selected:null,
          menu_3_selected:null,
          side_flag:false,
          siderList:[
            {name:'首页',child:[]},
            {name:'人物管理',child:[
              {name:'人物信息采集',imgUrl:'/static/imgs/home/sider_test.png',selected:false,child:[
                {name:'人物管理权限',url:'PersonManageAuth'},
                {name:'人物信息采集',url:'PersonInforCollect'},
                {name:'来自工作管理系统审批',url:''}
              ]},
              {name:'人物信息查询',imgUrl:'/static/imgs/home/sider_test.png',selected:false,child:[]},
              {name:'定义历史宁波帮人士',imgUrl:'/static/imgs/home/sider_test.png',selected:false,child:[]},
            ]},
            {name:'人物管理',child:[
              {name:'人物管理',imgUrl:'/static/imgs/home/sider_test.png',selected:false,child:[
                {name:'人物管理',url:''},
              ]}
            ]}
          ],
          tagList:[],
          tagSelected:''
        }
      },
      created () {

      },
      methods: {
        side_active(){
          this.side_flag = !this.side_flag;
        },
        sider_click(type,key,key1,key2,url){
          if(type == 1){
            if(this.menu_1_selected != key){
              let index = 0;
              this.siderList.forEach(res =>{
                if(index != key){
                  res.child.forEach(res =>{
                    res.selected = false;
                  })
                }
                index++;
              })
            }
            if(key == 0 && key1 == 0){
              //跳转到首页
              this.tagSelected = '首页';
            }
            this.menu_1_selected = key;
            this.menu_2_selected = null;
            this.menu_3_selected = null;
          }
          if(type == 2){
            if(this.menu_2_selected != key+','+key1){
              let index = 0;
              this.siderList.forEach(res =>{
                if(index != key){
                  if(res.child != []){
                    res.child.forEach(res =>{
                      res.selected = false;
                    })
                  }
                }
                index++;
              })
            }
            this.menu_1_selected = key;
            this.menu_2_selected = key+','+key1;
            this.menu_3_selected = null;
            this.siderList[key].child[key1].selected = !this.siderList[key].child[key1].selected;
          }
          if(type == 3){
            this.menu_1_selected = key;
            this.menu_2_selected = key+','+key1;
            this.menu_3_selected = key+','+key1+','+key2;
            this.$router.push({ name: url});
            let str = {name:'',url:''};
            let flag = true;
            str.name = this.siderList[key].child[key1].child[key2].name;
            str.url = this.siderList[key].child[key1].child[key2].url;
            this.tagList.map(res =>{
              if(res.name == str.name){
                flag = res;
              }
            })
            if(flag == true){
              this.tagList.push(str);
              this.tagSelected = str.name;
            }else{
              this.tagSelected = flag.name;
            }
          }
        },
        side_tag(name,url){
          this.tagSelected = name;
          this.$router.push({ name: url});
        },
        close_tag(name){
          let index = 0;
          this.tagList.map(res =>{
            if(res.name == name){
              if(this.tagSelected == name){
                if(this.tagList.length > 1){
                  if(index == 0){
                    this.tagSelected = this.tagList[index+1].name;
                    this.$router.push({ name: this.tagList[index+1].url});
                  }else{
                    this.tagSelected = this.tagList[index-1].name;
                    this.$router.push({ name: this.tagList[index-1].url});
                  }
                }else{
                  this.tagSelected = '首页';
                  //跳转到首页
                }
              }
              Utils.$emit(res.url);
              this.tagList.splice(index,1);
            }
            index++;
          })
        }
      }
    }

</script>
<style lang="scss" scoped>
  @import "./home.scss";
</style>
