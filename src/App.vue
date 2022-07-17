<template>
  <div class="body">
    <!-- <Layouts/> -->
    <router-view></router-view>
    <div v-show="store.state.user.isFooter">
      <Footer/>
    </div>
  </div>
</template>
<script>
// import Layouts from '@/views/Layouts'
import Footer from '@/components/Footer'
// import UserNews from '@/views/UserNews'
import {useStore} from 'vuex'
export default {
  name:'App',
  components:{Footer},
  setup() {
    const store = useStore()
    return {store}
  }
}
</script>
<style lang="less" scoped>
  .body{
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    background-color: #eee;
  }
</style>
