<template>
  <div class="village">
    <van-swipe vertical style="height: 100%;" :show-indicators="false" lazy-render @change="onChange">
      <van-swipe-item v-for="(item,index) in state.recomVideo" :key="index">
        <template #default>
          <FullScreenMv :mv='item' :mvurl='state.mvurl' :curMv="state.curMv" :changeState='changeState'/>
        </template>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import {onMounted, reactive, ref} from 'vue'
import {useStore} from 'vuex'
import FullScreenMv from '@/components/FullScreenMv'
export default {
    name:' Village',
    components:{FullScreenMv},
    setup() {
      const store = useStore()
      const state = reactive({
        recomVideo:[],
        mvurl:'',
        curMv:{},
        count:1
      })

      const changeState = (video) => {
        if(state.curMv){
           state.curMv.isPlay = ! state.curMv.isPlay
          if(state.curMv.isPlay){
            video.play()
          }else{
            video.pause()
          }
        }
       
      }
      const onChange = async(index) => {
        state.curMv = state.recomVideo[index];
        state.mvurl = state.recomVideo[index].data.urlInfo?.url

        //第八条数据(索引为7)被覆盖了？
        if(index===7){
          await store.dispatch('home/getRemdVideo',8*state.count)
          state.recomVideo = store.state.home.recomVideo
          console.log( state.recomVideo);
          state.count = state.count + 1
        }
      }

      onMounted(async ()=>{
        await store.dispatch('home/getRemdVideo',0)
        state.recomVideo = store.state.home.recomVideo
        console.log( state.recomVideo);
        if(state.recomVideo[0]){
          state.curMv = state.recomVideo[0]
          state.mvurl = state.recomVideo[0].data.urlInfo.url
        }
       
     
      })

      return {state, changeState, onChange}
    } 
}
</script>

<style lang='less' scoped>
 .village{
  width: 100%;
  height: 100%;
 }
 
</style>