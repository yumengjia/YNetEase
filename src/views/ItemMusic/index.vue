<template>
<div class="body">
    <div class="top">
        <ItemMusicTop :playlist='state.playlist' :songslist='state.songslist' :type='state.type'/>
    </div>
    <div class="songlist">
        <ItemMusicList :songslist='state.songslist' :subscribedCount='state.playlist?.subscribedCount'/>
    </div>
</div>
</template>

<script>
import {useRoute} from 'vue-router'
import {onMounted, reactive} from 'vue'
import { useStore } from 'vuex'
import ItemMusicTop from '@/views/ItemMusic/Top'
import ItemMusicList from '@/views/ItemMusic/List'
export default {
    name:'ItemMusic',
    components:{ItemMusicTop,ItemMusicList},
    setup() {
        const store = useStore()
        const {getters} = useStore()
        const state = reactive({
            playlist:{},
            privileges:[],
            id:'' ,//歌单id
            songslist:{},//歌单列表
            type:null
            
        })
        onMounted(async()=>{
            state.type = useRoute().query.type || null
            state.id = useRoute().query.id || ''
            if(state.id){
                await store.dispatch('music/getMusicList',state.id)
                state.playlist = getters['music/playlist']
                state.privileges = getters['music/privileges']
                // console.log(state.playlist);

                //歌单列表
                await store.dispatch('music/getPlayList',state.id) 
            }
            state.songslist = store.state.music.songs
            // console.log(store.state.music.songs);
            
        })
        return {state}
    }
}
</script>

<style lang='less' scoped>
    .body{
        position: relative;
        .top{
            position: fixed;
            top: 0;
        }
        .songlist{
            width: 100%;
            position: absolute;
            top: 5.8rem;

        }
    }
  
</style>