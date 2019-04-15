<template>
  <div>

    <div @click="gotoPage">index page</div>
    <input type="text" v-model="message" />
    <!--<img src="static/imgs/bw.png"/>-->
    <div class="img1"></div>
    <div class="img2"></div>

  </div>
</template>
<script type="es6">
    import Utils from '../../until/index';
    export default {
      data () {
        return {
          message:'',
          list: [],
          id:''
        }
      },
      created () {
        console.log(this.$store.state.test);
        this.$store.state.test++;
        console.log('111');
        //this.id = $route.params.id;
        //this.getData();
      },
      mounted() {
        var self = this;
        Utils.$on('aler', function (str) {
          self.aler(str);
        })
      },
      methods: {
        getData () {
          this.$api.get('topics', null, r => {
            this.list = r.data
          })
        },
        gotoPage(){
          console.log('111');
          this.$router.push({ name: 'Content', params: { userId: 123 }})
        },
        aler(str){
          alert(str);
        }
      }
    }
</script>
<style lang="scss" scoped>
  @import "./index.scss";
</style>
