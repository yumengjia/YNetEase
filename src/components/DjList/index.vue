<template>
  <div class="MySwiper">
        <van-swipe :loop="false" :width="110" :show-indicators="false">
            <van-swipe-item v-for="item in list" :key="item.id">
                <router-link to="">
                    <img :src="item.picUrl" alt="" @click="handleClick(item.program.id)">
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
import {reqDjMp3} from '@/api/music/index.js'
export default {
    name:'DjList',
    props:['list'],
    setup(props){
        function changeCount(num){
            return parseInt(num/10000) + '万'
        }

        const handleClick = async(id) => {
            console.log(id);
            const result = await reqDjMp3(id)
            console.log(result);
        }
        return {changeCount, handleClick}
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