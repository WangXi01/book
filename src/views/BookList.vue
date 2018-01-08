<template>
	<div id="list">
		<!--<div v-html="list"></div>-->
		<dl v-html="listTitle">
			
		</dl>
	</div>
</template>

<script>
	export default{
		name:'book-list',
		data(){
			return {
				listTitle:'',
			}
		},
		mounted: function() {
			this.$nextTick(function() {
				this.init();
			});
		},
		methods:{
			init(){
				this.$http(this.$host+'/static/data/择天记/list.json').then((res,err)=>{
					console.log(res)
					var listTitle = res.data;
					this.listTitle = listTitle;
				})
			},
		}
	}
</script>

<style>
#list{width: 80%;margin: 0 auto;}
dl{width: 100%;}
dl dd{
	width: 29%;
    height: 32px;
    line-height: 32px;
    float: left;
    border-top: 1px solid #eee;
    overflow: hidden;
    white-space: nowrap;
}
dl dt{
    font-size: 14px;
    line-height: 28px;
    text-align: center;
    vertical-align: middle;
    width: 98%;
    margin: auto auto 5px;
    padding: 5px 10px;
}
@media only screen and (max-width: 767px) {
	dl dd{width: 100%;text-align: left; margin: 0;}
}
</style>