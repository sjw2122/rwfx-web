<template>
  <div>

    <div @click="gotoPage">content page</div>
    <div class="img1"></div>

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
        Utils.$emit('aler', 'hi');
        console.log(this.$store.state.test);
        //this.id = $route.params.id;
        //this.getData();
      },
      methods: {
        gotoPage(){
          console.log('111');
          this.$router.push({ name: 'Index', params: { userId: 123 }})
        }
      }
    }
</script>
