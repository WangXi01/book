<template>
	<div id="list">
		<div class="loadingMask" v-show="showLoading">
			<vue-loading type="bars" color="#409EFF" :size="{ width: '50px', height: '50px' }"></vue-loading>
		</div>
		<transition name="el-zoom-in-center">
			<div class="transition-box" v-show="show">
				<el-breadcrumb separator-class="el-icon-arrow-right">
					<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
					<el-breadcrumb-item>
						<router-link :to='{path:"/list/"+crumbs,query: {item:crumbs,type:listType}}'>{{this.$route.query.type}}</router-link>
					</el-breadcrumb-item>
					<el-breadcrumb-item>{{this.$route.query.name}}</el-breadcrumb-item>
				</el-breadcrumb>
				<div>{{msg}}</div>
				<div class="title">{{this.$route.query.name}}</div>
				<dl>
					<dd v-for="item in listTitle">
						<router-link :to='{path:"/book/"+item.titleLink,query: {item:crumbs,type:listType}}'>{{item.title}}</router-link>
					</dd>
					<div style="clear:both"></div>
				</dl>
				
				<div class="pagination">
					<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSize" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="total">
					</el-pagination>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
	import vueLoading from 'vue-loading-template'
	export default {
		name: 'book-list',
		data() {
			return {
				listTitle: [],
				crumbs:'',
				listType:'',//面包屑
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
				this.listType = this.$route.query.type;
				this.showLoading = true;
				this.$http.get(this.$host+'/selectBook', {
					params: {
						bookName: this.$route.query.name,
						initPage: this.initPage,
						pageSize: this.pageSize[this.pageSizeIndex],
					}
				}).then((res, err) => {
					this.showLoading = false;
					this.listTitle = res.data;
					this.crumbs = this.$getNum(this.$route.query.type);
				}).catch(err => {
					this.showLoading = false;
					this.$notify.error({
						title: '错误',
						message: '抱歉，无法找到此小说'
					});
				})
				this.$http.get(this.$host+'/selectBook', {
					params: {
						bookName: this.$route.query.name,
					}
				}).then((res, err) => {
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
			vueLoading
		}
	}
</script>
