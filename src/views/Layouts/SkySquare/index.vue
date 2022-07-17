<template>
  <div class="new">
    <NavBlock title="最新MV"/>
     <MyMvList :list='state.newMv'/>
  </div>
  <div class="all">
    <MvList :list='state.allMv'/>
  </div>
 
</template>

<script>
import {reactive, onMounted} from 'vue'
import {useStore} from 'vuex'
import NavBlock from '@/components/blocks/NavBlock'
import MyMvList from '@/components/MyMvList'
import MvList from '@/components/MvList'
export default {
    name:'SkySquare',
    components:{NavBlock, MyMvList, MvList},
    setup() {
      const store = useStore()
      const state = reactive({
        newMv:[],
        allMv:[]
      })

    

      onMounted(async ()=>{
        await store.dispatch('home/getNewMv')
        await store.dispatch('home/getAllMv')
        store.state.home.newMv.forEach(item => {
          item.picUrl = item.cover
        });
        state.newMv = store.state.home.newMv
        state.allMv = store.state.home.allMv
      })
      return {state}
    }
}
</script>

<style lang='less' scoped>
.new{
  height: 4rem;
  :deep(.arrow){
    display: none;
  }
  :deep(.van-swipe){
     .van-swipe-item{
        width: 300px;
        height: 130px;
        box-sizing: border-box;
        padding: 0 0.15rem;
        position: relative;
        img{
            width: 100%;
            // height: 2rem;
            height: 100%;
            border-radius: .3rem;
        }
        .count{
            position: absolute;
            top: 0.1rem;
            right: 0.2rem;
            i{
                font-size: .32rem;
                color: #fff;
            }
        }
        .content{
            font-size: .48rem;
            position: absolute;
            bottom: .2rem;
            left: .2rem;
            color: #fff;
            
        }
    }
  }
}
  
</style>