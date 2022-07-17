<template>
    <div v-for="(item,index) in songsList" :key="index"  class="item" @click="changeCurrent(index)">
        <div class="left">
            <div class="index">
                 <p>{{index+1}}</p>
            </div>
            <div class="detail">
                <p>{{item.al.name}}</p>
                <span>{{item.ar[0].name}}</span>
            </div>
        </div>
        <div class="right">
            <van-icon v-show="item.mv"  name="video-o" />
            <van-icon name="ellipsis" />
        </div>
    </div>
</template>

<script>
import { useStore } from 'vuex';
export default {
    name:'MusicItem',
    props:['songsList'],
    setup(props) {
        const store = useStore()

        //更新当前歌曲
        function changeCurrent(index){
            //保存当前歌曲索引
            store.commit('music/CURRENTINDEX',index)
            //当前歌曲
            store.commit('music/CHANGECURRENTSONG',props.songsList[index])

        }

        return {changeCurrent}

    }
}
</script>

<style lang='less' scoped>
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

</style>