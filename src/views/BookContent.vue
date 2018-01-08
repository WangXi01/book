<template>
	<div class="hello">
		<div class="bookName">{{bookName}}</div>
		<div class="bookTitle">{{bookTitle}}</div>
		<div v-html="book" class="bookContent"></div>
	</div>
</template>

<script>
	export default {
		name: 'HelloWorld',
		data() {
			return {
				bookName: '',
				bookTitle: '',
				book: '',
			}
		},
		mounted: function() {
			this.$nextTick(function() {
				this.init();
			});
		},
		methods: {
			init() {
				this.$http.get('/selectBook',{params: {bookLink: this.$route.params.id}}).then((res, err) => {
					console.log(res)
					this.bookName = res.data[0].bookName;
					this.bookTitle = res.data[0].title;
					this.book = res.data[0].content;
				})
				
			},
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.hello {
		width: 80%;
		margin: 0 auto;
		border: 1px solid #ddd;
		padding: 50px;
		text-align: left;
	}
	
	.bookContent {
		font-size: 20px;
		font-family: "宋体", Arial, Helvetica;
	}
	
	.bookContent p {
		margin-bottom: 1.5em;
		text-indent: 2em;
	}
	
	.bookTitle,
	.bookName {
		font: 25px/35px 黑体;
		padding-top: 10px;
		text-align: center;
	}
	.bookTitle{margin-bottom: 20px;}
</style>