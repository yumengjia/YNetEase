<template>
  <div v-if="playlist" class="top">
    <div class="bgimg">
        <img :src="playlist.coverImgUrl || songslist[0]?.al.picUrl" alt="">
    </div>
    <div class="nav">
        <div class="left">
            <van-icon name="arrow-left" size="24" @click="$router.go(-1)"/>
            <span>歌单</span>
        </div>
        <div class="right">
            <van-icon name="search" size="26" @click="goSearch"/>
            <svg class="icon" aria-hidden="true" style="fontSize:24px">
                <use xlink:href="#icon-baomihua"></use>
            </svg>
        </div>
    </div>
    <div class="content">
        <div class="con-left">
            <img :src="playlist.coverImgUrl || songslist[0]?.al.picUrl " alt="">
        </div>
        <div v-if="playlist.creator" class="con-right">
            <span>{{playlist.name}}</span>
            <div class="avator">
                <img :src="playlist.creator.avatarUrl" alt="">
                <span>{{playlist.creator.nickname}}</span>
                <van-icon name="arrow" />
            </div>
            <div class="tips">
                 <i>持续更新，会把自认为好听的曲子分享给大家</i>
                <van-icon name="arrow" />
            </div>
        </div>
        <div v-else class="con-right">
            <span v-if="type==='0'">我喜欢的音乐</span>
            <span v-if="type==='1'">最近播放</span>
        </div>
    </div>
    <div class="select">
        <div>
            <van-icon name="chat-o" />
            <span>{{playlist.commentCount || 0}}</span>
        </div>
        <div>
            <van-icon name="share-o" />
            <span>{{playlist.shareCount || 0}}</span>
        </div>
        <div>
            <van-icon name="down" />
            <span>下载</span>
        </div>
        <div>
            <van-icon name="passed" />
            <span>多选</span>
        </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
export default {
    name:'Top',
    props:['playlist','songslist','type'],
    setup(props){
        // console.log(props);
        const router = useRouter();
        const goSearch = () => {
            router.push({
                path: "search",
            });
        };

        return {goSearch}

    },
}
</script>

<style lang='less' scoped>
    .top{
        width: 100%;
        height: 5.8rem;
        position: relative;
        background: none;
        z-index: 1;
        // border: 1px solid #000;
        .bgimg{
            width: 100%;
            height: 5.8rem;
            position: fixed;
            z-index: -1;
            filter: blur(.6rem);
            img{
                width: 100%;
                height: 100%;
            }
        }
        .nav{
            padding:.2rem;
            display: flex;
            justify-content: space-between;
            font-size: .35rem;
            .left,.right{
                width: 1.4rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                color: #eee;
            }
        }
        .content{
            // width: 100%;
            height: 3.5rem;
            margin: 0 .2rem;
            // border: 1px solid #000;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .con-left{
                width: 2.8rem;
                height: 2.8rem;
                img{
                    width: 100%;
                    height: 100%;
                    border-radius: .4rem; 
                }
            }
            .con-right{
                width: 4rem;
                span{
                    color:#eee;
                }
                .avator{
                    display: flex;
                    align-items: center;
                    color: #eee;
                    margin: .2rem 0;
                    img{
                        width: .6rem;
                        height: .6rem;
                        border-radius: 50%;
                        margin-right: .1rem;
                    }
                }
                .tips{
                    display: flex;
                    align-items: center;
                    font-size: .24rem;
                    color:#eee;
                  
                }
            }
        }
        .select{
            // width: 100%;
            height: 1.2rem;
            margin: 0 .2rem;
            display: flex;
            justify-content: space-around;
            align-items: center;
            div{
                display: flex;
                flex-direction: column;
                align-items: center;
                .van-icon{
                    font-size: .5rem;
                    margin: .2rem;
                    color: #eee;
                }
                span{
                    font-size: .30rem;
                    color: #eee;
                }
            }
        }
    }
</style>