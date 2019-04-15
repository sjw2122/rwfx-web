<template>
    <div>
      <div class="content_box">
        <div class="content_title"><img src="static/imgs/content_title/title_cx.png">查询</div>
        <div class="form_box">

          <div class="input_box" data-veri="">
            <span><i></i>姓名：</span>
            <el-input v-model="text1" placeholder="请输入内容"></el-input>
            <span class="error_tip hidden">请输入姓名！</span>
          </div>
          <div class="input_box">
            <span><i></i>性别：</span>
            <el-select v-model="gender" placeholder="请选择">
              <el-option
                v-for="item in genderList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="input_box">
            <span><i></i>人物类别：</span>
            <el-input v-model="text2" placeholder="请输入内容"></el-input>
          </div>
          <div class="input_box">
            <span><i></i>面貌：</span>
            <el-select v-model="select_value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="input_box">
            <span><i></i>时间：</span>
            <el-date-picker type="date" placeholder="选择日期" v-model="date"></el-date-picker>
          </div>
          <div class="input_box">
            <span><i></i>单选：</span>
            <el-radio v-model="radio" label="1">备选项</el-radio>
            <el-radio v-model="radio" label="2">备选项</el-radio>
          </div>
          <div class="input_box">
            <span><i></i>单选：</span>
            <el-radio v-model="radio" label="1">备选项</el-radio>
            <el-radio v-model="radio" label="2">备选项</el-radio>
          </div>
          <div class="input_box">
            <span><i></i>时间：</span>
            <el-date-picker type="date" placeholder="选择日期" v-model="date"></el-date-picker>
          </div>
          <div class="input_box">
            <span><i></i>时间：</span>
            <el-date-picker type="date" placeholder="选择日期" v-model="date"></el-date-picker>
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
              <td><el-radio v-model="selected" :label="key"></el-radio>{{key+1}}</td>
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
        <span class="pag_box">
          <el-pagination background layout="prev, pager, next" :total="1000" @current-change="currentChange"></el-pagination>
        </span>
      </div>
    </div>
</template>
<script type="es6">
    export default {
      data () {
        return {
          text1:'',
          text2:'',
          selected:0,
          tableData: [{
            date: '2016-05-02',
            name: '张三',
            address: '宁波',
            gender: '男',
            data1:'汉族',
            data2:'宁波'
          },{
            date: '2016-05-02',
            name: '张三',
            address: '宁波',
            gender: '男',
            data1:'汉族',
            data2:'宁波'
          },{
            date: '2016-05-02',
            name: '张三',
            address: '宁波',
            gender: '男',
            data1:'汉族',
            data2:'宁波'
          },{
            date: '2016-05-02',
            name: '张三',
            address: '宁波',
            gender: '男',
            data1:'汉族',
            data2:'宁波'
          },{
            date: '2016-05-02',
            name: '张三',
            address: '宁波',
            gender: '男',
            data1:'汉族',
            data2:'宁波'
          },{
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
          radio:''
        }
      },
      created () {

      },
      methods: {
        currentChange(val){
          console.log(val);
        }
      }
    }

</script>
<style lang="scss" scoped>
  @import "./PersonManageAuth.scss";
</style>
