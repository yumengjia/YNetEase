<template>
    <div class="outer">
        <van-tabs v-model:active="active" @click-tab="onClickTab" background='rgba(0,0,0,0.5)' title-inactive-color='#fff' title-active-color='#ccc'>
            <van-tab v-for="(item,index) in list" :title="item.name" :key="index">
                <template #default>
                    <div class="list">
                        <div class="song" v-for="(item,index) in state.playlist" :key="index">
                            <router-link :to="{path:'/itemmusic',query:{id:item.id}}">
                                <img :src="item.al.picUrl" alt="">
                                <p class="content">{{item.name}}</p>
                        </router-link>
                        </div>  
                    </div>
                </template>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
import { onMounted, reactive, ref, watch} from 'vue'
import { useStore } from 'vuex'
export default {
    name:'MusicList',
    props:['list'],
    setup(props) {
        const active = ref(0)
        const store = useStore()
        const state = reactive({
            playlist:[]
        })

        const onClickTab = async ({name}) => {
            // console.log(props.list[name].id);
            let id = props.list[name].id
            await store.dispatch('music/getAllPlayList',id)
            state.playlist = store.state.music.playlist
        }
        
        watch(props,async function(newValue){
            let id = newValue.list[0].id
            await store.dispatch('music/getAllPlayList',id)
            state.playlist = store.state.music.playlist

            // console.log(newValue.list);
        })

        return {state, active, onClickTab}
    }
}
</script>

<style lang='less' scoped>
.outer{
    .list{
        width: 100%;
        display: flex;
        flex-wrap:wrap;
        justify-content: space-around;

        .song{
            width: 100px;
            height: 140px;
            // border: 1px solid #fff;
            margin-bottom: .4rem;
            img{
                width: 100px;
                height: 100px;
                border-radius: 10px;
            }
            .content{
                color: #fff;
                font-size: 12px;
                text-align: center;
                margin-top: 10px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                
            }
            
        }
       
    }
}

</style>