import req from '@/api/request'

//歌单列表
export const reqMusicList = (id) => req(`/playlist/detail?id=${id}`)

//获取歌单所有歌曲
export const reqPlayList = (id) => req(`/playlist/track/all?id=${id}&offset=0`)

//获取音乐url
export const reqMusicUrl = (id) => req(`/song/url?id=${id}`)

//获取歌词
export const reqSongContent = (id) => req(`/lyric?id=${id}`)

//获取歌曲详情
export const reqSongDetail = (ids) => req(`/song/detail/?ids=${ids}`)

//搜索
export const reqSearch = (keyWord) => req(`/search?keywords=${keyWord}`)

//推荐MV
export const reqPerMv = () => req('/personalized/mv')

//推荐电台
export const reqPerDj = () => req('/personalized/djprogram')

//电台MP3资源
export const reqDjMp3 = (id) => req(`/song/url?id=${id}`)

//网页出品MV
export const reqRemdMv = () => req('/video/timeline/all')

//获取推荐视频/video/timeline/recommend
export const reqRemdVideo = (offset=0) => req(`/video/timeline/recommend?offset=${offset}`)

//获取mv地址
export const reqMvUrl = (id) => req(`/mv/url?id=${id}`)

//mv评论
export const reqMvComment = (id) => req(`/comment/mv?id=${id}`)

//最新mv
export const reqNewMv = () => req('/mv/first?limit=10')

//全部MV
export const reqAllMv = () => req('/mv/all')

//mvp点赞评论转发数据
export const reqMvInfo = (id) => req(`/mv/detail/info?mvid=${id}`)

//热门歌单分类
export const reqHotPlayList = () => req('/playlist/hot')

//获取歌单所有歌曲
export const reqAllPlayList = (id) => req(`/playlist/track/all?id=${id}`)

//全部mv
export const reqAllMvList = (area) => req(`/mv/all?area=${area}`)

