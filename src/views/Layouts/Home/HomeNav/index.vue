<template>
  <div class="topNav">
    <div>
      <van-icon name="wap-nav" size="0.4rem" />
    </div>
    <div class="item">
      <ul>
        <li @click="goUserInfo">我的</li>
        <li>发现</li>
        <li>云村</li>
        <li>视频</li>
      </ul>
    </div>
    <div class="search">
      <van-icon name="search" @click="goSearch" />
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    const goSearch = () => {
      router.push({
        path: "search",
      });
    };
    const goUserInfo = () => {
      router.push({
        path: "/userinfo",
      });
    };

    return { goSearch, goUserInfo };
  },
};
</script>

<style lang="less" scoped>
.topNav {
  display: flex;
  justify-content: space-around;
  height: 50px;
  align-items: center;

  .item {
    width: 60%;
    ul {
      display: flex;
      justify-content: space-around;
    }
  }
  .search {
    .van-icon {
      font-size: 0.5rem;
    }
  }
}
</style>
