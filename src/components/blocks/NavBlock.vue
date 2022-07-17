<template>
<van-config-provider :theme-vars="themeVars">
	<div class="navBlock">
		<div class="title">
			<a>{{ title }}</a>
			<div class='arrow'>
				<span @click="showPop">
					了解所有
					<van-icon name="arrow" />
				</span>
			</div>
			
		</div>
	</div>
	<van-popup 
	v-model:show="show"
	closeable
	close-icon="arrow-left"
	close-icon-position="top-left"
	position="right" 
	:style="{ width: '100%' ,height:'100%'}" 
	>
		<MusicPark :title="title==='推荐MV'?'MV广场':'歌单广场'"/>
	</van-popup>
</van-config-provider>
</template>

<script>
import { ref } from 'vue';
import MusicPark from '@/components/MusicPark'
export default {
	name: 'NavBlock',
	props: ['title'],
	components:{MusicPark},
	setup() {
		const show = ref(false);
		const themeVars = {
			popupBackgroundColor:'rega(0,0,0,0.5)'
		}
		const showPop = () => {
			show.value = true;
		}

		 return { show, showPop,  themeVars};
	}
};
</script>

<style lang="less" scoped>
.navBlock {
	width: 100%;
	.title {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		font-weight: 600;
		padding-bottom: .2rem;
        padding-top: .4rem;
		a{
			font-size: 24px;
		}
		span{
			display: flex;
			align-items: center;
			font-size: 12px;
			color: #aaa;
		}
	}
}

</style>
