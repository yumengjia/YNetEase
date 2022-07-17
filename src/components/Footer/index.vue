<template>
  <div class="footer">
    <div class="left"  @click="showPopup">
      <div class="img">
        <img :src="state.currentMusic?.al.picUrl" alt="" />
      </div>
      <div class="content">
        <p>{{state.currentMusic?.al.name}}</p>
        <span>横滑切换上下首哦</span>
      </div>
    </div>
    <div class="right">
      <van-icon name="play-circle-o" v-if="!state.isPlay"  @click="playMusic"/>
      <van-icon name="pause-circle-o" v-else @click="playMusic"/>
      <van-icon name="sign" />
    </div>
    <!-- 音乐播放 -->
    <audio autoplay ref="audio" @canplay="getduration" :src="state.musicUrl"></audio>
  

  </div>
    <!-- 歌曲详情弹出 -->
    <van-popup 
      v-model:show="show"
      closeable
      close-icon="arrow-left"
      close-on-click-overlay
      close-icon-position="top-left"
      position="bottom" 
      @open='open'
      :style="{ height: '100%', width: '100%'}" 
    >
      <MusicDetail :song='state.currentMusic' :isPlay="state.isPlay" :playMusic="playMusic" :songDuration='songDuration'/>
    </van-popup>

</template>

<script>
import { reactive, computed, watch, ref, onMounted} from 'vue';
import { useStore } from 'vuex';
import MusicDetail from '@/views/MusicDetail'
export default {
  name: "Footer",
  components:{MusicDetail},
  setup(){
    const show = ref(false);
    const state = reactive({
      currentMusic:{},
      musicUrl:'',
      isPlay:null,
      interVal:0,
      
    })
    const audio = ref(null)
    const store = useStore()
    state.isPlay = store.state.music.currentState.isPlay
    state.currentMusic = JSON.parse(localStorage.getItem('CurSong'))
    // state.currentMusic = store.state.music.currentMusic
    state.musicUrl = JSON.parse(localStorage.getItem('songMp3'))
    
    //获取歌曲总时长【这里总是存在问题】
    const songDuration =() =>{
       /*   setTimeout(()=>{
          let dur = audio.value.duration;
          store.commit('music/UPDATEDURATION',dur)
        },100) */
        setTimeout(()=>{
          let dur = getduration()
          store.commit('music/UPDATEDURATION',dur)
        },500)
    }
    const getduration = () => {
      return audio.value.duration
    }
    

    //更新当前时间
    const updateTime = () => {
      state.interVal = setInterval(()=>{
        store.commit('music/UPDATECURRENTTIME',audio.value.currentTime)
      },500)
    }

    const curMp3 = computed(()=>{
      return store.state.music.mp3
    })

    watch(curMp3, function(newValue){
      songDuration()
    })


    //根据当前歌曲获取歌词
    const current = computed(()=>{
      // console.log(store.state.music.currentMusic);
      return store.state.music.currentMusic
    })

    watch(current,async function(newValue){
      state.currentMusic = newValue
      //获取当前歌曲的歌词文件
      await store.dispatch('music/getSongContent',state.currentMusic.id)
      // console.log(store.state.music.songContent);

      //当前歌曲的MP3资源
      await store.dispatch('music/getSongMp3',store.state.music.currentMusic.id)
      state.musicUrl = store.state.music.mp3
       //播放音乐
      state.isPlay = true
      // console.log(audio.value.duration);
    })

    //是否播放歌曲
    async function playMusic(){
      state.isPlay = !state.isPlay
      if(state.isPlay){
        // console.log('bofang');
        audio.value.play()
        updateTime()
      }else{
        // console.log('zanting');
        audio.value.pause()
        clearInterval(state.interVal)
      }
    }

    const showPopup = () => {
      show.value = true
    }

    const open = () =>{
      store.commit('music/ISLYRISSHOW',false)
    }

    onMounted(()=>{
      songDuration()
      updateTime()
      if(!state.isPlay){
        audio.value.pause()
      }
    })

    
  

    return {show, state, playMusic, audio, showPopup, open, songDuration, getduration}
  }
 
};
</script>

<style  lang="less" scoped>
.footer {
  width: 100%;
  height: 1.2rem;
  padding: 0.1rem;
  box-sizing: border-box;
  border-top: 1px solid #ccc;
  position: fixed;
  bottom: 0;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .left {
    display: flex;
    align-items: center;
    width: 6rem;
    .img{
      width: .8rem;
      height: .8rem;
      // border: 1px solid #ccc;
      margin-right: 10px;
      border-radius: 50%;
      img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .content{
      p{
        font-size: .3rem;
      }
      span{
        font-size: .24rem;
        color: #bbb;
      }
    }
  }
  .right{
    display: flex;
    // width: 1.4rem;
    .van-icon{
      font-size: .45rem;
      color: #aaa;
      margin: 0 3px;
    }
  }
}
.van-popup{
    :deep(.van-popup__close-icon){
      border: 1px solid #ccc;
      color:#fff;
    }
  }

</style>
