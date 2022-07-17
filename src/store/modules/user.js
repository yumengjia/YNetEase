import { reqAccount, reqLogin, reqLoginCap, reqMsgCom, reqMsgForwords, reqMsgNotices, reqMsgPri, reqPriMsg, reqSinger, reqSubcount, reqTopSinger, reqUserFan, reqUserFollow, reqUserInfo, reqUserPlaylist } from "@/api/user/index.js"
export default {
    namespaced:'true',
    state:{
        isLogin:true,
        isFooter:true,
        token:JSON.parse(localStorage.getItem('token')),
        account:{},
        userInfo:JSON.parse(localStorage.getItem('userInfo')),
        msgs:[],
        comments:[],
        forwards:[],
        notices:[],
        fans:[],
        follows:[],
        singer:[],
        songids:[]
    },
    mutations:{
        USERLOGIN(state,token){
            state.token = token
            state.isLogin = true
        },
        USERACCOUNT(state,account){
            state.account = account
        },
        GETUSERINFO(state,userInfo){
            state.userInfo = userInfo
        },
        GETMSGPRI(state, msgs){
            state.msgs = msgs
        },
        GETMSGCOM(state,comments){
            state.comments = comments
        },
        GETMSGFORWORDS(state,forwards){
            state.forwards = forwards
        },
        GETMSGNOTICES(state,notices){
            state.notices = notices
        },
        GETUSERFAN(state,fans){
            state.fans = fans
        },
        GETUSERFOLLOW(state,follows){
            state.follows = follows
        },
        GETSINGER(state,singer){
            state.singer = singer
        },
        GETUSERPLAYLIST(state,songids){
            state.songids = songids
        }
    },
    actions:{
        //登录
        async userlogin({commit},data){
            // console.log(data);
            let result
            if(data.password){
                result = await reqLogin(data)
            }else{
                result = await reqLoginCap(data)
            }
            // console.log(result);
            if(result.code===200){
                localStorage.setItem('token',JSON.stringify(result.token))
                localStorage.setItem('userId',JSON.stringify(result.account.id))
                commit('USERLOGIN',result.token)
                commit('USERACCOUNT',result.account)
            }
        },

        //获取用户详情
        async getUserInfo({commit},id){
            const result = await reqUserInfo(id)
            // console.log(result);
            if(result.code===200){
                localStorage.setItem('userInfo',JSON.stringify(result.profile))
                commit('GETUSERINFO',result.profile)
            }
        },
        async getAccount({commit}){
            const result = await reqAccount()
            // console.log(result);
        },
        async getSubcount({commit}){
            const result = await reqSubcount()
            // console.log(result);
        },
        async getUserPlayList({commit},id){
            const result = await reqUserPlayList(id)
            // console.log(result);
        },
        async getPriMsg({commit}, id){
            const result = await reqPriMsg(id)
            // console.log(result);
        },
        async getMsgPri({commit}){
            const result = await reqMsgPri()
            // console.log(result);
            if(result.code===200){
                commit('GETMSGPRI',result.msgs)
            }
        },
        async getMsgCom({commit}, id){
            const result = await reqMsgCom(id)
            // console.log(result);
            if(result.code===200){
                commit('GETMSGCOM',result.comments)
            }
        },
        async getMsgForwords({commit}){
            const result = await reqMsgForwords()
            // console.log(result);
            if(result.code===200){
                commit('GETMSGFORWORDS',result.forwards)
            }
        },
        async getMsgNotices({commit}){
            const result = await reqMsgNotices()
            // console.log(result);
            if(result.code===200){
                commit('GETMSGNOTICES',result.notices)
            }
        },
        async getUserFan({commit},id){
            const result = await reqUserFan(id)
            // console.log(result.followeds);
            if(result.code===200){
                commit('GETUSERFAN',result.followeds)
            }
        },
        async getUserFollow({commit},id){
            const result = await reqUserFollow(id)
            // console.log(result);
            if(result.code===200){
                commit('GETUSERFOLLOW',result.follow)
            }
        },
        async getSinger({commit}){
            const result = await reqSinger()
            // console.log(result);
            if(result.code===200){
                commit('GETSINGER',result.data)
            }
        },
        async getTopSinger({commit}){
            const result = await reqTopSinger()
            // console.log(result);
            
        },
        async getUserPlaylist({commit},id){
            const result = await reqUserPlaylist(id)
            // console.log(result);
            if(result.code===200){
                commit('GETUSERPLAYLIST',result.ids)
            }
        }
       
    },
    getters:{

    }
}