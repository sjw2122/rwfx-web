<template>
    <div>
      <div class="content_box">
        <div class="content_title"><img src="static/imgs/content_title/title_cx.png">查询</div>
        <div class="form_box">

          <div class="input_box" data-veri="">
            <div class="input_name"><span><i></i>姓名：</span></div>
            <a-input placeholder="请输入姓名" v-model="text1"/>
            <span class="error_tip hidden">请输入姓名！</span>
          </div>
          <div class="input_box">
            <div class="input_name"><span><i></i>性别：</span></div>
            <a-select defaultValue="男" v-model="gender">
              <a-select-option value="男">男</a-select-option>
              <a-select-option value="女">女</a-select-option>
            </a-select>
          </div>
          <div class="input_box">
            <div class="input_name"><span><i></i>人物类别：</span></div>
            <a-input placeholder="请输入内容" v-model="text2"/>
          </div>
          <div class="input_box">
            <div class="input_name"><span><i></i>面貌：</span></div>
            <a-input placeholder="Basic usage"/>
          </div>
          <div class="input_box">
            <div class="input_name"><span><i></i>时间：</span></div>
            <a-date-picker :locale=$store.state.locale />
          </div>
          <div class="input_box">
            <div class="input_name"><span><i></i>单选：</span></div>
            <a-radio-group>
              <a-radio value="1">A</a-radio>
              <a-radio value="2">B</a-radio>
            </a-radio-group>
          </div>
          <div class="input_box">
            <div class="input_name"><span><i></i>单选：</span></div>
            <a-radio-group>
              <a-radio value="1">备选1</a-radio>
              <a-radio value="2">备选2</a-radio>
            </a-radio-group>
          </div>
          <div class="input_box">
            <div class="input_name"><span><i></i>时间：</span></div>
            <a-date-picker />
          </div>
          <div class="input_box">
            <div class="input_name"><span><i></i>时间：</span></div>
            <a-date-picker />
          </div>
          <div class="btn_box">
            <button class="search">查询</button>
            <button class="clear">重置</button>
          </div>
        </div>
        <br/>
        <span class="btn_box">
          <button class="search">查询</button>
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
              <th>时间</th>
              <th>地址</th>
              <th>性别</th>
              <th>民族</th>
              <th>籍贯</th>
            </tr>
            <tr v-for="(item,key) in tableData">
              <td>
                <a-radio-group @change="radioChange(key)" v-model="radio">
                  <a-radio :value="key"></a-radio>
                </a-radio-group>
                {{key+1}}</td>
              <td>{{item.name}}</td>
              <td>{{item.date}}</td>
              <td>{{item.address}}</td>
              <td>{{item.gender}}</td>
              <td>{{item.data1}}</td>
              <td>{{item.data2}}</td>
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
      components: { Pagination },
      data () {
        return {
          pagination: {
            pageNo: 1,
            pageSize: 10,
            totalCount: 50
          },
          text1:'',
          text2:'',
          selected:0,
          tableData: [{
            radio:true,
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
          gender:'',
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
  @import "./PersonManageAuth.scss";
</style>
