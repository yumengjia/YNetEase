<template>
    <div class="musicList">
         <NavBlock title="推荐MV"/>
        <div>
            <MyMvList :list='state.mvList'/>
        </div>
        <NavBlock title="精品歌单"/>
        <div style="margin-bottom:60px">
            <MySwiper :list='state.musicList'/>
        </div>
       <!--  <NavBlock title="推荐电台"/>
        <div style="margin-bottom:60px">
            <DjList :list='state.djList'/>
        </div> -->
       
    </div>
</template>

<script>
import {useStore} from 'vuex'
import {onMounted, reactive} from 'vue'
import NavBlock from '@/components/blocks/NavBlock'
import MySwiper from '@/components/MySwiper'
import MyMvList from '@/components/MyMvList'
import DjList from '@/components/DjList'
export default {
    name:"MusicList",
    components:{MySwiper,MyMvList,NavBlock, DjList},
    setup() {
        const state = reactive({
            musicList:[],
            mvList:[],
            djList:[]
        })
        const store = useStore()
        onMounted(async()=>{
            await store.dispatch('home/getMusicList')
            state.musicList = store.state.home.musicList
            await store.dispatch('home/getMvList')
            state.mvList = store.state.home.mvList
            await store.dispatch('home/getDjList')
            state.djList = store.state.home.djList
        })

        return {state}
    }
}
</script>

<style lang='less' scoped>
    .musicList {
        width: 100%;
        // height: 75%;
        padding: 0.2rem;
        box-sizing: border-box;
        .musicTop{
            width: 100%;
            height: 0.6rem;
            display: flex;
            justify-content: space-between;
            margin-bottom: 0.2rem;
            .title{
                font-size: 0.35rem;
                font-weight: 900;
            }
            .more{
                font-size: 0.25rem;
                border: 1px solid #ccc;
                text-align: center;
                line-height: 0.6rem;
                padding: 0 0.2rem;
                border-radius: 0.4rem;
            }
        }
    }
</style>