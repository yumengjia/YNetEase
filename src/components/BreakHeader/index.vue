<template>
  <div class="break-header">
    <span class="van-icon van-icon-arrow-left" @click="$router.go(-1)"></span>
    <p>{{ title }}</p>
    <span></span>
    <slot />
  </div>
</template>

<script>
export default {
  name: "breakheader",
  props:['title']
};
</script>

<style scoped lang="less">
.break-header {
  position: relative;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  z-index: 100;
  span {
    font-size: 15px;
    margin-left: .4rem;
  }
  p {
    margin-left: 10px;
    font-size: 16px;
  }
}
</style>
