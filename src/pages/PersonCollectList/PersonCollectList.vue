<template>
  <div>
    <div class="content_box">
      <div class="content_title"><img src="static/imgs/content_title/title_cx.png">查询</div>
      <div class="form_box">

        <div class="input_box" data-veri="">
          <div class="input_name"><span>姓名：</span></div>
          <a-input placeholder="请输入姓名" v-model="xm"/>
          <span class="error_tip hidden">请输入姓名！</span>
        </div>
        <div class="input_box">
          <div class="input_name"><span><i></i>性别：</span></div>
          <a-select defaultValue="男" v-model="xb" :getPopupContainer="getPopupContainer">
            <a-select-option value="男">男</a-select-option>
            <a-select-option value="女">女</a-select-option>
          </a-select>
        </div>
        <div class="input_box">
          <div class="input_name"><span><i></i>人物类别：</span></div>
          <a-input placeholder="请输入内容" v-model="rwlb"/>
        </div>
        <div class="input_box">
          <div class="input_name"><span><i></i>面貌：</span></div>
          <a-select defaultValue="" v-model="zzmm" :getPopupContainer="getPopupContainer">
            <a-select-option value="中共">中共</a-select-option>
            <a-select-option value="民盟">民盟</a-select-option>
          </a-select>
        </div>
        <div class="input_box">
          <div class="input_name"><span><i></i>采集状态：</span></div>
          <a-select defaultValue="已提交" v-model="cjzt" :getPopupContainer="getPopupContainer">
            <a-select-option value="已提交">已提交</a-select-option>
            <a-select-option value="未提交">未提交</a-select-option>
          </a-select>
        </div>
      </div>
      <br/>
      <span class="btn_box">
          <button class="search" @click="search()">查询</button>
          <button class="clear">重置</button>
        </span>
    </div>

    <div class="content_box">
      <div class="content_title"><img src="">查询结果列表
        <span class="tag">查看历史转移记录</span>
        <span class="tag">新增</span>
      </div>
      <div class="table_srocll">
        <table>
          <tr>
            <th>序号</th>
            <th>姓名</th>
            <th>性别</th>
            <th>出生年月</th>
            <th>现任职务</th>
            <th>人物类别</th>
            <th>民族</th>
            <th>婚姻状况</th>
            <th>籍贯</th>
            <th>政治面貌</th>
            <th>主管责任单位</th>
            <th>操作</th>
          </tr>
          <tr v-for="(item,key) in tableData">
            <td>
              <a-radio-group @change="radioChange(key)" v-model="radio">
                <a-radio :value="key"></a-radio>
              </a-radio-group>
              {{key+1}}</td>
            <td>{{item.xm}}</td>
            <td>{{item.xb}}</td>
            <td>{{item.csny}}</td>
            <td>{{item.xrzw}}</td>
            <td>{{item.rwlb}}</td>
            <td>{{item.mz}}</td>
            <td>{{item.hyzk}}</td>
            <td>{{item.jg}}</td>
            <td>{{item.zzmm}}</td>
            <td>{{item.zgzrdw}}</td>
            <td>修改</td>
          </tr>
        </table>
        <!--<el-table :data="tableData">
          <el-table-column type="index" :index="indexMethod" label="序号"></el-table-column>
          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column prop="date" label="时间"></el-table-column>
          <el-table-column prop="address" label="地址"></el-table-column>
          <el-table-column prop="gender" label="性别"></el-table-column>
          <el-table-column prop="data1" label="民族"></el-table-column>
          <el-table-column prop="data2" label="籍贯"></el-table-column>
        </el-table>-->
      </div>
      <Pagination
        :total="pagination.totalCount"
        :pageSize="pagination.pageSize"
        :current="pagination.pageNo"
        @onChange="onChangePage"
        @onShowSizeChange="onShowSizeChangePage"
      ></Pagination>
    </div>
  </div>
</template>
<script type="es6">
  import Utils from '../../until/index';
  import Pagination from '../../components/pagination.vue'
  export default {
    name:'PersonCollectList',
    components: { Pagination },
    data () {
      return {
        pagination: {
          pageNo: 1,
          pageSize: 10,
          totalCount: 50
        },
        xm:'',
        xb:'',
        rwlb:'',
        zzmm:'',
        cjzt:'',
        selected:0,
        tableData: [{
          radio:true,
          date: '2016-05-02',
          xm: '张三',
          address: '宁波',
          gender: '男',
          data1:'汉族',
          data2:'宁波'
        },{
          radio:false,
          date: '2016-05-02',
          name: '张三',
          address: '宁波',
          gender: '男',
          data1:'汉族',
          data2:'宁波'
        },{
          radio:false,
          date: '2016-05-02',
          name: '张三',
          address: '宁波',
          gender: '男',
          data1:'汉族',
          data2:'宁波'
        },{
          radio:false,
          date: '2016-05-02',
          name: '张三',
          address: '宁波',
          gender: '男',
          data1:'汉族',
          data2:'宁波'
        },{
          radio:false,
          date: '2016-05-02',
          name: '张三',
          address: '宁波',
          gender: '男',
          data1:'汉族',
          data2:'宁波'
        }
        ],
        genderList:[
          {value: '男', label: '男'},
          {value: '女', label: '女'}
        ],
        select_value:'a',
        options: [{
          value: 'a',
          label: 'a'
        }, {
          value: 'b',
          label: 'b'
        }, {
          value: 'c',
          label: 'c'
        }],
        date:'',
        radio:0
      }
    },
    created () {
      let self = this;
      Utils.$on('PersonManageAuth', function () {
        self.text1 = null;
      })
    },
    methods: {
      search(){
        this.$api.post('http://localhost:5001/rwxxcj/getRwcjList', {"xm":this.xm,"xb":this.xb,"rwlb":this.rwlb,"zzmm":this.zzmm,"cjzt":this.cjzt}, r => {
          this.tableData = r.data.list;
          this.pagination.totalCount = r.data.size;
        })
      },
      currentChange(val){
        console.log(val);
      },
      getPopupContainer (trigger) {
        return trigger.parentElement
      },
      radioChange(key){
        this.radio = key;
      },
      onChangePage (pageNo, pageSize) {
        this.pagination.pageNo = pageNo;
        console.log(pageNo);
        // 重新请求数据
      },
      onShowSizeChangePage (pageNo, pageSize) {
        this.pagination.pageSize = pageSize;
        console.log(pageSize);
        // 重新请求数据
      }
    }
  }

</script>
<style lang="scss" scoped>
  @import "./PersonCollectList.scss";
</style>
