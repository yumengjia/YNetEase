import req from '@/api/request/index.js'

//获取验证码
export const reqCaptcha = (phone) => req(`/captcha/sent?phone=${phone}`)

//登录
export const reqLoginCap = (data) => req(`/login/cellphone?phone=${data.phone}&captcha=${data.captcha}`)
export const reqLogin = (data) => req(`/login/cellphone?phone=${data.phone}&password=${data.password}`)

//退出登录/logout
export const reqLogout = () => req('/logout')

//获取用户详情
export const reqUserInfo = (id) => req(`/user/detail?uid=${id}`)

//获取账号信息
export const reqAccount = () => req('/user/account')

//获取用户信息，歌单，收藏，mv 
export const reqSubcount = () => req('/user/subcount')

//获取用户歌单
export const reqUserPlayList = (id) => req(`/user/playlist?uid=${id}`)

//获取用户私信
export const reqPriMsg = (id) => req(`/msg/private/history?uid=${id}`)

//通知私信
export const reqMsgPri = () => req('/msg/private')

//通知评论
export const reqMsgCom = (id) => req(`/msg/comments?uid=${id}`)

//通知@我
export const reqMsgForwords = () => req('/msg/forwards')

//通知通知
export const reqMsgNotices = () => req('/msg/notices')

//用户粉丝列表
export const reqUserFan = (id) => req(`/user/followeds?uid=${id}`)

//用户关注的人列表
export const reqUserFollow = (id) =>req(`/user/follows?uid=${id}`)

//用户收藏歌手列表
export const reqSinger = () => req('/artist/sublist')

//热门歌手
export const reqTopSinger = () => req('top/artists')

//获取用户喜欢音乐
export const reqUserPlaylist = (id) => req(`/likelist?uid=${id}`) 

//最近播放
export const reqCurrentPlay = () => req('/record/recent/song')