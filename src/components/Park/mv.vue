<template>
    <div class="outer">
        <van-tabs v-model:active="active"  @click-tab="onClickTab" background='rgba(0,0,0,0.5)' title-inactive-color='#fff' title-active-color='#ccc'>
                <van-tab v-for="(item,index) in state.list" :title="item" :key="index">
                    <template #default>
                        <div class="list">
                            <MvList :list='state.mvlist'/> 
                        </div>
                    </template>
                </van-tab>  
        </van-tabs>
    </div>
</template>

<script>
import { onMounted, reactive, ref} from 'vue'
import { useStore } from 'vuex'
import MvList from '@/components/MvList'
export default {
    name:'MusicList',
    components:{MvList},
    setup() {
        const active = ref(0)
        const store = useStore()
        const state = reactive({
            list:['全部','内地','港台','欧美','日本','韩国'],
            mvlist:[]
        })

        const onClickTab = async ({name}) => {
            // console.log(props.list[name].id);
            let area = state.list[name]
            await store.dispatch('music/getAllMvList',area)
            state.mvlist = store.state.music.mvlist
        }
        
        onMounted(async ()=>{
            await store.dispatch('music/getAllMvList','全部')
            state.mvlist = store.state.music.mvlist
        })

        return {state, active, onClickTab}
    }
}
</script>

<style lang='less' scoped>
.outer{
    .list{
        width: 100%;   
        :deep(.header-info){
            span {
                font-size: 0.4rem;
                color: #fff;
            }
            p {
                font-size: 0.3rem;
                color: #eee;
            }
        }
        :deep(.info){
            color: #fff;
        }
        :deep(.else){
            color: #fff;
        }
    }
}

</style>