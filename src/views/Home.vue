<template>
	<div id="home">
		<div class="hello">欢迎来到书城</div>
		<el-row :gutter="20">
			<div v-for="item in bookName">
				<router-link :to="{path:'/list',query: {name: item.title}}">
					<el-col :xs="12" :sm="6" :md="4">
						<div class="grid-content bg-purple">
							<div class="item">
								<div class="itemLogo">
									<img :src="item.link" alt="" width="100%"/>
								</div>
								<dl class="itemMaininfo">
									<dt class="info">
										<span>{{item.title}}</span>
										<span style="margin-left: 10px;">{{item.author}}</span>
									</dt>
									<dd class="intro">
										<p>
											{{item.intro}}
										</p>
									</dd>
								</dl>
							</div>

						</div>
					</el-col>
				</router-link>
			</div>
		</el-row>
	</div>
</template>

<script>
	export default {
		name: 'home',
		data() {
			return {
				bookName: [],
			}
		},
		mounted(){
			this.$nextTick(function(){
				this.init()
			})
		},
		methods: {
			init(){
				this.$http.get(this.$host+'/homebook').then((res, err) => {
					this.bookName = res.data;
				}).catch(err => {
					this.$notify.error({
						title: '错误',
						message: '抱歉，无法找到此小说'
					});
				})
			}
		}
	}
</script>

<style scoped>
#home{width: 85%;margin: 0 auto;}
#home .hello{margin: 40px 0;font-size: 20px;font-weight: bold;}
.item{
	background-color: #EEEEEE;
	padding: 20px;
	transition: all 0.5s;
	color: #000;
	height: 340px;
	margin: 10px 0;
}
@media only screen and (max-width: 767px) {
	.item{padding: 15px;}
}
.item:hover{background-color: #ccc;}
.item:hover .itemLogo{transform: scale(1.05);}
.item:hover .info{margin-top: -5px;}
.item .info{font-weight: bold;color: #555;font-size: 14px;transition: all 0.5s;}
.item .itemLogo{width: 100%;text-align: center;transition: all 0.7s;}
.item .itemLogo img{margin-bottom: 5px;}
.item .intro{text-align: left;margin: 0;}
</style>