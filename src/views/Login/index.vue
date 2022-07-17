<template>
<div class="login">
    <div class="nav">
        <van-icon name="arrow-left" @click="goBack"/>
    </div>
    <div class="bac-img">
        <img src="@/assets/images/netease.jpeg" alt="">
    </div>
    <div class="isPass" v-show="state.isPass">
        <van-form @submit="login">
            <van-cell-group inset>
                <van-field
                    v-model="phone"
                    name="phone"
                    label="手机号"
                    placeholder="手机号"
                    :rules="[{ required: true, message: '请填写手机号' }]"
                   
                />
            </van-cell-group>
            <van-cell-group inset>
                <van-field
                    v-model="password"
                    name="password"
                    label="密码"
                    placeholder="密码"
                    :rules="[{ required: true, message: '请填写密码' }]"
                   
                />
            </van-cell-group>
            <div style="margin: 16px">
                <van-button round block type="primary" native-type="submit">
                    登录
                </van-button>
            </div>
        </van-form>
  </div>

  <div class="noPass" v-show="!state.isPass">
    <van-form @submit="loginsms">
        <van-cell-group inset>
            <van-field
                v-model="phone"
                name="phone"
                label="手机号"
                placeholder="手机号"
                :rules="[{ required: true, message: '请填写手机号' }]"
               
            />
        </van-cell-group>
        <van-cell-group inset>
            <van-field
                v-model="sms"
                center
                clearable
                name="captcha"
                label="短信验证码"
                placeholder="请输入短信验证码"
               
            >
                <template #button>
                    <van-button size="small" type="primary" @click="getsms">发送验证码</van-button>
                </template>
            </van-field>
        </van-cell-group>
        <div style="margin: 16px">
            <van-button round block type="primary" native-type="submit">
                登录
            </van-button>
        </div>
    </van-form>
  </div>
    <div class="select">
        <a href="#" @click="state.isPass=true">密码登录</a>
        <a href="#"  @click="state.isPass=false">验证码登录</a>
    </div>
   <!--  <van-number-keyboard
    v-model="state.keyin"
    :show="state.showKeyboard"
    @blur="state.showKeyboard = false"
    /> -->
</div>

</template>

<script>
import {Toast} from 'vant'
import { reactive, ref } from "vue";
import { useStore } from "vuex";
import {useRouter} from 'vue-router'
import api from "@/api/index.js";
export default {
  name: "Login",
  setup() {
    const store = useStore();
    const router = useRouter()
    let phone = ref("");
    const password = ref("")
    const sms = ref("")
    const state = reactive({
        isPass:true,
        showKeyboard:false,
        // keyin:''
        // userId:JSON.parse(localStorage.getItem('userId')),
    })

    const login = async (data) => {
        await store.dispatch("user/userlogin",data)
        if(store.state.user.account.id){
             Toast({
                message: "登录成功",
                position: "top",
            }); 
            router.push({
                path: "layouts",
            })
            console.log(state.userId);
            await store.dispatch('user/getUserInfo',store.state.user.account.id)
            // await store.dispatch('user/getUserPlayList',state.userId) 
        } 
    };

    const getsms = async () => {
        const result = await api.user.reqCaptcha(phone.value)
        if(result.code===200){
            Toast({
                message: "验证码已发送",
                position: "top",
            });
        }
    }

    const goBack = () => {
        router.go(-1)
    }

    const loginsms = async (data) => {
        // console.log(data);
        await store.dispatch('user/userlogin',data)
        if(store.state.user.account.id){
            Toast({
                message: "登录成功",
                position: "top",
            });
             router.replace({
                path: 'userinfo',
            })
        }
    }

/*     const showboard = (type) => {
        console.log(type);
        state.showKeyboard = true
        switch (type) {
            case 0:
               
                break;
        
            default:
                break;
        }
    } */

    return {state, phone, password, sms, login, getsms, loginsms, goBack};
  },
};
</script>

<style lang='less' scoped>
.login{
    width: 100%;
    height: 100%;
    background-color: #fff;
    position: relative;
   /*  display: flex;
    align-items: center; */
   /*  background-image: url("@/assets/images/netease.jpeg");
    background-repeat: no-repeat;
    background-size: 100% 100%; */
    // filter:blur(15px);
    .nav{
        .van-icon{
            font-size: 20px;
            margin: .3rem;
        }
    }
    .bac-img{
        width: 3.8rem;
        height: 3rem;
        margin: 1rem auto;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .isPass, .noPass{
        width: 100%;
        // padding: .4rem 0;
        /* position: absolute;
        bottom: 2rem; */
        margin: 1rem auto;
        .van-cell-group{
            margin: .4rem .2rem;
            // height: 1.1rem;
        }
    }

    .select{
        width: 4rem;
        height: 1rem;
        position: fixed;
        bottom: 0;
        right: 2rem;
        text-align: center;
        line-height: 1rem;
        a{
            padding: 0 .04rem;
            color: black;
            text-decoration: underline;
        }
    }
}

</style>
