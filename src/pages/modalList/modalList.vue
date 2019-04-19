<template>
    <div>
      <div class="content_box" style="height: 400px">
        <div class="content_title"><img src="static/imgs/content_title/title_cx.png">查询</div>
        <button @click="modal_show(1)">表单类型弹出框</button>
      </div>

      <div class="modal_box hidden modal1">
        <div class="modal" style="width: 900px;height: auto">
          <div class="modal_title">表单类型弹出框<i></i></div>
          <div class="modal_content">

            <div class="form_box input2">
              <div class="input_box">
                <div class="input_name"><span><i></i>姓名：</span></div>
                <a-input placeholder="请输入姓名"/>
                <span class="error_tip hidden">请输入姓名！</span>
              </div>
              <div class="input_box">
                <div class="input_name"><span><i></i>姓名：</span></div>
                <a-input placeholder="请输入姓名"/>
                <span class="error_tip hidden">请输入姓名！</span>
              </div>
              <br/>
              <div class="btn_box">
                <button class="search">查询</button>
                <button class="clear">重置</button>
              </div>
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
                  <td>{{key+1}}</td>
                  <td>{{item.name}}</td>
                  <td>{{item.date}}</td>
                  <td>{{item.address}}</td>
                  <td>{{item.gender}}</td>
                  <td>{{item.data1}}</td>
                  <td>{{item.data2}}</td>
                </tr>
              </table>
            </div>
            <!--<Pagination
              :total="pagination.totalCount"
              :pageSize="pagination.pageSize"
              :current="pagination.pageNo"
              @onChange="onChangePage"
              @onShowSizeChange="onShowSizeChangePage"
            ></Pagination>-->

            <div class="modal_btn_box">
              <div class="modal_btn_content">
                <button class="search">确定</button>
                <button class="clear">取消</button>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div class="content_box">
        <a-input-search style="margin-bottom: 8px" placeholder="Search"/>
        <a-tree
          @expand="onExpand"
          :expandedKeys="expandedKeys"
          :autoExpandParent="autoExpandParent"
          v-model="checkedKeys"
          @select="onSelect"
          :selectedKeys="selectedKeys"
          :treeData="treeData"
        ></a-tree>
      </div>

    </div>
</template>
<script type="es6">
    import Utils from '../../until/index';
    import Pagination from '../../components/pagination.vue'
    export default {
      name:'modalList',
      components: { Pagination },
      data () {
        return {
          expandedKeys: ['0-0-0', '0-0-1'],
          autoExpandParent: true,
          checkedKeys: ['0-0-0'],
          selectedKeys: [],
          treeData:[{
            title: '市级',
            key: '0-0',
            children: [{
              title: '民盟宁波市委',
              key: '0-0-0',
              children: [
                { title: '0-0-0-0', key: '0-0-0-0' },
                { title: '0-0-0-1', key: '0-0-0-1' },
                { title: '0-0-0-2', key: '0-0-0-2' },
              ],
            }, {
              title: '0-0-1',
              key: '0-0-1',
              children: [
                { title: '0-0-1-0', key: '0-0-1-0' },
                { title: '0-0-1-1', key: '0-0-1-1' },
                { title: '0-0-1-2', key: '0-0-1-2' },
              ],
            }, {
              title: '0-0-2',
              key: '0-0-2',
            }],
          }, {
            title: '0-1',
            key: '0-1',
            children: [
              { title: '0-1-0-0', key: '0-1-0-0' },
              { title: '0-1-0-1', key: '0-1-0-1' },
              { title: '0-1-0-2', key: '0-1-0-2' },
            ],
          }, {
            title: '0-2',
            key: '0-2',
          }],
          pagination: {
            pageNo: 1,
            pageSize: 10,
            totalCount: 50
          },
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
        }
      },
      created () {

      },
      methods: {
        modal_show(type){
          switch(type){
            case 1:
              document.querySelector('.modal1').classList.remove('hidden');
              break;
          }
        },
        onExpand (expandedKeys) {
          this.expandedKeys = expandedKeys
          this.autoExpandParent = false
        },
        onSelect (selectedKeys, info) {
          console.log('onSelect', info)
          this.selectedKeys = selectedKeys
        },
      }
    }

</script>
<style lang="scss" scoped>

</style>
