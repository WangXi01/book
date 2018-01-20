<template>
	<div id="home">
		<el-row :gutter="20">
			<div v-for="item in bookName">
				<router-link :to="{path:'/list',query: {name: item.title,type: item.type}}">
					<el-col :xs="12" :sm="6" :md="4">
						<div class="grid-content bg-purple">
							<div class="item">
								<div class="itemLogo">
									<img :src="item.link" alt="" width="100%"/>
								</div>
								<dl class="itemMaininfo">
									<dt class="info">
										<span>{{item.title}}</span>
										<div>{{item.author}}</div>
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
		watch:{
			$route:['init']
		},
		methods: {
			init(){
				if(this.$route.query.res){
					this.bookName = this.$store.state.name;
					return false;
				}
				this.bookName = []
				this.$http.get(this.$host+'/homebook').then((res, err) => {
					console.log(res)
					this.bookName = res.data;
				}).catch(err => {
					this.$notify.error({
						title: '错误',
						message: '抱歉，无法找到此小说'
					});
				})
			}
		},
	}
</script>
