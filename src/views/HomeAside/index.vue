<template>
  <div class="home-aside">
    <div class="contain">
      <div class="contain-banner">
        <div class="contain-banner-avatar" @click="toUserDetail">
          <img :src="state.userInfo?.avatarUrl" alt="">
        </div> 
        <span>{{state.userInfo?.nickname}}</span>
      </div>
      <div class="contain-tools">
        <div class="block-one">
          <span v-for="(item, index) in state.icons" :key="index">
            <van-icon
              :name="item.icon"
              @click="handleRoute(item.path)"
            />
            {{ item.text }}
          </span>
        </div>
        <hr />
        <div class="items van-icon van-icon-bulb-o">听歌识曲</div>
        <hr />
        <div
          v-for="(item, index) in state.items"
          :key="index"
          class="items van-icon"
          :class="item.icon"
        >
          {{ item.text }}
        </div>
      </div> 
    </div>
    <div class="footer">
      <span class="fa fa-sign-out" @click="logout">退出登录</span>
      <van-icon name="arrow" />
    </div> 
  </div>
</template>

<script>
import { onMounted, reactive } from "vue";
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import {reqLogout} from '@/api/user'
export default {
  name: "HomeAside",
  setup() {
    const store = useStore()
    const router = useRouter()
    const state = reactive({
      icons: [
        {
          icon: "envelop-o",
          text: "我的消息",
          path: "/layouts/usernews",      
        },
        {
          icon: "friends-o",
          text: "我的好友",
          path: "/layouts/userfriend",         
        },
        {
          icon: "wap-home-o",
          text: "个人主页",
          path: "/layouts/userdetail",
        },
        {
          icon: "shop-o",
          text: "个性装扮",
          path: "/layouts",
        },
      ],
      items: [
        {
          icon: "van-icon-orders-o",
          text: "我的订单",
          path: "",
        },
        {
          icon: "van-icon-underway-o",
          text: "定时停止播放",
          path: "",
        },
        {
          icon: "van-icon-scan",
          text: "扫一扫",
          path: "",
        },
      ],
      userInfo:{}
    });

    const logout = async() => {
        const result = await reqLogout()
        if(result.code===200){
            console.log('退出成功');
            location.reload()
        }
        localStorage.removeItem('userId')
        localStorage.removeItem('userInfo')
        localStorage.removeItem('token')
        state.userInfo = {}

    }
    const handleRoute = (path) => {
      let id = state.userInfo.userId
      router.push({
        path,
        query:{id}
      })
    }

    onMounted(()=>{
        // console.log(store.state.user.userInfo);
        state.userInfo = store.state.user.userInfo
    })

    return { state, logout, handleRoute };
  },
};
</script>

<style lang="less" scoped>
.home-aside {
  height: 100%;
  width: 100%;
  display: grid;
/*   grid-template-columns: 1fr;
  grid-template-rows: 1fr 50px; */
  background: rgba(0, 0, 0, 0.4);
  .contain {
    position: relative;
    .contain-banner {
      display: flex;
      align-items: center;
      margin: 0 20px;
      margin-top: 36px;
      height: 12%;
      .contain-banner-avatar {
        width: 1.2rem;
        height: 1.2rem;
        margin-bottom: .4rem;
        margin-left: 20px;
        border-radius: 50%;
        background: #fff;
        overflow: hidden;
        img{
            width: 100%;
            height: 100%;
            border-radius: 50%;
        }
      }
      span {
        font-size: 16px;
        font-weight: 800;
        margin-left: 16px;
        color: #fff;
      }
    }
    .contain-tools {
      width: 100%;
      height: 85%;
    //   margin-top: .5rem;
      border-top-left-radius: 14px;
      border-top-right-radius: 14px;
      background: #fff;
      box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.1);
      .block-one {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        width: 100%;
        span {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          font-size: 10px;
          padding: 10px 0;
          margin-top: 10px;
          i::before {
            margin-bottom: 4px;
            font-size: 26px;
            color: crimson;
          }
        }
      }
      hr {
        margin: 8px 20px;
        border: none;
        height: 1px;
        background: #e6e6e6;
        transform: scaleY(0.5);
      }
      .items {
        display: flex;
        align-items: center;
        padding: 10px 16px;
        font-size: 14px;
        color: #373737;
        &:active {
          background: rgba(0, 0, 0, 0.2);
        }
        &::before {
          font-size: 22px;
          margin-right: 8px;
        }
      }
    }
  }
  .footer {
    position: absolute;
    right: .4rem;
    bottom: .4rem;
    span {
      align-self: center;
      justify-self: center;
      font-size: 0.36rem;
    }
  }
}
</style>
