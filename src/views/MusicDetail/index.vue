<template>
  <div class="detail">
    <div class="backimg">
        <img :src="song.al.picUrl" alt="">
    </div>
    <div class="top-nav">
        <p>{{song.al.name}}</p>
        <span>{{song.ar[0].name}}<van-icon name="arrow" /></span>  
    </div>
    <div class="content" v-show="!state.isLyrisShow">
        <div class="circle-out">
            <div class="circle-in" @click="changeLyrShow">
                <img :src="song.al.picUrl" alt="" :class="{img_active:isPlay,img_pause:!isPlay}">
            </div>
        </div>
        <div class="tips">
            <van-icon name="like-o" />
            <van-icon name="down" />
            <van-icon name="chat-o" />
            <van-icon name="share-o" />
            <van-icon name="more-o" />
        </div>
    </div>
    <div class="lyris" ref="lyris" v-show="state.isLyrisShow">
        <ul @click="changeLyrShow">
            <li v-for="(item,index) in state.content" 
            :key="index" 
            :class="{active:(state.currentTime*1000>=item.time && state.currentTime*1000<item.pre)}"
            >
            {{item.lrc}}
            </li>
        </ul>
    </div>
    <div class="bottom">
        <div class="rangbox">
            <input type="range" class="range" min="0" :max='state.duration' v-model="state.currentTime" step="0.05">
        </div>
        <div class="bottom-icon">
            <van-icon name="replay" />
            <van-icon name="arrow-left" @click="changeCurrent(-1)"/>
            <van-icon name="play-circle-o" v-if="!isPlay" @click="playMusic" style="fontSize:45px"/>
            <van-icon name="pause-circle-o" v-if="isPlay" @click="playMusic" style="fontSize:45px"/>
            <van-icon name="arrow" @click="changeCurrent(1)"/>
            <van-icon name="ellipsis" />
        </div>
        
    </div>
  </div>
</template>

<script>
import { computed, reactive, watch, ref, onMounted,} from 'vue'
import {useStore} from 'vuex'
export default {
    name:'MusicDetail',
    props:['song','isPlay','playMusic','songDuration'],
    setup(props){
        const lyris = ref(null)
        const store = useStore()
        const state = reactive({
            isLyrisShow:null,
            songContent:{},
            content:[],
            currentTime:null,
            duration:null
        })
        //当前歌曲歌词
        state.songContent = store.state.music.songContent
        state.currentTime = store.state.music.currentTime
        state.isLyrisShow = store.state.music.isLyrisShow
   
        

        //歌词提取
        const getContent = () => {
            let arr = []
            if(state.songContent.lyric){
                arr = state.songContent.lyric.split(/[(\r\n)\r\n]+/)
                arr = arr.map((item,i)=>{
                    let min, sec, mill, lrc, time
                    if(item.slice(10,11)===']'){
                        min = item.slice(1,3)
                        sec = item.slice(4,6)
                        mill = item.slice(7,10)
                        lrc = item.slice(11,item.length)
                        time = parseInt(min)*60*1000 + parseInt(sec)*1000 + parseInt(mill)
                    }else{
                        min = item.slice(1,3)
                        sec = item.slice(4,6)
                        mill = item.slice(7,9)
                        lrc = item.slice(10,item.length)
                        time = parseInt(min)*60*1000 + parseInt(sec)*1000 + parseInt(mill)
                    }
                    return {min, sec, mill, lrc, time}
                })
                arr.forEach((item,i) => {
                    if(i== arr.length-1 || isNaN(arr[i+1].time)){
                        item.pre = 100000
                    }else{
                        item.pre = arr[i+1].time
                    }
                    
                });
            }
            return arr
        }
        //格式化后的歌词
        state.content = getContent()

        const currentSong = computed(()=>{
            return store.state.music.currentMusic
        })
        watch(currentSong, ()=>{
            // props.songDuration()
            state.duration = store.state.music.duration
            // console.log('当前歌曲改变',state.duration);
            //  console.log('state.duration',state.duration);
        })
        
        const songContent = computed(()=>{
            return store.state.music.songContent
        })
        watch(songContent, function(newValue){
            state.songContent = newValue
            state.content = getContent()
        }) 

        //歌词滚动效果
        const cur = computed(()=>{
            return store.state.music.currentTime
        })
        watch(cur, function(newValue){
            state.currentTime = newValue
            // console.log('###',state.currentTime);
            let li = document.querySelector('li.active')
            if(li && li.offsetTop>350){
                lyris.value.scrollTop = li.offsetTop - 350
            }
            if(newValue === state.duration){
                changeCurrent(1)
            }
        })

        const isShow = computed(()=>{
            return store.state.music.isLyrisShow
        })
        watch(isShow, function(newValue){
            state.isLyrisShow = store.state.music.isLyrisShow
        })

        //切换上下首歌曲
        const changeCurrent = (i) => {
            lyris.value.scrollTop = 0
            let index = store.state.music.index
            index = parseInt(index)+parseInt(i)
            if(index<0){
                return
            }
            if(index>store.state.music.songs.length-1){
                index = 0
            }
            //当前歌曲索引
            store.commit('music/CURRENTINDEX',index)
            //当前歌曲
            store.commit('music/CHANGECURRENTSONG', store.state.music.songs[index])
            //当前歌曲MP3资源
            store.dispatch('music/getSongMp3',store.state.music.currentMusic.id)
            
        }

        //改变当前显示的详情页
        const changeLyrShow = () => {
            if(state.isLyrisShow == true){
                store.commit('music/ISLYRISSHOW',false)
            }else{
                 store.commit('music/ISLYRISSHOW',true)
            }
            state.isLyrisShow = store.state.music.isLyrisShow
        }
        
        onMounted(()=>{
            state.duration = store.state.music.duration
            // console.log('state.duration',state.duration);
        })
 
        return { state, lyris, changeCurrent,changeLyrShow}
      
    }
}
</script>

