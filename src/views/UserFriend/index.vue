<template>
  <div class="userfriends">
    <BreakHeader title="我的好友"/>
     <van-tabs v-model:active="active" animated>
      <van-tab v-for="(item,index) in state.list" :title="item" :key="index">
        <Singer :msg='state.singer' v-if="index===0"/>
        <Users :msg='state.follows' v-if="index===1"/>
        <Fans :msg='state.fans' v-if="index===2"/>
       
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { onMounted, reactive, ref} from 'vue'
import {useStore} from 'vuex'
import { useRoute } from 'vue-router'
import Fans from '@/views/UserFriend/comp/Fans'
import Singer from '@/views/UserFriend/comp/Singer'
import Users from '@/views/UserFriend/comp/Users'
import BreakHeader from '@/components/BreakHeader'
export default {
    name:'UserFriend',
    components:{BreakHeader, Fans, Singer, Users},
    setup() {
      const active = ref(0)
      const route = useRoute()
      const store = useStore()
      const state = reactive({
        list:['歌手','用户','粉丝'],
        fans:[],
        follows:[],
        singer:[]
      })

      onMounted(async ()=>{
        let id = route.query.id
        await store.dispatch('user/getSinger')
        await store.dispatch('user/getUserFollow',id)
        await store.dispatch('user/getUserFan',id)
        // await store.dispatch('user/getTopSinger')
        state.fans = store.state.user.fans
        state.follows = store.state.user.follows
        state.singer = store.state.user.singer
        // console.log(store.state.user.fans);

      })

      return {state, active}
    }
}
</script>

<style lang='less' scoped>
.userfriends{
   :deep(.van-tabs__nav--line) {
    background: #eee;
   }
}
</style>