<template>
  <MsgItem v-for="(item,index) in msg" :key="index" :msg='item'/>
</template>

<script>
import MsgItem from '@/components/MsgItem'
export default {
    name:'Users',
    props:['msg'],
    components:{MsgItem}

}
</script>

<style lang='less' scoped>

</style>