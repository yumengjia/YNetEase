<template>
  <div class="search">
    <div class="nav">
        <van-icon name="arrow-left"  @click="goBack"/>
        <input type="text" placeholder="陈奕迅" @keydown.enter="enterKeyWord" v-model="state.searchKey">
    </div>
    <div class="history">
        <span class="searchspan">历史</span>
        <span class="keyword" v-for="(item,index) in state.keyWordList" :key="index" @click="searchHistory(item)">{{item}}</span>
        <van-icon name="delete-o"  @click="delHistory"/>
    </div>
    <div v-for="(item,index) in state.searchList" :key="index"  class="item">
        <div class="left" @click="changeSong(item)">
            <div class="index">
                 <p>{{index+1}}</p>
            </div>
            <div class="detail">
                <p>{{item.name}}</p>
                <span>{{item.artists[0].name}}</span>
            </div>
        </div>
        <div class="right">
            <van-icon v-show="item.mvid"  name="video-o" />
            <van-icon name="ellipsis" />
        </div>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { useStore } from 'vuex'
import {useRouter} from 'vue-router'
import {reqSongDetail} from '@/api/music/index.js'
export default {
    name:'Search',
    setup(){
        const store = useStore()
        const router = useRouter()
        const state = reactive({
            keyWordList:JSON.parse(sessionStorage.getItem('keyWordList')) || [],
            searchKey:'',
            searchList:store.state.music.searchList.songs
        })

        const goBack = () => {
            router.go(-1)
        }

        const enterKeyWord = async () => {
            if(state.searchKey===''){
                return
            }
            state.keyWordList.unshift(state.searchKey)
            //去重
            state.keyWordList = [...new Set(state.keyWordList)]
            if(state.keyWordList.length>8){
                state.keyWordList.splice(state.keyWordList.length-1,1)
            }
            sessionStorage.setItem('keyWordList',JSON.stringify(state.keyWordList))
            
            await store.dispatch('music/getSearch',state.searchKey)
            state.searchList = store.state.music.searchList.songs
            console.log(state.searchList);
            
            state.searchKey = ''
        }

        const delHistory = () => {
            sessionStorage.removeItem('keyWordList')
            state.keyWordList = []
        }

        const searchHistory = async (keyWord) => {
            await store.dispatch('music/getSearch',keyWord)
            state.searchList = store.state.music.searchList.songs
            // console.log(state.searchList);
        }
        const changeSong =async (song) => {
            // console.log(song.id);
            const result = await reqSongDetail(song.id)
            // console.log(result.songs[0].al.picUrl);
            song.al = song.album
            song.al.picUrl = result.songs[0].al.picUrl
            song.al.name = song.name
            song.ar = song.artists
            //添加当前歌曲
            store.commit('music/ADDSONG',song)
            //播放当前歌曲
            let index = store.state.music.songs.length-1
            store.commit('music/CURRENTINDEX',index)
            //当前歌曲
            store.commit('music/CHANGECURRENTSONG',store.state.music.songs[index])
        }

        return {state, enterKeyWord, delHistory, searchHistory, changeSong, goBack}
    }
}
</script>
<style lang='less' scoped>
    .search{
        // background-color: #fff;
        .nav{
            // width: 100%;
            height: 1rem;
            padding: 0 .2rem;
            display: flex;
            align-items: center;
            input{
                margin-left: .4rem;
                border: none;
                border-bottom: 1px solid #999;
                width: 90%;
                padding: .1rem;
                background-color: #eee;
            }
        }
        .history{
            // width: 100%;
            padding: .2rem;
            position: relative;
            
            .searchspan{
                font-size: .32rem;
                font-weight: 700;
            }
            .keyword{
                padding: .1rem;
                background-color: rgb(164, 140, 140);
                border-radius: .4rem;
                margin: .1rem;
                font-size: .28rem;
                display: inline-block;
            }
            .van-icon{
                font-size: .4rem;
                position: absolute;
                right: .2rem;
            }
        }
         .item{
        // width: 100%;
        // height: 1.2rem;
        // border: 1px solid #000;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: .2rem;
        .left{
            display: flex;
            align-items: center;
            .index{
                margin: 0 .2rem;
            }
            .detail{  
                p{
                    font-size: .32rem;
                    line-height: .4rem;
                }
                span{
                    font-size: .24rem;
                    color: #aaa;
                    line-height: .4rem;
                }
            }
        }
        .right{
            display: flex;
            .van-icon{
                font-size: .45rem;
                margin: 0 .1rem;
            }
        }
    }
     
    }
</style>