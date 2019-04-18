<template>
    <div>
      <!--
      -
      -
      -    查询页面
      -->
      <div class="content_box" v-show="collection_step == 0">
        <div class="content_title" ><img src="static/imgs/content_title/title_cx.png">查询</div>
        <div class="form_box">
          <div class="input_box" data-veri="">
            <div class="input_name"><span><i></i>姓名：</span></div>
            <a-input placeholder="请输入姓名" />
            <span class="error_tip hidden">请输入姓名！</span>
          </div>
          <div class="input_box">
            <div class="input_name"><i></i><span>现任职单位：</span></div>
            <a-input placeholder="请输入单位"/>
            <span class="error_tip hidden">请输入单位！</span>
          </div>
          <div class="btn_box">
            <button class="search" @click="search()" >查询</button>
          </div>
        </div>
      </div>
      <div class="content_box cxjg" v-show="collection_step == 0">
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
              <div class="input_name"><span><i></i>姓名：</span></div>
              <a-input placeholder="请输入姓名" v-model="step2_data.name"/>
              <span class="error_tip hidden">请输入姓名！</span>
            </div>
            <div class="input_box">
              <div class="input_name"><span><i></i>性别：</span></div>
              <a-select defaultValue="男" placeholder="请选择性别" :getPopupContainer="getPopupContainer" v-model="step2_data.gender">
                <a-select-option value="男">男</a-select-option>
                <a-select-option value="女">女</a-select-option>
              </a-select>
              <span class="error_tip hidden">请输入单位！</span>
            </div>
            <div class="input_box">
              <div class="input_name"><span><i></i>界别：</span></div>
              <a-input placeholder="请输入界别" v-model="step2_data.jb"></a-input>
              <span class="error_tip hidden">请输入界别！</span>
            </div>
          </div>
          <div class="form_box input2_button" style="margin-top: -60px;">
            <template v-for="(item,key) in step2_data.tableData1">
              <div class="input_box long">
                <div class="input_name"><span><i></i>现任单位：</span></div>
                <a-input placeholder="请输入姓名" v-model="item.xrdw"></a-input>
                <span class="error_tip hidden">请输入现任单位！</span>
              </div>
              <div class="input_box">
                <div class="input_name"><span><i></i>职务：</span></div>
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
        <div class="infor_box" v-show="collection_step == 3">
          <!--基础信息-->
          <div class="infor_content jcxx">
            <div class="infor_title">
              基础信息
              <span class="infor_tag add">添加</span>
              <span class="infor_tag edit">编辑</span>
              <span class="infor_tag delete">删除</span>
              <span class="infor_tag share">分享</span>
              <span class="infor_tag save">保存</span>
            </div>
            <div class="form_box">
              <div class="input_box" data-veri="">
                <div class="input_name"><span><i></i>姓名：</span></div>
                <a-input placeholder=""/>
                <span class="error_tip hidden">请输入姓名！</span>
              </div>
              <div class="input_box">
                <div class="input_name"><span><i></i>曾用名：</span></div>
                <a-input placeholder=""/>
              </div>
              <div class="input_box">
                <div class="input_name"><span><i></i>性别：</span></div>
                <a-select defaultValue="男" :getPopupContainer="getPopupContainer">
                  <a-select-option value="男">男</a-select-option>
                  <a-select-option value="女">女</a-select-option>
                </a-select>
              </div>
              <div class="input_box">
                <div class="input_name"><span><i></i>民族：</span></div>
                <a-select v-model="gender" :getPopupContainer="getPopupContainer">
                  <a-select-option value="汉族">汉族</a-select-option>
                </a-select>
              </div>
              <div class="input_box">
                <div class="input_name"><span><i></i>国籍：</span></div>
                <a-select v-model="gender" :getPopupContainer="getPopupContainer">
                  <a-select-option value="1">中国</a-select-option>
                </a-select>
              </div>
              <div class="input_box">
                <div class="input_name"><span><i></i>籍贯：</span></div>
                <a-input placeholder=""/>
              </div>
              <div class="input_box">
                <div class="input_name"><span><i></i>原贯：</span></div>
                <a-input placeholder=""/>
              </div>
              <div class="input_box">
                <div class="input_name"><span><i></i>婚姻状态：</span></div>
                <a-select v-model="gender" :getPopupContainer="getPopupContainer">
                  <a-select-option value="1">未婚</a-select-option>
                </a-select>
              </div>
              <div class="input_box">
                <div class="input_name"><span><i></i>健康状况：</span></div>
                <a-select v-model="gender" :getPopupContainer="getPopupContainer">
                  <a-select-option value="1">健康</a-select-option>
                </a-select>
              </div>
              <div class="input_box">
                <div class="input_name"><span><i></i>证件类型：</span></div>
                <a-select v-model="gender" :getPopupContainer="getPopupContainer">
                  <a-select-option value="1">内地居民身份证</a-select-option>
                </a-select>
              </div>
              <div class="input_box input_button">
                <div class="input_name"><span><i></i>证件号码：</span></div>
                <a-input placeholder=""/>
                <button>上传</button>
              </div>
              <div class="input_box">
                <div class="input_name"><span><i></i>出生年月：</span></div>
                <a-date-picker :locale=$store.state.locale />
              </div>
              <div class="input_box">
                <div class="input_name"><span><i></i>年龄：</span></div>
                <a-input-number placeholder=""/>
              </div>
              <div class="input_box">
                <div class="input_name"><span><i></i>出生地：</span></div>
                <a-input placeholder=""/>
              </div>
              <div class="input_box">
                <div class="input_name"><span><i></i>政治面貌：</span></div>
                <a-select :getPopupContainer="getPopupContainer">
                  <a-select-option value="1">群众</a-select-option>
                </a-select>
              </div>
              <div class="input_box">
                <div class="input_name"><span><i></i>加入时间(认定时间)：</span></div>
                <a-date-picker :locale=$store.state.locale />
              </div>
              <div class="input_box">
                <div class="input_name"><span><i></i>入党（社）介绍人(认定人)：</span></div>
                <a-input placeholder=""/>
              </div>
              <div class="input_box">
                <div class="input_name"><span><i></i>参加工作时间：</span></div>
                <a-date-picker :locale=$store.state.locale />
              </div>
              <div class="input_box">
                <div class="input_name"><span><i></i>是否联谊交友对象：</span></div>
                <a-radio-group>
                  <a-radio value="1">是</a-radio>
                  <a-radio value="2">否</a-radio>
                </a-radio-group>
              </div>
              <div class="input_box longText">
                <div class="input_name"><span><i></i>是否取得国（境）外永久居留地或长期居留许可：</span></div>
                <a-radio-group>
                  <a-radio value="1">是</a-radio>
                  <a-radio value="2">否</a-radio>
                </a-radio-group>
              </div>
              <div class="input_box">
                <div class="input_name"><span><i></i>居住许可信息：</span></div>
                <a-input placeholder=""/>
              </div>
              <div class="input_box img_button">
                <div class="input_name"><span><i></i>人物头像：</span></div>
                <img src="">
                <button>上传证件照</button>
              </div>
              <div class="input_box">
                <div class="input_name"><span><i></i>界别：</span></div>
                <a-input placeholder=""/>
              </div>
              <div class="input_box">
                <div class="input_name"><span><i></i>所在国家及城市：</span></div>
                <a-input placeholder=""/>
              </div>
              <div class="input_box">
                <div class="input_name"><span><i></i>状态：</span></div>
                <a-select :getPopupContainer="getPopupContainer">
                  <a-select-option value="1">健在</a-select-option>
                </a-select>
              </div>
              <div class="input_box">
                <div class="input_name"><span><i></i>已故时间：</span></div>
                <a-date-picker :locale=$store.state.locale />
              </div>
              <div class="input_box textarea">
                <div class="input_name"><span><i></i>人物简历：</span></div>
                <a-textarea placeholder="" />
              </div>
            </div>

            <div class="infor_small_title">
                教育相关信息
                <div class="tag save">保存</div>
            </div>

            <div class="form_box jyxgxx">
              <div class="input_box">
                <div class="input_name"><span><i></i>全日制院校及专业：</span></div>
                <a-input placeholder=""/>
              </div>
              <div class="input_box jyxgxx_input">
                <div class="input_name"><span><i></i>全日制学历：</span></div>
                <a-select :getPopupContainer="getPopupContainer">
                  <a-select-option value="1">本科</a-select-option>
                </a-select>
                <a-select :getPopupContainer="getPopupContainer">
                  <a-select-option value="1">本科</a-select-option>
                </a-select>
                <button>上传</button>
              </div>
              <div class="input_box jyxgxx_input">
                <div class="input_name"><span><i></i>全日制学位：</span></div>
                <a-select :getPopupContainer="getPopupContainer">
                  <a-select-option value="1">工科学士</a-select-option>
                </a-select>
                <a-select :getPopupContainer="getPopupContainer">
                  <a-select-option value="1">工科学士</a-select-option>
                </a-select>
                <button>上传</button>
              </div>
              <div class="input_box">
                <div class="input_name"><span><i></i>在职院校及专业：</span></div>
                <a-input placeholder=""/>
              </div>
              <div class="input_box jyxgxx_input">
                <div class="input_name"><span><i></i>在职教育学历：</span></div>
                <a-select :getPopupContainer="getPopupContainer">
                  <a-select-option value="1">本科</a-select-option>
                </a-select>
                <a-select :getPopupContainer="getPopupContainer">
                  <a-select-option value="1">本科</a-select-option>
                </a-select>
                <button>上传</button>
              </div>
              <div class="input_box jyxgxx_input">
                <div class="input_name"><span><i></i>在职教育学位：</span></div>
                <a-select :getPopupContainer="getPopupContainer">
                  <a-select-option value="1">工科学士</a-select-option>
                </a-select>
                <a-select :getPopupContainer="getPopupContainer">
                  <a-select-option value="1">工科学士</a-select-option>
                </a-select>
                <button>上传</button>
              </div>
              <div class="input_box">
                <div class="input_name"><span><i></i>全日制院校及专业：</span></div>
                <a-input placeholder=""/>
              </div>
            </div>

            <div class="infor_small_title">
              工作相关信息
              <div class="tag save">保存</div>
            </div>

            <div class="form_box gzxgxx">
              <div class="table_srocll border">
                <table>
                  <tr>
                    <th>序号</th>
                    <th>现任职单位</th>
                    <th>现任职</th>
                    <th>任现职时间</th>
                  </tr>
                  <tr v-for="(item,key) in gzxgxx_tableData">
                    <td>{{key+1}}</td>
                    <td><a-input placeholder="" /></td>
                    <td><a-input placeholder="" /></td>
                    <td><a-date-picker :locale=$store.state.locale /></td>
                  </tr>
                </table>
              </div>
              <div class="input_box">
                <div class="input_name"><span><i></i>职称级别：</span></div>
                <a-select :getPopupContainer="getPopupContainer">
                  <a-select-option value="1">本科</a-select-option>
                </a-select>
              </div>
              <div class="input_box">
                <div class="input_name"><span><i></i>技术职称：</span></div>
                <a-input placeholder=""/>
              </div>
              <div class="input_box">
                <div class="input_name"><span><i></i>任现技术职称时间：</span></div>
                <a-date-picker :locale=$store.state.locale />
              </div>
              <div class="input_box">
                <div class="input_name"><span><i></i>特殊人才：</span></div>
                <a-select :getPopupContainer="getPopupContainer">
                  <a-select-option value="1">本科</a-select-option>
                </a-select>
              </div>
              <div class="input_box">
                <div class="input_name"><span><i></i>状态：</span></div>
                <a-select :getPopupContainer="getPopupContainer">
                  <a-select-option value="1">本科</a-select-option>
                </a-select>
              </div>
              <div class="input_box">
                <div class="input_name"><span><i></i>是否体制内（公职人员）：</span></div>
                <a-select :getPopupContainer="getPopupContainer">
                  <a-select-option value="1">本科</a-select-option>
                </a-select>
              </div>
              <div class="input_box">
                <div class="input_name"><span><i></i>行政级别：</span></div>
                <a-select :getPopupContainer="getPopupContainer">
                  <a-select-option value="1">本科</a-select-option>
                </a-select>
              </div>
              <div class="input_box">
                <div class="input_name"><span><i></i>是否领导职务：</span></div>
                <a-select :getPopupContainer="getPopupContainer">
                  <a-select-option value="1">本科</a-select-option>
                </a-select>
              </div>
              <div class="input_box">
                <div class="input_name"><span><i></i>任现职级时间：</span></div>
                <a-date-picker :locale=$store.state.locale />
              </div>
            </div>





          </div>
          <!--联系方式-->
          <div class="infor_content lxfs">
            <div class="infor_title">
              联系方式
              <span class="infor_tag save">保存</span>
              <span class="infor_tag edit">编辑</span>
            </div>
            <div class="form_box">
              <div class="input_box" data-veri="">
                <span><i></i>办公电话：</span>
                <a-input placeholder="" />
                <span class="error_tip hidden"></span>
              </div>
              <div class="input_box" data-veri="">
                <span><i></i>家庭电话：</span>
                <a-input placeholder=""/>
                <span class="error_tip hidden"></span>
              </div>
              <div class="input_box" data-veri="">
                <span><i></i>移动电话：</span>
                <a-input placeholder=""/>
                <span class="error_tip hidden"></span>
              </div>
              <div class="input_box" data-veri="">
                <span><i></i>通信地址：</span>
                <a-input placeholder=""/>
                <span class="error_tip hidden"></span>
              </div>
              <div class="input_box" data-veri="">
                <span><i></i>邮编：</span>
                <a-input placeholder=""/>
                <span class="error_tip hidden"></span>
              </div>
              <div class="input_box" data-veri="">
                <span><i></i>电子邮箱：</span>
                <a-input placeholder=""/>
                <span class="error_tip hidden"></span>
              </div>
              <div class="input_box" data-veri="">
                <span><i></i>传真：</span>
                <a-input placeholder=""/>
                <span class="error_tip hidden"></span>
              </div>
              <div class="input_box" data-veri="">
                <span><i></i>微信号：</span>
                <a-input placeholder=""/>
                <span class="error_tip hidden"></span>
              </div>
            </div>
          </div>
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
        collection_step: 0,
        collection_selected: [],
        collection_List: ['无党派人士', '党外知识分子', '出国和归国留学人士', '香港同胞、澳门同胞', '台湾同胞及其在大陆的亲属', '华侨、归侨及侨眷', '党外知识分子', '出国和归国留学人士', '香港同胞、澳门同胞', '台湾同胞及其在大陆的亲属', '华侨、归侨及侨眷', '党外知识分子', '出国和归国留学人士', '香港同胞、澳门同胞', '台湾同胞及其在大陆的亲属', '华侨、归侨及侨眷', '党外知识分子'],
        value: null,
        text1:'测试',
        step2_data: {
          name: null,
          gender: null,
          jb: null,
          tableData1: [
            {xrdw: null, zw: null}
          ],
          tableData2: [
            {rwlb: 'XXX', szrwlbsj: null}
          ]
        },
        gzxgxx_tableData:[
          {id:''}
        ]
      }
    },
    created () {


    },
    mounted (){

    },
    methods: {
      search(){
        this.$api.get('http://localhost:5001/ywryjcxx/findRyjcxxByXh/01', null, r => {
          //this.list = r.data
          //alert(r.data);
        })
      },
      step(num){
        this.collection_step = num;
      },
      isSelected(val){
        return this.collection_selected.indexOf(val);
      },
      select_item(val){
        let index = this.collection_selected.indexOf(val);
        if (index == -1) {
          this.collection_selected.push(val);
        } else {
          this.collection_selected.splice(index, 1);
        }
      },
      collection_confirm(){
        this.collection_step++;
      },
      step2_add(){
        this.step2_data.tableData1.push({xrdw: '123', zw: '321'});
      },
      getPopupContainer(trigger){
        return trigger.parentElement;
      }
    },
    computed: {}
  }

</script>
<style lang="scss" scoped>
  @import "./PersonInforCollect.scss";
</style>
