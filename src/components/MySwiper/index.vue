<template>
  <div class="MySwiper">
        <van-swipe :loop="false" :width="110" :show-indicators="false">
            <van-swipe-item v-for="item in list" :key="item.id">
                <router-link :to="{path:'/itemmusic',query:{id:item.id}}">
                    <img :src="item.picUrl" alt="">
                    <span class="count">
                        <van-icon name="star-o" />
                        <i>&nbsp;{{changeCount(item.playCount)}}</i>
                    </span>
                    <span class="content">{{item.name}}</span>
                </router-link>
            </van-swipe-item>
        </van-swipe>
  </div>
</template>

<script>
// import {onMounted} from 'vue'
export default {
    name:'MySwiper',
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
    .MySwiper{
        // width: 100%;
        height: 2.7rem;
        .van-swipe{
            height: 100%;
            .van-swipe-item{
                box-sizing: border-box;
                padding: 0 0.1rem;
                position: relative;
                img{
                    width: 100%;
                    height: 2rem;
                    border-radius: 50%;
                }
                .count{
                    position: absolute;
                    top: 0.1rem;
                    right: 0.2rem;
                    i{
                        font-size: .24rem;
                        color: #fff;
                    }
                }
                .content{
                    font-size: .24rem;
                }
            }
            
        }
    }

</style>