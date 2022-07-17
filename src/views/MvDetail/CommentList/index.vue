<template>
<div class="comment">
    <p class="title">精彩评论</p>
     <div class="outer" v-for="(item,index) in comments" :key="index">
        <div class="com">
            <div class="left">
                <img :src="item.user.avatarUrl" alt="">
            </div>
            <div class="right">
                <p class="name">{{item.user.nickname}}</p>
                <p class="time">{{item.timeStr}}</p>
                <span>{{item.content}}</span>
            </div>
        </div>
    </div>
</div>
 
</template>

<script>
import {onMounted, reactive} from 'vue'
import { useStore } from 'vuex'
export default {
    name:'CommentList',
    props:['comments'],
    setup() {
        const store = useStore()
        const state = reactive({
            comments:[]
        })
        onMounted(()=>{
            state.comments = store.state.home.comments
        })

        return {state}
    }
}
</script>

<style lang='less' scoped>
.comment{
    margin-top: 2rem;
    .title{
        font-size: .34rem;
        font-weight: 800;
        margin: .3rem;
    }
    .outer{
        width: 100%;
        // height: 5rem;
       
        margin: 10px 0;
       
        .com{
            display: flex;
            padding-right: .2rem;
            .left{
                width: 1.6rem;
                height: 1.6rem;
                // border: 1px solid #ccc;
                position: relative;
                img{
                    width: 60%;
                    height: 60%;
                    // border: 1px solid #ccc;
                    border-radius: 50%;
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    margin: auto;

                }
            }
            .right{
                width: 6rem;
                border-bottom: 1px dashed rgb(82, 82, 82);
                .name{
                    font-size: .28rem;
                    line-height: 18px;
                    margin-top: .1rem;
                }
                .time{
                    font-size: 14px;
                    color: #aaa;
                    margin-bottom: 8px;
                }
                span{
                    font-size: .28rem; 
                
                }
            }
        }
    }
}


</style>