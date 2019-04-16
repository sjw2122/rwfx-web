<template>
    <div>
      <!--
      -
      -
      -    查询页面
      -->
      <div class="content_box" v-show="collection_step == 0">
        <div class="content_title"><img src="static/imgs/content_title/title_cx.png">查询</div>
        <div class="form_box">
          <div class="input_box" data-veri="">
            <span><i></i>姓名：</span>
            <a-input placeholder="请输入姓名"/>
            <span class="error_tip hidden">请输入姓名！</span>
          </div>
          <div class="input_box">
            <span><i></i>现任职单位：</span>
            <a-input placeholder="请输入单位" v-model="text1"/>
            <span class="error_tip hidden">请输入单位！</span>
          </div>
          <div class="btn_box">
            <button class="search">查询</button>
          </div>
        </div>
      </div>
      <div class="content_box" v-show="collection_step == 0">
        <div class="content_title" style="margin-top: 20px;"><img src="">查询结果</div>
        <div class="text_box">
          未查询到符合条件的人员！
          <div class="height15"></div>
          直接进入<span @click="step(1)">人物信息采集</span>
        </div>
      </div>


      <!--
      -
      -
      -    采集三个步骤页面
      -->
      <div class="collection_box" v-show="collection_step == 1 || collection_step == 2 || collection_step == 3">
        <div class="collection_title">
          <div class="collection_text active " :class="{ border_bottom: collection_step == 1 }">
            <img src="../../../static/imgs/common/num_1_b.png">
            <img src="../../../static/imgs/common/num_1_b.png">
            选择预添加的人物类别
          </div>
          <div class="collection_text" :class="{ active: collection_step == 2||collection_step == 3 , border_bottom: collection_step == 2}">
            <img src="../../../static/imgs/common/num_2.png">
            <img src="../../../static/imgs/common/num_2_b.png">
            设置人物基础信息
          </div>
          <div class="collection_text" :class="{ active: collection_step == 3 , border_bottom: collection_step == 3}">
            <img src="../../../static/imgs/common/num_3.png">
            <img src="../../../static/imgs/common/num_3_b.png">
            完善人物信息
          </div>
        </div>
        <!--
        -
        -
        -    采集第一个步骤
        -->
        <div class="collection_content" v-show="collection_step == 1">
          <div class="collection_content_title">请选择（可多选）：</div>
          <div class="collection_item">
            <div :class="{ active: value != null }">
              <a-select defaultValue="男" placeholder="统战" :getPopupContainer="getPopupContainer" allowClear v-model="value">
                <a-select-option value="男">男</a-select-option>
                <a-select-option value="女">女</a-select-option>
              </a-select>
            </div>
          </div>
          <div class="collection_item" v-for="item of collection_List">
            <div @click="select_item(item)" :class="{ active: isSelected(item) != -1 }"><span>{{item}}</span></div>
          </div>
        </div>
        <!--
        -
        -
        -    采集第二个步骤
        -->
        <div class="collection_content" v-show="collection_step == 2">
          <div class="form_box input3">
            <div class="input_box" data-veri="">
              <span><i></i>姓名：</span>
              <a-input placeholder="请输入姓名" v-model="step2_data.name"/>
              <span class="error_tip hidden">请输入姓名！</span>
            </div>
            <div class="input_box">
              <span><i></i>性别：</span>
              <a-select defaultValue="男" placeholder="请选择性别" :getPopupContainer="getPopupContainer" v-model="step2_data.gender">
                <a-select-option value="男">男</a-select-option>
                <a-select-option value="女">女</a-select-option>
              </a-select>
              <span class="error_tip hidden">请输入单位！</span>
            </div>
            <div class="input_box">
              <span><i></i>界别：</span>
              <a-input placeholder="请输入界别" v-model="step2_data.jb"></a-input>
              <span class="error_tip hidden">请输入界别！</span>
            </div>
          </div>
          <div class="form_box input2_button" style="margin-top: -60px;">
            <template v-for="(item,key) in step2_data.tableData1">
              <div class="input_box long">
                <span><i></i>现任单位：</span>
                <a-input placeholder="请输入姓名" v-model="item.xrdw"></a-input>
                <span class="error_tip hidden">请输入现任单位！</span>
              </div>
              <div class="input_box">
                <span><i></i>职务：</span>
                <a-input placeholder="请输入职务" v-model="item.zw"></a-input>
                <span class="error_tip hidden">请输入职务！</span>
              </div>
              <button v-if="key == 0" @click="step2_add()">添加</button>
            </template>
          </div>

          <div class="table_srocll border">
            <table>
              <tr>
                <th style="width: 150px;">序号</th>
                <th style="width: 200px;">人物类别</th>
                <th>设置人物类别时间</th>
              </tr>
              <tr v-for="(item,key) in step2_data.tableData2">
                <td>{{key+1}}</td>
                <td>{{item.rwlb}}</td>
                <td><a-date-picker :locale=$store.state.locale /></td>
              </tr>
            </table>
          </div>
        </div>
        <!--
        -
        -
        -    采集第三个步骤
        -->
        <div class="collection_content" v-show="collection_step == 3">

        </div>

        <div class="collection_button" @click="collection_confirm()">确认</div>
      </div>



    </div>
</template>
<script type="es6">
    import Until from '../../until/index'
    export default {
      data () {
        return {
          collection_step:1,
          collection_selected:[],
          collection_List:['无党派人士','党外知识分子','出国和归国留学人士','香港同胞、澳门同胞','台湾同胞及其在大陆的亲属','华侨、归侨及侨眷','党外知识分子','出国和归国留学人士','香港同胞、澳门同胞','台湾同胞及其在大陆的亲属','华侨、归侨及侨眷','党外知识分子','出国和归国留学人士','香港同胞、澳门同胞','台湾同胞及其在大陆的亲属','华侨、归侨及侨眷','党外知识分子'],
          value:null,
          step2_data:{
            name:null,
            gender:null,
            jb:null,
            tableData1:[
              {xrdw:null,zw:null}
            ],
            tableData2:[
              {rwlb:'XXX',szrwlbsj:null}
            ]
          }

        }
      },
      created () {

      },
      methods: {
        step(num){
          this.collection_step = num;
        },
        isSelected(val){
          return this.collection_selected.indexOf(val);
        },
        select_item(val){
          let index = this.collection_selected.indexOf(val);
          if(index == -1){
            this.collection_selected.push(val);
          }else{
            this.collection_selected.splice(index,1);
          }
        },
        collection_confirm(){
          this.collection_step++;
        },
        step2_add(){
          this.step2_data.tableData1.push({xrdw:'123',zw:'321'});
        },
        getPopupContainer(trigger){
          return trigger.parentElement;
        }
      },
      computed:{
      }
    }

</script>
<style lang="scss" scoped>
  @import "./PersonInforCollect.scss";
</style>
