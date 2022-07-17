<template>
  <div class="park">
        <div class="nav">
            <p>{{title}}</p>
        </div>
        <div class="content">
            <MusicList v-if="title==='歌单广场'" :list="state.tags"/>
            <MvList v-if="title==='MV广场'"/>
        </div>
  </div>
</template>

<script>
import {onMounted, reactive} from 'vue'
import { useStore } from 'vuex'
import MusicList from '@/components/Park/music.vue'
import MvList from '@/components/Park/mv.vue'
export default {
    name:'MusicPark',
    props:['title'],
    components:{MusicList, MvList},
    setup() {

        const store = useStore()
        const state = reactive({
            tags:[]
        })
        
        onMounted(async ()=>{
            await store.dispatch('music/getHotPlayList')
            // await store.dispatch('music/getAllPlayList')
            state.tags = store.state.music.tags

        })

        return {state}
    }
}
</script>

<style lang='less' scoped>
.park{
    .nav{
        width: 100%;
        height: 1.1rem;
        line-height: 1.1rem;
        color: #fff;
        position: fixed;
        top: 0;
        p{
            margin-left: .8rem;
        } 
    }
    .content{
        margin-top: 1.1rem;
    }
}
</style>