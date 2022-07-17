<template>
  <div class="list">
    <div class="topnav">
        <div class="left">
            <van-icon name="play-circle-o" />
            <span>播放全部</span>
            <i>(共{{songslist.songs?.length || songslist.length}}首)</i>
        </div>
        <div v-show="subscribedCount" class="right">
            <van-icon name="plus" />
            <span>收藏({{subscribedCount}})</span>
        </div>
    </div>
    <div class="item">
        <MusicItem :songsList='songslist'/>
    </div>
  </div>
</template>

<script>
import MusicItem from '@/components/MusicItem'
export default {
    name:'List',
    props:['songslist','subscribedCount'],
    components:{MusicItem},
   
}
</script>

<style lang='less' scoped>
    .list{
        box-sizing: border-box;
        width: 100%;
        background-color: #fff;
        border-top-left-radius: .4rem ;
        border-top-right-radius: .4rem ;

        .topnav{
            // width: 100%;
            height: 1rem;
            // border: 1px solid #000;
            padding: 0 .2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .left{
               .van-icon{
                font-size: .4rem;
                margin-right: .1rem;
                color: #000;
               }
               i{
                font-size: .24rem;
                color: #bbb;
               } 
            }
            .right{
                width: 2rem;
                height: .8rem;
                border-radius: .4rem;
                background-color: red;
                text-align: center;
                line-height: .8rem;
                color: #fff;
                font-size: .24rem;
            }
        }
        
    }
</style>