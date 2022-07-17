<template>
  <div class="MyMvList">
        <van-swipe :loop="false" :width="220" :height="240" :show-indicators="false">
            <van-swipe-item v-for="item in list" :key="item.id">
                <router-link :to="{path:'/mvdetail',query:{id:item.id}}">
                    <img :src="item.picUrl" alt="">
                    <span class="count">
                        <van-icon name="star-o" />
                        <i>&nbsp;{{item.playCount}}</i>
                    </span>
                    <span class="content">{{item.artistName}}</span>
                </router-link>
            </van-swipe-item>
        </van-swipe>
  </div>
</template>

<script>
// import {onMounted} from 'vue'
export default {
    name:'MyMvList',
    props:['list'],
    setup(props){
        function changeCount(num){
            return parseInt(num/10000) + '万'
        }
        return {changeCount}
    }
}
</script>

<style lang='less' scoped>
    .MyMvList{
        // width: 100%;
        // height: 3.7rem;
        .van-swipe{
            // height: 100%;
            .van-swipe-item{
                box-sizing: border-box;
                padding: 0 0.15rem;
                position: relative;
                img{
                    width: 100%;
                    // height: 2rem;
                    height: 100%;
                    border-radius: .3rem;
                }
                .count{
                    position: absolute;
                    top: 0.1rem;
                    right: 0.2rem;
                    i{
                        font-size: .32rem;
                        color: #fff;
                    }
                }
                .content{
                    font-size: .48rem;
                    position: absolute;
                    bottom: .2rem;
                    left: .2rem;
                    color: #fff;
                    
                }
            }
            
        }
    }

</style>