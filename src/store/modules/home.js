import {
    reqBanner,
    reqMusicList
} from "@/api/home";
import {
    reqPerMv,
    reqPerDj,
    reqRemdMv,
    reqMvUrl,
    reqRemdVideo,
    reqNewMv,
    reqAllMv,
    reqMvComment,
    reqMvInfo
} from '@/api/music'
export default {
    namespaced: true,
    state: {
        banner: [],
        musicList: [],
        mvList: [],
        djList: [],
        recomMv: [],
        mvurl: '',
        recomVideo: [],
        newMv: [],
        allMv:[],
        mvdata:{},
        comments:[],
        mvInfo:{}
     
    },
    mutations: {
        GETBANNER(state, banner) {
            state.banner = banner
        },
        GETMUSICLIST(state, musicList) {
            state.musicList = musicList
        },
        GETMVLIST(state, mvList) {
            state.mvList = mvList
        },
        GETDJLIST(state, djList) {
            state.djList = djList
        },
        GETREMDMV(state, recomMv) {
            state.recomMv = recomMv
        },
        GETMVURL(state, mvurl) {
            state.mvurl = mvurl
        },
        GETREMDVIDEO(state, recomVideo) {
            state.recomVideo = recomVideo
        },
        GETNEWMV(state, newMv) {
            state.newMv = newMv
        },
        GETALLMV(state, allMv) {
            state.allMv = allMv
        },
        GETMVURLL(state,mvdata){
            state.mvdata = mvdata
        },
        GETMVCOMMENT(state,comments){
            state.comments = comments
        },
        GETMVINFO(state, mvInfo){
            state.mvInfo = mvInfo
        }
    

    },
    actions: {
        async getBanner({
            commit
        }) {
            const result = await reqBanner()
            // console.log(result);
            if (result.code === 200) {
                commit('GETBANNER', result.banners)
            }
        },
        async getMusicList({
            commit
        }) {
            const result = await reqMusicList()
            // console.log('11',result);
            if (result.code == 200) {
                commit('GETMUSICLIST', result.result)
            }
        },
        async getMvList({
            commit
        }) {
            const result = await reqPerMv()
            // console.log(result);
            if (result.code === 200) {
                commit('GETMVLIST', result.result)
            }
        },
        async getDjList({
            commit
        }) {
            const result = await reqPerDj()
            // console.log(result);
            if (result.code === 200) {
                commit('GETDJLIST', result.result)
            }
        },
        async getRemdMv({
            commit
        }) {
            const result = await reqRemdMv()
            // console.log(result);
            if (result.code === 200) {
                result.data.forEach(item => {
                    item.isPlay = false
                });
                commit('GETREMDMV', result.data)
            }
        },
        async getMvUrl({
            commit
        }, id) {
            const result = await reqMvUrl(id)
            // console.log(result);
            if (result.code === 200) {
                commit('GETMVURL', result.data.url)
            }
        },
        async getRemdVideo({
            commit
        },offset) {
            const result = await reqRemdVideo(offset)
            // console.log(result);
            if (result.code === 200) {
                result.datas.forEach(item => {
                    item.isPlay = false
                })
                commit('GETREMDVIDEO', result.datas)
            }
        },
        async getNewMv({
            commit
        }) {
            const result = await reqNewMv()
            // console.log(result);
            if (result.code === 200) {
                commit('GETNEWMV', result.data)
            }

        },
        async getAllMv({
            commit
        }) {
            const result = await reqAllMv()
            // console.log(result);
            if (result.code === 200) {
                commit('GETALLMV', result.data)
            }

        },
        async getMvUrl({commit},id){
            const result = await reqMvUrl(id)
            // console.log(result);
            if(result.code===200){
                commit('GETMVURLL',result.data)
            }
        },
        async getMvCommet({commit},id){
            const result = await reqMvComment(id)
            // console.log(result);
            if(result.code===200){
                commit('GETMVCOMMENT',result.comments)
            }
        },
        async getMvInfo({commit},id){
            const result = await reqMvInfo(id)
            console.log(result);
            if(result.code===200){
                commit('GETMVINFO',result)
            }
            
        }
    },
    getters: {}
}