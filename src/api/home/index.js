import req from '@/api/request'

//轮播图
export const reqBanner = () => req('/banner/type=2')

//发现好歌单
export const reqMusicList =() => req('/personalized?limit=10')