<template>
    <div>
      <h2>1</h2>
      <div class="content">
        <input type="text" v-model="message" />
        <div>{{message}}</div>
      </div>

      <h2>2</h2>
      <div class="content">
        <p v-if="seen">v-if显示隐藏</p>
        <p v-show="seen">v-show显示隐藏</p>
        <button @click="switch_seen()">切换</button>
      </div>

      <h2>3</h2>
      <div class="content">
        <button :disabled="isButtonDisabled">Button</button>
        <button @click="switch_Button()">切换</button>
      </div>

      <h2>4</h2>
      <div class="content">
        <table border="1">
          <tr>
            <td>序号</td>
            <th>姓名</th>
            <th>数量</th>
          </tr>
          <tr v-for="(item, key) of items">
            <td>{{key + 1}}</td>
            <td>{{item.name}}</td>
            <td>{{item.number}}</td>
          </tr>
        </table>
      </div>
    </div>
</template>
<script type="es6">
    import {test} from '../../until/index'
    export default {
      data () {
        return {
          message:'123',
          seen:true,
          isButtonDisabled:true,
          items:[
            {name:'张三',number:100},
            {name:'李四',number:200}
          ]
        }
      },
      created () {
        console.log(this.$store.state.test);
      },
      methods: {
        switch_seen(){
          this.seen = !this.seen;
        },
        switch_Button(){
          this.isButtonDisabled = !this.isButtonDisabled;
        }
      },
      computed:{
        reversedMessage: function () {
          return test(this.message);
        }
      },
      watch:{

      },
      filters: {
        capitalize: function (value) {
          if (!value) return ''
          value = value.toString()
          return value.charAt(0).toUpperCase() + value.slice(1)
        }
      }
    }
</script>
<style lang="scss" scoped>
  @import "./demo.scss";
</style>
