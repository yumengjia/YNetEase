<template>
  <div class="usernews">
    <BreakHeader title="我的消息"/>
     <van-tabs v-model:active="active" animated>
      <van-tab v-for="(item,index) in state.list" :title="item" :key="index">
        <UserPrivate :msgs='state.msgs'  v-if="index===0"/>
        <UserComments :msgs='state.comments' v-if="index===1"/>
        <UserForwards :msgs='state.forwards' v-if="index===2"/>
        <UserNotices :msgs='state.notices' v-if="index===3"/>
      </van-tab>
    </van-tabs>
  </div>
  
</template>

<script>
import {onMounted, reactive, ref} from 'vue'
import {useRoute} from 'vue-router'
import { useStore } from 'vuex'
import BreakHeader from '@/components/BreakHeader'
import UserPrivate from '@/views/UserNews/comp/UserPrivate'
import UserComments from '@/views/UserNews/comp/UserComments'
import UserForwards from '@/views/UserNews/comp/UserForwards'
import UserNotices from '@/views/UserNews/comp/UserNotices'
export default {
    name:'UserNews',
    components:{BreakHeader, UserPrivate, UserComments, UserForwards, UserNotices},
    setup() {
      const store = useStore()
      const route = useRoute()
      const active = ref(0)
      const state = reactive({
        msgs:[],
        comments:[],
        forwards:[],
        notices:[],
        list:['私信','评论','@我','通知']
      })
      onMounted(async ()=>{
        console.log(route.query.id);
        let id = route.query.id
        // store.dispatch('user/getPriMsg',id)
        await store.dispatch('user/getMsgPri')
        await store.dispatch('user/getMsgCom', id)
        await store.dispatch('user/getMsgForwords')
        await store.dispatch('user/getMsgNotices')
        state.msgs = store.state.user.msgs
        state.comments = store.state.user.comments
        state.forwards = store.state.user.forwards
        state.notices = store.state.user.notices
        console.log(state.msgs);


      })

      return {state, active}
      
    }
}
</script>

<style lang='less' scoped>
.usernews{
  // height: 13rem;
  :deep(.van-tabs__nav--line) {
    background: #eee;
}
}
</style>