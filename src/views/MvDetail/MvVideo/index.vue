<template>
  <div class="outer">
    <div class="goback">
        <van-icon name="arrow-left" @click="$router.go(-1)" />
    </div>
    <div class="video">
        <video :src="mvdata?.url" controls style="object-fit: fill" ></video>
    </div>
    <div class="info">
        <p class="name">薛之谦</p>
        <div>
            <ul>
                <li>
                    <van-icon name="like-o" />
                    <p>{{mvInfo.likedCount/2}}</p>
                </li>
                <li>
                    <van-icon name="good-job-o" />
                     <p>{{mvInfo.likedCount}}</p>
                </li>
                <li>
                    <van-icon name="chat-o" />
                     <p>{{mvInfo.commentCount}}</p>
                </li>
                <li>
                    <van-icon name="share-o" />
                    <p>{{mvInfo.shareCount}}</p>
                </li>
            </ul>
        </div>
    </div>
  </div>
</template>

<script>
import {onMounted, reactive} from 'vue'
import { useStore } from 'vuex'
export default {
    name:'MvVideo',
    props:['mvdata','mvInfo'],
    setup() {
        const store = useStore()
        const state = reactive({
            // mvurl:''
        })
      /*   onMounted(()=>{
            state.mvurl = store.state.home.mvUrl
            console.log(state.mvurl);
        }) */

        return {state}
    }
}
</script>

<style lang='less' scoped>
    .outer{
        width: 100%;
        // height: 4.5rem;
        box-sizing: border-box;
        // border: 1px solid red;
        .goback{
            // float: left;
            position: absolute;
            top: .3rem;
            left: .2rem;
            z-index: 10;
            .van-icon{
                color: #fff;
                font-size: .4rem;
            }
        }
        .video{
            width: 100%;
            height: 4.2rem;
            // border: 1px solid red;
            video{
                width: 100%;
                height: 100%;
            }
        }
        .info{
            width: 100%;
            // height: 1rem;
            // border: 2px solid red;
            background: #eee;
            .name{
                font-size: .4rem;
                margin: .3rem;
                font-weight: 800;
            }
            div{
                ul{
                    display: flex;
                    justify-content: space-between;
                    text-align: center;
                    padding: 0 .4rem;
                    .van-icon{
                        font-size: .6rem;
                        margin: .1rem;
                    }
                    p{
                        font-size: .3rem;
                    }
                }
            }
        }
    }
</style>