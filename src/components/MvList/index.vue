<template>
  <div class="mv-lg-card" ref="contain" v-for="(item,index) in list" :key="index">
    <div class="header">
      <div class="header-info">
        <span ref="singer">{{item.artistName}}</span>
        <p>{{item.briefDesc}}</p>
      </div>
      <span></span>
    </div>
    <div class="info">
      <span ref="sname">{{ item.name }}</span>
    </div>
    <div class="cover" ref="cover" >
      <img
        :src="item.cover"
      />
      <van-icon name="play-circle-o" @click="goMvDetail(item)" />
    </div>
    <div class="else">
      <span>
        <van-icon name="fire" />
        {{item.playCount}}
      </span>
    </div>
  </div>
</template>

<script>
import MvDetail from '@/views/MvDetail'
import {reactive, ref} from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
    name:'MvList',
    props:['list','showMvDetail'],
    components:{MvDetail},
    setup(props) {
      const router = useRouter()
      const store = useStore()
      const state = reactive({
        curMv:{}
      })

      const  goMvDetail = (item) => {
          router.push({
            path:'mvdetail',
            query:{
              id:item.id
            }
          })
      }

      return {state, goMvDetail}
    }
}
</script>

<style lang="less" scoped>
.mv-lg-card {
  box-sizing: border-box;
  margin: 0 16px;
  margin-top: 20px;
  border-top: 1px dashed #aaa;
//   background: #14171b;
  color: #000;
  border-radius: 8px;
  overflow: hidden;
  .header {
    display: grid;
    // grid-template-columns: 86px 1fr 30px;
    grid-template-columns: 1fr 30px;
    grid-auto-rows: 1fr;
    padding: 16px;
    .header-info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      span {
        font-size: 0.4rem;
      }
      p {
        font-size: 0.3rem;
        color: rgba(0, 0, 0, 0.2);
        color: #aaa;
      }
    }
  }
  .info {
    padding: 16px;
    padding-top: 0;
    font-size: 14px;
    // color: rgba(255, 255, 255, 0.8);
  }
  .cover {
    position: relative;
    width: 100%;
    padding-bottom: 50%;
    img {
      position: absolute;
      top: 40%;
      left: 40%;
      width: 20% !important;
      height: 20% !important;
      transform: scale(5);
    }
    i {
      position: absolute;
      top: 50%;
      left: 50%;
      font-size: 40px;
      color: rgba(255, 255, 255, 0.8);
      transform: translate(-50%, -50%);
    }
  }
  .else {
    display: flex;
    justify-content: flex-end;
    padding: 16px;
    span {
      display: flex;
      align-items: center;
      i {
        font-size: 0.4rem;
        color: crimson;
        margin-right: 4px;
      }
      font-size: 0.4rem;
    }
  }
}
</style>
