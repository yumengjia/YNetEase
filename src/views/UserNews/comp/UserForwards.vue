<template>
<div v-if="msgs.length">
   <MsgItem v-for="(item,index) in msgs" :key="index" :msg='item'/>
</div>
<div class="else" v-else>
  暂时还没有收到@嗷
</div>
  
</template>

<script>
import MsgItem from '@/components/MsgItem'
export default {
    name:'UserForwards',
    props:['msgs'],
    components:{MsgItem}

}
</script>

<style lang='less' scoped>
.else{
  width: 100%;
  height: 5rem;
  text-align: center;
  line-height: 5rem;
}
</style>