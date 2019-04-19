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
          <template v-if="item.child != false" v-for="(child_item,key1) in item.child">
            <div class="menu_2" @click="sider_click(2,key,key1,'',child_item.url)" :class="{active:child_item.selected,active1:menu_2_selected==key+','+key1}">
              <img :src="child_item.imgUrl">
              <span>{{child_item.name}}</span>
            </div>
            <div class="menu_3_box" v-if="child_item.child != false">
              <div class="menu_3" v-for="(grandson_item,key2) in child_item.child" @click="sider_click(3,key,key1,key2,grandson_item.url)" :class="{active:menu_3_selected==key+','+key1+','+key2}">
                {{grandson_item.name}}
              </div>
            </div>
          </template>
        </template>

      </div>
      <div class="top" :class="{active:side_flag}">
        <span :class="{active:$store.tagSelected == '首页'}">首页</span>
        <span v-for="item in $store.state.tagList" :class="{active:$store.state.tagSelected == item.name}" @click="side_tag(item.name,item.url)">{{item.name}}<i @click.stop="close_tag(item.name)"></i></span>
      </div>
      <div class="frame" :class="{active:side_flag}">

          <a-config-provider :getPopupContainer="getPopupContainer">
            <a-locale-provider :locale="local">
              <keep-alive :include="$store.state.includePageNames">
                <router-view/>
              </keep-alive>
            </a-locale-provider>
          </a-config-provider>

      </div>
    </div>
</template>
<script type="es6">
    import Utils from '../../until/index';
    import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';
    export default {
      data () {
        return {
          untils:Utils,
          local:zh_CN,
          menu_1_selected:null,
          menu_2_selected:null,
          menu_3_selected:null,
          side_flag:false,
          siderList:[
            {name:'首页',child:[]},
            {name:'人物管理',child:[
              {name:'人物信息采集',imgUrl:'/static/imgs/home/sider_test.png',url:'',selected:false,child:[
                  {name:'人物信息采集',url:'PersonInforCollect'},
                  {name:'采集申请列表',url:'PersonManageAuth'},
                  {name:'人物采集列表',url:'PersonCollectList'}
                ]},
              {name:'人物信息查询',imgUrl:'/static/imgs/home/sider_test.png',url:'PersonCollectList',selected:false,child:[]},
              {name:'人物信息审批',imgUrl:'/static/imgs/home/sider_test.png',url:'',selected:false,child:[]},
              {name:'人物管理权限',imgUrl:'/static/imgs/home/sider_test.png',selected:false,child:[]},
              {name:'定义历史宁波帮人士(帮宁波人士）',imgUrl:'/static/imgs/home/sider_test.png',selected:false,child:[]},
              {name:'管理历史宁波帮人士（帮宁波人士）',imgUrl:'/static/imgs/home/sider_test.png',selected:false,child:[]}
              ]},
            {name:'组织管理',child:[
              {name:'宁波统战社团组织',imgUrl:'/static/imgs/home/sider_test.png',selected:false,child:[]},
              {name:'其他社团组织',imgUrl:'/static/imgs/home/sider_test.png',selected:false,child:[]},
              {name:'党派组织',imgUrl:'/static/imgs/home/sider_test.png',selected:false,child:[]},
              {name:'工商联组织',imgUrl:'/static/imgs/home/sider_test.png',selected:false,child:[]}
            ]},
            {name:'后台管理',child:[
                {name:'人物类别维护',imgUrl:'/static/imgs/home/sider_test.png',selected:false,child:[]},
                {name:'人大政协届次维护',imgUrl:'/static/imgs/home/sider_test.png',selected:false,child:[]}
              ]}
          ]
        }
      },
      created () {
        this.modal_init();
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
              this.$store.state.tagSelected = '首页';
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
            if(url != ''){
              this.$router.push({ name: url});
              let str = {name:'',url:''};
              let flag = true;
              str.name = this.siderList[key].child[key1].name;
              str.url = this.siderList[key].child[key1].url;
              this.$store.state.tagList.map(res =>{
                if(res.name == str.name){
                  flag = res;
                }
              })
              if(flag == true){
                this.$store.state.includePageNames.push(str.url);
                this.$store.state.tagList.push(str);
                this.$store.state.tagSelected = str.name;
              }else{
                this.$store.state.tagSelected = flag.name;
              }
            }
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
            this.$store.state.tagList.map(res =>{
              if(res.name == str.name){
                flag = res;
              }
            })
            if(flag == true){
              this.$store.state.includePageNames.push(str.url);
              this.$store.state.tagList.push(str);
              this.$store.state.tagSelected = str.name;
            }else{
              this.$store.state.tagSelected = flag.name;
            }
          }
        },
        side_tag(name,url){
          this.$store.state.tagSelected = name;
          this.$router.push({ name: url});
        },
        close_tag(name){
          let index = 0;
          this.$store.state.tagList.map(res =>{
            if(res.name == name){
              if(this.$store.state.tagSelected == name){
                if(this.$store.state.tagList.length > 1){
                  if(index == 0){
                    this.$store.state.tagSelected = this.$store.state.tagList[index+1].name;
                    this.$router.push({ name: this.$store.state.tagList[index+1].url});
                  }else{
                    this.$store.state.tagSelected = this.$store.state.tagList[index-1].name;
                    this.$router.push({ name: this.$store.state.tagList[index-1].url});
                  }
                }else{
                  this.$store.state.tagSelected = '首页';
                  //跳转到首页
                }
              }

              let i = this.$store.state.includePageNames.indexOf(res.url);
              this.$store.state.includePageNames.splice(i,1);

              this.$store.state.tagList.splice(index,1);
            }
            index++;
          })
        },
        getPopupContainer (trigger) {
          return trigger.parentElement
        },
        modal_init(){
          $(document).on('click','.modal_title i',function(){
            $(this).parent().parent().parent().addClass('hidden');
          })
        }
      }
    }

</script>
<style lang="scss" scoped>
  @import "./home.scss";
</style>