<style lang='less' scoped>
.detail{
    height: 100%;
    position: relative;
    .backimg{
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: -1;
        img{
            width: 100%;
            height: 100%;
            filter: blur(90px);
        }
    }
    .top-nav{
        // width: 100%;
        height: 1rem;
        // border: 1px solid #ccc;
        margin-left: 1rem;
        margin-right: .4rem;
        padding: .2rem;
        text-align: center;
        p{
            margin-top: .2rem;
        }
        span{
            font-size: .24rem;
        }
    }
    .content{
        // border: 1px solid #ccc;
        height: 9.8rem;
        .circle-out{
            width: 4.5rem;
            height: 4.5rem;
            border-radius: 50%;
            background-color: #000;
            margin: 2.1rem auto;
            display: flex;
            justify-content: center;
            align-items: center;
            .circle-in{
                width: 3rem;
                height: 3rem;
                border-radius: 50%;
                background-color: #fff;
                img{
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    animation: rotate_ar 10s linear infinite;
                }
                .img_active{
                    animation-play-state: running;
                }
                .img_pause{
                    animation-play-state: paused;
                }
                @keyframes  rotate_ar{
                    0%{
                        transform: rotateZ(0deg);
                    }
                    100%{
                        transform: rotateZ(360deg);
                    }
                }
            }
        }
        .tips{
            width: 100%;
            height: 1.2rem;
            display: flex;
            justify-content: space-around;
            align-items: center;
            font-size: .4rem;
            color: #ddd;
        }

    }
    .lyris{
        // border: 1px solid #ccc;
        height: 9.5rem; 
        overflow: scroll;
        ul{
            text-align: center;
            line-height: .8rem;
            li{
                font-size: .28rem;
                color: rgb(190, 181, 181);
            }
            .active{
                color: #fff;
                font-size: .36rem;
            }
        }
    }
    .bottom{
        width: 100%;
        // border-top: 1px solid #ccc;
        position: absolute;
        bottom: 0;
        .rangbox{
            width: 100%;
            height: 0.06rem;
            .range{
                width: 100%;
                height: 100%;
            }
        }
        .bottom-icon{
            font-size: .4rem;
            height: 2rem;
            color: #ddd;
            display: flex;
            justify-content: space-around;
            align-items: center;
        }
    }
}

</style>