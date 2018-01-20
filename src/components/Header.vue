<template>
	<div id="header">
		<div class="header-top">
			<i class="el-icon-menu home-menu hidePc" @click="openMenu"></i>
			<div class="header-search">
				<input type="text" placeholder="找书太麻烦，试试搜索吧！" v-on:input="beginSearch(searchText.text)" v-model="searchText.text" @mouseenter="showHistory" />
				<i class="el-icon-close clearSearchText" @click="clearSearchText"></i>
				<i class="el-icon-search" @click="search(searchText.text)"></i>
				<div class="header-search-history" >
					<div v-for="text in showText">
						<span @click="searchHistory(text)">{{text}}</span>
						<i class="el-icon-close hidePc" @click="clearHistory(text)"></i>
					</div>
					
				</div>
			</div>
			<div class="header-login-btn hideMb">
				<input class="btn btn-success" type="button" name="" id="" value="登录" @click="search" />
				<input class="btn btn-success" type="button" name="" id="" value="注册" @click="search" />
			</div>
		</div>
		<div class="header-nav hideMb">
			<div>
				<router-link to="/home">首页</router-link>
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
		<div class="loadingMask" v-show="showLoading" style="background: #fff;opacity: 0.6;" @click="closeMenu">
			
		</div>
		<el-row class="nav-mb hidePc" :class="{'showMenu':showMenu}">
			<el-col :span="24">
				<el-menu class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
					<div class="header-login-btn" style="padding: 20px 0;border-bottom: 1px solid #ccc;margin: 0 20px;">
						<input class="btn btn-success" type="button" name="" id="" value="登录" @click="search" />
						<input class="btn btn-success" type="button" name="" id="" value="注册" @click="search" />
					</div>
					<div class="menuTop">
						<router-link to="/home">首页</router-link>
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
				</el-menu>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	export default {
		name: 'homeHead',
		data(){
			return{
				showLoading:false,
				showMenu:false,
				searchText:{
					text:'',
				},
				historyText:[],
				showText:'',
			}
		},
		watch:{
			'$route': ['closeMenu']
		},
		methods: {
			search(text) {
				if(localStorage.getItem('historyText')){
					this.historyText = localStorage.getItem('historyText').split(',');
				}
				if(this.searchText.text ==''){
					this.$message.error('抱歉，请输入书籍名称...')
					return false;
				}else{
					this.historyText.push(this.searchText.text)
				}
				window.localStorage.setItem('historyText', this.historyText);
				this.showText = localStorage.getItem('historyText').split(',');
				this.$http.get(this.$host+'/searchBook').then((res,err)=>{
					var arr = [];
					res.data.forEach(function(index){
						if(index.title.indexOf(text)!=-1){
							arr.push(index)
						}
					})
					if(arr.length==0){
						this.$message.error('抱歉，您搜索的书籍不存在...')
					}else{
						this.$store.commit('increment', arr)
						this.$router.push({path:'/home',query:{res:Math.floor(Math.random()*35000000)}})
					}
				})
			},
			beginSearch(text){
				this.$http.get(this.$host+'/searchBook').then((res,err)=>{
					var arr = [];
					res.data.forEach(function(index){
						if(index.title.indexOf(text)!=-1){
							arr.push(index)
						}
					})
					if(arr.length!=0){
						this.$store.commit('increment', arr)
						this.$router.push({path:'/home',query:{res:Math.floor(Math.random()*35000000)}})
					}
				})
			},
			showHistory(){
				if(!localStorage.getItem('historyText')){
					this.showText = ['暂无历史记录...']
				}else{
					this.showText = localStorage.getItem('historyText').split(',');
				}
			},
			clearHistory(text){
				var historyText = localStorage.getItem('historyText').split(','); // 数组化后的值
				historyText.splice(historyText.indexOf(text),1)
				localStorage.setItem('historyText',historyText);
				this.showText = localStorage.getItem('historyText').split(',');
			},
			clearSearchText(){
				this.searchText.text = '';
			},
			searchHistory(text){
				this.searchText.text = text;
				this.$http.get(this.$host+'/searchBook').then((res,err)=>{
					var arr = [];
					res.data.forEach(function(index){
						if(index.title.indexOf(text)!=-1){
							arr.push(index)
						}
					})
					if(arr.length!=0){
						this.$store.commit('increment', arr)
						this.$router.push({path:'/home',query:{res:Math.floor(Math.random()*35000000)}})
					}else{
						this.$message.error('抱歉，您搜索的书籍不存在...')
					}
				})
			},
			openMenu(){
				this.showLoading=true;
				this.showMenu=true;
			},
			closeMenu(){
				this.showLoading=false;
				this.showMenu=false;
			}
		}
	}
</script>

