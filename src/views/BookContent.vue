<template>
	<div class="bookBorder">
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item :to="{path:'/list',query: {name: bookName}}">{{bookName}}</el-breadcrumb-item>
			<el-breadcrumb-item>{{bookTitle}}</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="loadingMask" v-show="showLoading">
			<vue-loading type="bars" color="#409EFF" :size="{ width: '50px', height: '50px' }"></vue-loading>
		</div>
		<div class="bookName">{{bookName}}</div>
		<div class="toNext">
			<router-link :to="'/book/'+(parseInt(this.$route.params.id)-1)">上一章</router-link>
			<router-link :to="'/book/'+(parseInt(this.$route.params.id)+1)">下一章</router-link>
		</div>
		<div class="bookTitle">{{bookTitle}}</div>
		<div v-html="bookContent" class="bookContent"></div>
		<div class="toNext">
			<router-link :to="'/book/'+(parseInt(this.$route.params.id)-1)">上一章</router-link>
			<router-link :to="'/book/'+(parseInt(this.$route.params.id)+1)">下一章</router-link>
		</div>
	</div>
</template>

<script>
	import vueLoading from 'vue-loading-template'
	export default {
		name: 'bookBorder',
		data() {
			return {
				bookName: '',
				bookTitle: '',
				bookContent: '',
				showLoading: true,
				chapter:20000,
			}
		},
		mounted: function() {
			this.$nextTick(function() {
				this.init();
			});

		},
		watch: {
			'$route': ['init']
		},
		methods: {
			init() {
				document.body.scrollTop = 0;
				document.documentElement.scrollTop = 0;
				this.showLoading = true;
				this.$http.get(this.$host+'/selectBook', {
					params: {
						bookLink: this.$route.params.id
					}
				}).then((res, err) => {
					if(!res.data.length){
						this.$router.push('/home');
						this.$notify.error({
							title: '错误',
							message: '最后一章啦，再翻也木有了。'
						});
						this.showLoading = false;
						return false;
					}
					console.log(res)
					this.bookName = res.data[0].bookName;
					this.bookTitle = res.data[0].title;
					this.bookContent = res.data[0].content;
					this.chapter = res.data.length;
					this.showLoading = false;
				})

			},
		},
		components: {
			vueLoading
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
