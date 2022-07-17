<template>
 <!--  <div class="topNav">
    <van-tabs v-model:active="active" swipeable shrink>
      <template #nav-left>
        <div class="left">
            <van-icon name="wap-nav" size="0.4rem" @click="showPop"/>
        </div>
      </template>
      <template #nav-right>
        <div class="right">
           <van-icon name="search" @click="goSearch"/>
        </div>
      </template>
      <van-tab v-for="(item,index) in state.list" :key="index">
        <template #title>
          <div class="item">
             <li>{{item}}</li>
          </div>
        </template>
        <template #default>
          <div>
            <UserInfo v-if="active===0"/>
            <Home v-if="active===1"/>
            <Village v-if="active===2"/>
            <SkySquare v-if="active===3"/>
          </div>
        </template>
      </van-tab>
    </van-tabs>
  </div> -->
  <div class="outer">
      <div class="topNav">
        <div>
          <van-icon name="wap-nav" size="0.4rem" @click="showPop"/>
        </div>
        <div class="item">
          <ul @click="changeActive">
            <li :class="{'active':state.active===0}">我的</li>
            <li :class="{'active':state.active===1}">发现</li>
            <li :class="{'active':state.active===2}">云村</li>
            <li :class="{'active':state.active===3}">视频</li>
          </ul>
        </div>
        <div class="search">
          <van-icon name="search" @click="goSearch" />
        </div>
    </div>
    <div class="content">
      <UserInfo v-if="state.active===0"/>
      <Home v-if="state.active===1"/>
      <Village v-if="state.active===2"/>
      <SkySquare v-if="state.active===3"/>
    </div>
  </div>

  <van-popup  v-model:show="show" position="left" :style="{ width: '80%',height:'100%'}" >
    <HomeAside/>
  </van-popup>
  <van-popup v-model:show="showSelect"  position="top" :style="{ height: '15%' }">
    <div class="notice">
      <p>您还未登录，请登录</p>
      <van-button plain size="small" type="primary" @click="goLogin">登录</van-button>
      <van-button plain size="small" type="primary" @click="cancel">取消</van-button>
    </div>
  </van-popup>
</template>

<script>
import {ref, reactive, watch} from "vue";
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'
import { Toast } from 'vant';
import Home from "@/views/Layouts/Home";
import UserInfo from "@/views/Layouts/UserInfo";
import Village from "@/views/Layouts/Village";
import SkySquare from "@/views/Layouts/SkySquare";
import HomeAside from '@/views/HomeAside'
export default {
  name: "Layouts",
  components: { Home, UserInfo, Village, SkySquare, HomeAside },
  setup() {
    const store = useStore()
    const router = useRouter()
    let active = ref(2)
    let show = ref(false)
    let showSelect = ref(false)
    const state = reactive({
      active:1,
      list: [ "我的","发现", "云村", "视频"],
      recomMv:[],
      show:false,
      // showSelect:false
    });
    const goSearch = () => {
      router.push({
        path: "search",
      });
    };
    const showPop = () => {
      let token = JSON.parse(localStorage.getItem('token')) || ''
      if(token){
        show.value = true
      }else{
        Toast({
          message: '还未登录哟，请点击我的登录！',
          position: 'top',
        });
      }
      
    }

    const changeActive = (event) => {
      // console.log(event.target.innerHTML);
      switch (event.target.innerHTML) {
        case '我的':
            state.active = 0
          break;
         case '发现':
            state.active = 1
          break;
         case '云村':
            state.active = 2
          break;
         case '视频':
            state.active = 3
          break;
        default:
          break;
      }
    };

    
    watch(()=>state.active, function(newValue){
      let token = JSON.parse(localStorage.getItem('token')) || ''
      if(newValue===0){
        // console.log('token',token);
        if(!token){
          state.active = 1
          showSelect.value = true
        }
      }
      if(newValue===2){
        console.log('hhh');
         if(!token){
          Toast({
            message: '还未登录哟，请点击我的登录！',
            position: 'top',
          });
          state.active = 1 
        }
      }

    })
    const goLogin = () => {
      router.push({
        path:'login'
      })
    }
    const cancel = () => {
      showSelect.value = false
    }

    return {state, active, show, showSelect, goSearch, showPop, changeActive, goLogin, cancel}
  },
};
</script>

<style lang='less' scoped>
.outer{
  width: 100%;
  height: 100%;
/*   display: flex;
  flex-direction: column;
  align-items: stretch; */
  .topNav {
    height: 8%;
    width: 100%;
    background: #eee;
    // background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: fixed;
    top: 0;
    z-index: 1;
    .item {
      width: 60%;
      ul {
        display: flex;
        justify-content: space-around;
    
        .active{
          border-bottom: 1px solid red;
        }
      }
    }
    .search {
      .van-icon {
        font-size: 0.5rem;
      }
    }
  }
  .content{
    height: 92%;
    margin-top: 1rem;
    // box-sizing: border-box;
  }
}

.notice{
  text-align: center;
  p{
    font-size: 16px;
    margin: .2rem .4rem;
  }
  .van-button{
    margin: 0 .2rem;
  }
}
 
  /* .topNav{
    position: relative;
    :deep(.van-tabs__nav--line.van-tabs__nav--shrink){
      display: flex;
      justify-content: space-between;
      background-color: #eee;
      .van-tab--shrink {
            width: 15px;
            padding: 0;
        }
    }
    .left,.right{
      margin: 0 .2rem;
      line-height: 1rem;
      .van-icon {
        font-size: 0.5rem;
      }
    }
    .item{
      width: 1rem;
      li{
        text-align: center;
      }
    }
   
  } */

</style>
