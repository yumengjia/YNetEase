<template>
<div class="home">
    <!-- <HomeNav/> -->
    <Banner/>
    <!-- <IconList/> -->
    <MusicList/>
</div>

</template>

<script>

import Banner from '@/views/Layouts/Home/Banner'
import HomeNav from '@/views/Layouts/Home/HomeNav'
import IconList from '@/views/Layouts/Home/IconList'
import MusicList from '@/views/Layouts/Home/MusicList'
export default {
    name:'Home',
    components:{
        HomeNav,Banner,IconList,MusicList
    },
    setup() {
      
    
    }
   

}
</script>

<style lang='less' scoped>
.home{
  width: 100%;
  height: 100%;
}

</style>