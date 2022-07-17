<template>
  <div class="iconList">
    <div class="iconItem">
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-nuomici"></use>
        </svg>
        <span>每日推荐</span>
    </div>
    <div class="iconItem">
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-hebaodan"></use>
        </svg>
         <span>私人FM</span>
    </div>
    <div class="iconItem">
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-paofu"></use>
        </svg>
         <span>歌单</span>
    </div>
    <div class="iconItem">
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-shanbei"></use>
        </svg>
         <span>排行榜</span>
    </div>
  </div>
</template>

<script>
export default {
    name:'IconList'
    
}
</script>

<style lang='less' scoped>
    .iconList{
        width: 100%;
        height: 1.5rem;
        margin-top: .2rem;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .iconItem{
            width: 25%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            .icon{
                height: 0.6rem;
                width: 0.6rem;
                padding: .1rem;
            }
            span{
                font-size: .28rem;
            }
        }
    }
</style>