<template>
	<div id="list">
		<div class="loadingMask" v-show="showLoading">
			<vue-loading type="bars" color="#409EFF" :size="{ width: '50px', height: '50px' }"></vue-loading>
		</div>
		<transition name="el-zoom-in-center">
			<div class="transition-box" v-show="show">
				<el-breadcrumb separator-class="el-icon-arrow-right">
					<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
					<el-breadcrumb-item>{{this.$route.query.name}}</el-breadcrumb-item>
				</el-breadcrumb>
				<div>{{msg}}</div>
				<div class="title">{{this.$route.query.name}}</div>
				<dl v-for="item in listTitle">
					<dd>
						<router-link :to="'/book/'+item.id">{{item.title}}</router-link>
					</dd>
				</dl>
				<div style="clear:both"></div>
				<div class="pagination">
					<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSize" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="total">
					</el-pagination>
				</div>
			</div>
		</transition>
		<home-footer></home-footer>
	</div>
</template>

<script>
	import HomeFooter from '@/components/Footer'
	import vueLoading from 'vue-loading-template'
	export default {
		name: 'book-list',
		data() {
			return {
				listTitle: [],
				msg: '',
				show: false,
				currentPage: 1,
				total: 400,
				pageSize: [99, 198, 297, 396],
				pageSizeIndex:0,
				initPage: 0,
				showLoading:false,
			}
		},
		mounted: function() {
			this.$nextTick(function() {
				this.init();
			});
		},
		methods: {
			init() {
				this.$http.get(this.$host+'/selectBook', {
					params: {
						bookName: this.$route.query.name,
						initPage: this.initPage,
						pageSize: this.pageSize[this.pageSizeIndex],
					}
				}).then((res, err) => {
					console.log(res,1111)
					var listTitle = res.data;
					this.listTitle = listTitle;
				}).catch(err => {
					this.$notify.error({
						title: '错误',
						message: '抱歉，无法找到此小说'
					});
				})
				this.$http.get(this.$host+'/selectBook', {
					params: {
						bookName: this.$route.query.name
					}
				}).then((res, err) => {
					console.log(res,22222)
					if(!res.data.length){
						this.msg = '抱歉，无法找到此小说'
						this.$notify.error({
							title: '错误',
							message: '抱歉，无法找到此小说'
						});
					}
					this.total = res.data.length;
				}).catch(err => {
					this.msg = '抱歉，无法找到此小说'
					this.$notify.error({
						title: '错误',
						message: '抱歉，无法找到此小说'
					});
				})
				this.show = true;
			},
			handleSizeChange(val) {
				this.pageSizeIndex = parseInt(val/this.pageSize[0])-1;
				this.showLoading = true;
				document.body.scrollTop = 0;
				document.documentElement.scrollTop = 0;
				this.$http.get(this.$host+'/selectBook', {
					params: {
						bookName: this.$route.query.name,
						initPage: 0,
						pageSize: this.pageSize[this.pageSizeIndex],
					}
				}).then((res, err) => {
					console.log(res)
					var listTitle = res.data;
					this.listTitle = listTitle;
					this.showLoading = false;
				}).catch(err => {
					this.$notify.error({
						title: '错误',
						message: '抱歉，无法找到此小说'
					});
					this.showLoading = false;
				})
			},
			handleCurrentChange(val) {
				this.showLoading = true;
				document.body.scrollTop = 0;
				document.documentElement.scrollTop = 0;
				this.$http.get(this.$host+'/selectBook', {
					params: {
						bookName: this.$route.query.name,
						initPage: (val - 1) * this.pageSize[this.pageSizeIndex],
						pageSize: this.pageSize[this.pageSizeIndex],
					}
				}).then((res, err) => {
					console.log(res)
					var listTitle = res.data;
					this.listTitle = listTitle;
					this.showLoading = false;
				}).catch(err => {
					this.$notify.error({
						title: '错误',
						message: '抱歉，无法找到此小说'
					});
					this.showLoading = false;
				})
			}
		},
		components: {
			HomeFooter,
			vueLoading
		}
	}
</script>

<style scoped>
	#list {
		width: 80%;
		margin: 10px auto;
	}
	
	#list dl {
		width: 100%;
	}
	
	#list dl dd {
		width: 29%;
		height: 40px;
		line-height: 40px;
		float: left;
		border-top: 1px solid #eee;
		overflow: hidden;
		white-space: nowrap;
	}
	
	#list dd a {
		color: #000;
		text-decoration: none;
		font-size: 14px;
		transition: all 0.3s;
	}
	
	#list dd:hover a {
		color: #369;
		text-decoration: underline;
		margin-left: 5px;
	}
	
	#list .title {
		font-size: 18px;
		font-weight: bold;
		text-align: center;
		vertical-align: middle;
		width: 98%;
		margin: 30px auto;
		padding: 5px 10px;
	}
	
	.pagination {
		margin: 20px 40px;
		text-align: right;
	}
	
	@media only screen and (max-width: 767px) {
		#list dl dd {
			width: 100%;
			text-align: left;
			margin: 0;
		}
	}
</style>