<template>
  <div class="mvvideo">
    <MvVideo :mvdata='state.mvdata' :mvInfo='state.mvInfo' />
  </div>
  <div class="commentlist">
    <CommentList :comments='state.comments'/>
  </div>
   
</template>

<script>
import MvVideo from './MvVideo'
import CommentList from './CommentList'
import { onMounted, reactive} from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
export default {
    name:'MvDetail',
    props:['curMv'],
    components:{ CommentList, MvVideo},
    setup(props) {
        const route = useRoute()
        const store = useStore()
        const state = reactive({
            mvdata:{},
            comments:[],
            mvInfo:{}
        })

        onMounted(async ()=>{
            console.log(route);
            await store.dispatch('home/getMvUrl',route.query.id)
            await store.dispatch('home/getMvCommet',route.query.id)
            await store.dispatch('home/getMvInfo', route.query.id)
            state.mvdata = store.state.home.mvdata
            state.comments = store.state.home.comments
            state.mvInfo = store.state.home.mvInfo
            // console.log(state.mvdata);
            // console.log(state.comments);
            
        })

        return {state, route}
    }
    
}
</script>

<style lang="less" scoped>
.mvvideo{
    width: 100%;
    height: 5rem;
}

</style>