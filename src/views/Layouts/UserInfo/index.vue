<template>
  <div class="outer">
    <div class="back">
      <img :src="state.userInfo?.backgroundUrl" alt="">
    </div>
    <div class="info">
      <div class="user">
        <div class="img">
          <img :src="state.userInfo?.avatarUrl" alt="">
        </div>
        <p>{{state.userInfo?.nickname}}</p>
      
        <div class="userinfo">
          <div class="userinfo-item">
            <b>{{state.userInfo?.playlistCount}}</b>
            <span>歌单</span>
          </div>
          <div class="userinfo-item">
            <b>{{state.userInfo?.sDJPCount}}</b>
            <span>收藏歌单</span>
          </div>
          <div class="userinfo-item" >
            <b>{{state.userInfo?.follows}}</b>
            <span>粉丝</span>
          </div>
        </div>
        <div class="sign">
          <p v-if="state.userInfo.signature">{{state.userInfo.signature}}</p>
          <p v-else>If you shed tears when you miss the sun,you also miss the stars.</p> 
        </div>
        
      </div>
      <div class="item1">
        <p>{{state.userInfo?.nickname}}的音乐</p>
        <div class="like" @click="handleLikeClick(0)">
          <div class="img">
            <img :src="state.playlist[0]?.al.picUrl" alt="">
          </div>
          <div class="content">
            <p>我喜欢的音乐</p>
            <span>共{{state.playlist?.length}}首</span>
          </div>
          <div class="icon">
            <van-icon name="like" />
          </div>
        </div>
        <div class="like" @click="handleLikeClick(1)">
          <div class="img">
            <img :src="state.currentSongs[0]?.al.picUrl" alt="">
          </div>
          <div class="content">
            <p>最近播放</p>
            <span>共{{state.currentSongs?.length}}首</span>
          </div>
         <!--  <div class="icon">
            <van-icon name="more-o" />
          </div> -->
        </div>
      </div>
        
    </div>
  </div>
</template>

<script>
import { onMounted, reactive } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import {reqMusicUrl, reqSongDetail} from '@/api/music/index.js'
export default {
    name:'UserInfo',
    setup(){
      const store = useStore()
      const router = useRouter()
      const state = reactive({
        userId:JSON.parse(localStorage.getItem('userId')),
        userInfo: store.state.user.userInfo,
        playlist:[],
        songids:[],
        currentSongs:[]
      })

     /*  const goback =() => {
        router.push({
          path:'home'
        })
      } */

      const handleLikeClick = async (i) => {
        // await store.dispatch('music/getUserSong',state.songids)
        router.push({
          path:'itemmusic',
          query:{type:i}
        })
       
      }

      onMounted(async ()=>{
        await store.dispatch('user/getUserInfo',state.userId)
        // await store.dispatch('user/getAccount')
        // await store.dispatch('user/getSubcount')
        // await store.dispatch('user/getUserPlayList',state.userId)
        state.userInfo = store.state.user.userInfo
        // console.log(state.userInfo);
        await store.dispatch('user/getUserPlaylist',state.userId)
        state.songids = store.state.user.songids
        await store.dispatch('music/getUserSong',state.songids)
        state.playlist = store.state.music.songs
        // console.log(state.playlist);
        await store.dispatch('music/getCurrentPlay')
        state.currentSongs = store.state.music.songs

      })

      return {state,handleLikeClick}

    }
}
</script>

<style lang='less' scoped>
  .outer{
    width: 100%;
    position: relative;
    .back{
      width: 100%;
      height: 50%;
      position: relative;
    /*   .nav{
        position: absolute;
        width: 100%;
        height: .8rem;
        // background-color: #fff;
        .van-icon{
          font-size: .4rem;
          line-height: .8rem;
          margin-left: .2rem;
          color: #fff;
        }
      } */
      img{
        width: 100%;
        height: 100%;
        border-bottom-right-radius: .4rem;
        border-bottom-left-radius: .4rem;
      }
    }
    .info{
      width: 100%;
      // height: 40%;
      .user{
        width: 94%;
        height: 30%;
        background-color: #fff;
        border-radius: .4rem;
        position: absolute;
        margin: auto;
        left: 0;
        right: 0;
        top: 4.5rem;
        text-align: center;
        .img{
          width: 1.4rem;
          height: 1.4rem;
          position: absolute;
          top: -1rem;
          left: 0;
          right: 0;
          margin: auto;
          img{
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }
        p{
          margin-top: .5rem;
        }
        .userinfo {
          margin: 0 26px;
          margin-top: 40px;
          height: 22%;
          display: flex;
          justify-content: space-evenly;
          .userinfo-item {
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            align-items: center;

            b {
              font-size: .8rem;
              color: #12c770;
            }
            span {
              font-weight: 600;
              letter-spacing: 2px;
              color: rgb(94, 90, 90);
              font-size: 0.4rem;
            }
          }
        }
      }
      .sign{
        width: 95%;
        height: 10%;
        // border: 1px solid #000;
        margin: 35px auto;
        p{
          margin: 0 auto;
          font-size: 16px;
          line-height: .4rem;
        }
      }
      .item1{
        width: 95%;
        height: 5.8rem;
        // background-color: #fff;
        border-radius: .4rem;
        position: absolute;
        margin: auto;
        left: 0;
        right: 0;
        
      }
      .item1{
         top: 9.2rem;
         p{
          font-size: .32rem;
          padding: .2rem;
         }
         .like{
          width: 95%;
          height: 1.5rem;
          border: 1px dashed #ccc;
          margin: .2rem auto;
          border-radius: .2rem;
          display: flex;
          align-items: center;
          .img{
            width: 1.2rem;
            height: 1.2rem;
            border-radius: .4rem;
            margin: 0 .2rem;
            img{
              width: 100%;
              height: 100%;
              border-radius: .2rem;
              box-shadow: 0px 0px 5px 5px rgba(0, 0, 0, .2);
            }
          }
          .content{
            width: 4rem;
            height: 1rem;
            span{
              font-size: 12px;
              color: #bbb;
              margin-left: .2rem
            }
          }
          .icon{
            width: 1rem;
            height: 1rem;
            text-align: center;
            .van-icon{
              font-size: .4rem;
              line-height: 1rem;
              color: rgb(206, 54, 54);
            }
          }
        }
      }
    }
  }
</style>