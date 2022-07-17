<template>
  <div class="swiperTop">
    <van-swipe :autoplay="3000" lazy-render>
      <van-swipe-item v-for="image in state.images" :key="image">
        <img :src="image.imageUrl" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import {useStore} from 'vuex'
import {reactive,onMounted} from 'vue'
export default {
  name:'Banner',
  setup(){
    const state = reactive({
      images:[]
    })
    const store = useStore()

    onMounted(async ()=>{
      await store.dispatch('home/getBanner')
      state.images = store.state.home.banner
    })
    return {state}
  },
}
</script>

<style lang='less' scoped>
  .swiperTop{
    width: 100%;
    height: 25%;
    .van-swipe{
      width: 100%;
      // height: 3rem;
      height: 100%;
      .van-swipe-item{
        box-sizing: border-box;
        padding: 0 0.2rem;
        img{
          width: 100%;
          height: 100%;
          border-radius: 0.2rem;
        }
      }
    }
  }
</style>