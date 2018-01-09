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
									<img src="../assets/zetianji.jpg" alt="" width="100%"/>
								</div>
								<dl class="itemMaininfo">
									<dt class="info">
										<span>{{item.title}}</span>
										<span style="margin-left: 10px;">作者：猫腻</span>
									</dt>
									<dd class="intro">
										<p>
											太始元年，有神石自太空飞来，分散落在人间，其中落在东土大陆的神石，上面镌刻着奇怪的图腾，人因观其图腾而悟道，后立国教。数千年后，十四岁的少年孤儿陈长生，为治病改命离开自己的师父，带着一纸婚约来到神都，从而开启了一个逆天强者的崛起征程。
										</p>
										<p>各位书友要是觉得《择天记》还不错的话请不要忘记向您QQ群和微博里的朋友推荐哦！</p>
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
				bookName: [{
						title: '择天记'
					},
//					{
//						title: '剑来'
//					},
				],
			}
		},
		methods: {

		}
	}
</script>

<style scoped>
#home .hello{margin: 40px 0;font-size: 20px;font-weight: bold;}
.item{
	background-color: #EEEEEE;
	padding: 20px;
	transition: all 0.5s;
	color: #000;
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