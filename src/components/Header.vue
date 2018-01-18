<template>
	<div id="header">
		<div class="header-top">
			<div class="header-search">
				<input type="" name="" value="" placeholder="找书太麻烦，试试搜索吧！"/>
				<i class="el-icon-search" @click="search"></i>
			</div>
			<div class="header-login-btn hideMb">
				<input class="btn btn-success" type="button" name="" id="" value="登录"  @click="search"/>
				<input class="btn btn-success" type="button" name="" id="" value="注册"  @click="search"/>
			</div>
		</div>
		<div class="header-nav hideMb">
			<div>
				<a href="">首页</a>
			</div>
			<div>
				<router-link to="/list/1">玄幻小说</router-link>
			</div>
			<div>
				<router-link to="/list/2">修真小说</router-link>
			</div>
			<div>
				<router-link to="/list/3">都市小说</router-link>
			</div>
			<div>
				<router-link to="/list/4">历史小说</router-link>
			</div>
			<div>
				<router-link to="/list/5">网游小说</router-link>
			</div>
			<div>
				<router-link to="/list/6">科幻小说</router-link>
			</div>
			<div>
				<router-link to="/list/7">言情小说</router-link>
			</div>
			<div>
				<router-link to="/list/8">其他小说</router-link>
			</div>
			<div>
				<router-link to="/list/9">全本小说</router-link>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name:'header',
		methods:{
			search(){
				this.$message.error('不好意思，该功能正在制作中...')
			}
		}
	}
</script>

