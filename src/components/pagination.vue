<template>
  <span class="pag_box">
    <a-locale-provider :locale="locale">
      <a-pagination
        class="page-content"
        showQuickJumper
        :pageSizeOptions="['10', '20', '30', '40', '50']"
        showSizeChanger
        :total="total"
        :pageSize="pageSize"
        :current="current"
        :showTotal="total => `共 ${total} 条`"
        @change="onChange"
        @showSizeChange="onShowSizeChange"
      >
      </a-pagination>
    </a-locale-provider>
    <!--<span class="total">共 {{total}} 条</span>-->
  </span>
</template>

<script type="es6">
  export default {
    data () {
    return {
      locale:{
        Pagination:{
          items_per_page: '条/页',
          jump_to: '跳至',
          jump_to_confirm: '确定',
          page: '页',
          prev_page: '上一页',
          next_page: '下一页',
          prev_5: '向前 5 页',
          next_5: '向后 5 页',
          prev_3: '向前 3 页',
          next_3: '向后 3 页',
        }
      }
    }
  },
  props: {
    total: {
      require: true,
        type: Number
    },
    pageSize: {
      require: true,
        type: Number
    },
    current: {
      require: true,
        type: Number
    }
  },
  methods: {
    onChange (current, pageSize) {
      this.$emit('onChange', current, pageSize)
    },
    onShowSizeChange (current, pageSize) {
      this.$emit('onShowSizeChange', current, pageSize)
    }
  }
  }
</script>
<style lang='scss' rel="stylesheet/scss" type="text/scss">
  .pag_box{
    display: inline-block;
    float: right;
    padding: 15px 0;
    margin-right: 20px;
  }
</style>
