<template>
  <li class="privatemsg-item">
    <div class="cover">
      <img :src="msg.fromUser?.avatarUrl|| msg?.avatarUrl || msg?.picUrl" />
    </div>
    <div class="info">
      <span>{{msg.fromUser?.nickname || msg?.nickname || msg?.name}}</span>
      <p class="text-truncate">{{news?.msg || msg.signature}}</p>
    </div>
    <div class="else">
      <span v-show="msg.time || msg.lastMsgTime">{{time}}</span>
      <div class="else-tips" v-if="msg?.newMsgCount>0">
        {{msg?.newMsgCount}}
      </div>
    </div>
  </li>
</template>

<script>
import { computed } from 'vue';
export default {
  name: "MsgItem",
  props:['msg'],
  setup(props){
    const news = computed(()=>{
       let msg = props.msg?.lastMsg
    //    console.log(msg);
       if(msg){
        msg = JSON.parse(msg);
       }
    //    console.log(JSON.parse(msg));
    //    msg = JSON.parse(msg)
        return msg
    })
    const time = computed(()=>{
        let date = new Date(props.msg?.lastMsgTime || props.msg?.time)
        return `${date.getMonth() + 1}月${date.getDate()}日`
    })

    return {news,time}
  }

  

  
};
</script>
<style lang="less" scoped>
.privatemsg-item {
  position: relative;
  display: grid;
  grid-template-columns: 48px 1fr 58px;
  width: 100%;
  height: 60px;
  box-sizing: border-box;
  padding: 6px 16px;
  &:active {
    background: rgba(0, 0, 0, 0.1);
  }
  &::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 56px;
    width: calc(100% - 56px);
    height: 1px;
    background: #eee;
    transform: scaleY(0.5);
  }
  .cover {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: #def;
    border-radius: 50%;
    img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }
  }
  .info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-sizing: border-box;
    padding-left: 10px;
    width: 100%;
    height: 100%;
    overflow: hidden;
    span {
      font-size: 14px;
    }
    p {
      font-size: 10px;
      color: #777;
      display: block;
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

    }
  }
  .else {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    span {
      font-size: 8px;
      color: #666;
    }
    .else-tips {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 12px;
      height: 12px;
      background: crimson;
      font-size: 9px;
      color: #fff;
      border-radius: 50%;
      margin-top: 4px;
    }
  }
}
</style>