import { reqMusicList, reqPlayList, reqMusicUrl, reqSongContent, reqSearch, reqHotPlayList, reqAllPlayList, reqAllMvList, reqSongDetail } from "@/api/music";
import { reqAccount, reqCurrentPlay } from "@/api/user";
export default {
    namespaced:true,
    state:{
        musicList:{},
        //播放列表
        songs:[],

        //当前歌曲索引
        index:JSON.parse(localStorage.getItem('currentIndex')),
        //当前歌曲
        currentMusic:JSON.parse(localStorage.getItem('CurSong')),
        //当前歌曲MP3资源
        mp3:JSON.parse(localStorage.getItem('songMp3')),
         //当前歌曲歌词
        songContent:JSON.parse(localStorage.getItem('songContent')),

        //当前状态
        currentState:{
            isPlay:false
        },
        //当前时间
        currentTime:0,
        //是否显示歌词
        isLyrisShow:false,
        //歌曲总时长
        duration:0,

        searchList:JSON.parse(sessionStorage.getItem('searchList')) || [],

        tags:[],
        playlist:[],
        mvlist:[]
        
    },
    mutations:{
        GETMUSICLIST(state,musicList){
            state.musicList = musicList
        },
        GETPLAYLIST(state,songs){
            state.songs = songs
        },
        //当前歌曲索引
        CURRENTINDEX(state,index){
            state.index = index
            localStorage.setItem('currentIndex',JSON.stringify(index))
        },
        //当前歌曲
        CHANGECURRENTSONG(state,song){
            state.currentMusic = song
            localStorage.setItem('CurSong',JSON.stringify(song))
        },
        //当前歌曲歌词
        GETSONGCONTENT(state,songContent){
            state.songContent = songContent
            localStorage.setItem('songContent',JSON.stringify(songContent))
        },
        UPDATECURRENTTIME(state,time){
            state.currentTime = time
        },
        GETSONGMP3(state, mp3){
            state.mp3 = mp3
            localStorage.setItem('songMp3',JSON.stringify(mp3))
        },
        ISLYRISSHOW(state,style){
            state.isLyrisShow = style
        },
        //更新歌曲总时长
        UPDATEDURATION(state, duration){
            state.duration = duration
        },
        GETSEARCH(state, songs){
            state.searchList = songs
            sessionStorage.setItem('searchList',JSON.stringify(songs))
        },
        ADDSONG(state,song){
            state.songs.push(song)
        },
        GETHOTPLAYLIST(state,tags){
            state.tags = tags
        },
        GETALLPLAYLIST(state,playlist){
            state.playlist = playlist
        },
        GETALLMVLIST(state,mvlist){
            state.mvlist = mvlist
        }
        
    },
    actions:{
        async getMusicList({commit},id){
            const result = await reqMusicList(id)
            // console.log('111',result);
            if(result.code===200){
                commit('GETMUSICLIST',result)
            }
        },
        async getPlayList({commit},id){
            const result = await reqPlayList(id)
            // console.log(result);
            if(result.code===200){
                commit('GETPLAYLIST',result.songs)
            }
        },
        //获取当前歌曲MP3资源
        async getSongMp3({commit},id){
            const result = await reqMusicUrl(id) 
            if(result.code===200){
                commit('GETSONGMP3',result.data[0].url)
            }
        },
        //获取当前歌曲的歌词文件
        async getSongContent({commit},id){
            const result = await reqSongContent(id)
            // console.log(result.lrc);
            if(result.code===200){
                commit('GETSONGCONTENT',result.lrc)
            }
        },
        //获取搜索结果
        async getSearch({commit}, keyWord){
            const result = await reqSearch(keyWord)
            if(result.code===200){
                // console.log(result);
                commit('GETSEARCH',result.result)
            }
        },
        async getHotPlayList({commit}){
            const result = await reqHotPlayList()
            // console.log(result.tags);
            if(result.code===200){
                commit('GETHOTPLAYLIST',result.tags)
            }
        },
        async getAllPlayList({commit},id){
            const result = await reqAllPlayList(id)
            // console.log(result);
            if(result.code===200){
                commit('GETALLPLAYLIST', result.songs)
            }
        },
        async getAllMvList({commit},area){
            const result = await reqAllMvList(area)
            // console.log(result);
            if(result.code===200){
                commit('GETALLMVLIST',result.data)
            }
        },
        async getUserSong({commit},ids){
            const result = await reqSongDetail(ids)
            // console.log(result);
            if(result.code===200){
                commit('GETPLAYLIST',result.songs)
            }
        },
        async getCurrentPlay({commit}){
            const result = await reqCurrentPlay()
            let list = []
            if(result.code===200){
                result.data.list.forEach(item => {
                    list.push(item.data)
                });
                commit('GETPLAYLIST',list)
                // console.log(list);
            }
        }

    },
    getters:{
        playlist(state){
            return state.musicList.playlist
        },
        privileges(state){
            return state.musicList.privileges
        },
    }
}