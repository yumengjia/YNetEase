<template>
    <div class="full">
        <div class="mv">
            <video ref="video" :src='mvurl'></video>
        </div>
        <div class="icon">
            <van-icon name="pause-circle-o" v-show="curMv.isPlay"  @click="changeState(video)"/>
            <van-icon name="play-circle-o" v-show="!curMv.isPlay"  @click="changeState(video)"/>
        </div>
         <div class="content">
            <p class="p1">@{{mv.data.creator?.nickname}}</p>
            <p class="p2">{{mv.data.description}}</p>
        </div> 
    </div>
</template>

<script>
import {ref} from 'vue'
export default {
    name:'FallScreenMv',
    props:['mv','mvurl','curMv','changeState'],
    setup() {
        const video = ref()


        return {video}
    }
}
</script>

<style lang='less' scoped>
.full{
    width: 100%;
    height: 100%;
    background-color: #000;
    box-sizing: border-box;
    .mv, .icon{
        margin: auto;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
    }
    .mv{
        width: 100%;
        // height: 3rem;
        // border: 1px solid #fff;
       
        video{
            width: 95%;
            // height: 100%;
            border-radius: .2rem;
            margin: auto;
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            
        }
    }
    .icon{
      width: .6rem;
      height: .6rem;
      .van-icon{
        color: #eee;
        font-size: .6rem;
      }
    } 
    .content{
          width: 90%;
          height: 100px;
          position: absolute;
          bottom: 15%;
          left: 25px;
          color: #eee;
          .p1{
            font-size: .4rem;
          }
          .p2{
            margin-top: .2rem;
            font-size: .28rem;
            overflow: hidden;
          }
      }
}
</style>