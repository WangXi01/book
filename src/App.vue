<template>
  <div id="app">
  	<vue-particles color="#E940FF" :particleOpacity="0.4"></vue-particles>
    <router-view/>
    <div class="tools-list">
    	<i class="el-icon-arrow-up" @click="toTop()" @mouseenter="toTopSlot(true)" @mouseleave="toTopSlot(false)"></i>
    	<i class="el-icon-arrow-down"  @click="toBottom()" @mouseenter="toBottomSlot(true)" @mouseleave="toBottomSlot(false)"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data(){
  	return{
  		topTimer:'',
  		bottomTimer:'',
  	}
  },
  methods:{
  	toTop(){
  		document.body.scrollTop = 0;
			document.documentElement.scrollTop = 0;
  	},
  	toBottom(){
  		document.body.scrollTop = document.documentElement.scrollHeight || document.body.scrollHeight;
			document.documentElement.scrollTop = document.documentElement.scrollHeight || document.body.scrollHeight;
  	},
  	toTopSlot(isTrue){
  		var speed = 2;
  		var time = 30;
  		if(isTrue){
  			this.topTimer = setInterval(function(){
  				document.documentElement.scrollTop = document.documentElement.scrollTop - speed;
	  			if(document.documentElement.scrollTop == 0){
	  				clearInterval(this.topTimer)
	  			}
  			},time)
  		}else{
  			clearInterval(this.topTimer)
  		}
  	},
  	toBottomSlot(isTrue){
  		var speed = 2;
  		var time = 30;
  		if(isTrue){
  			this.bottomTimer = setInterval(function(){
  				document.documentElement.scrollTop = document.documentElement.scrollTop + speed;
	  			if(document.documentElement.scrollTop >= (document.documentElement.scrollHeight || document.body.scrollHeight)){
	  				clearInterval(this.bottomTimer)
	  			}
  			},time)
  		}else{
  			clearInterval(this.bottomTimer)
  		}
  	}
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: 12px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow: hidden;
  min-height: 100%;
  width: 100%;
}
#particles-js canvas{
	position: fixed;
	left: 0;
	top: 0;
	z-index: -1;
}
.tools-list{
	position: fixed;
	top: 50%;
	margin-top: -90px;
	right: 5%;
	width: 50px;
}
.tools-list i{
	background-color: #40FFF2;
	display: block;
	font-size: 20px;
	color: #000;
	width: 100%;
	height: 60px;
	line-height: 60px;
	transition: all 0.5s;
	margin-top: 20px;
}
.tools-list i:hover{
	background-color: #40FF9C;
	cursor: pointer;
}
@media only screen and (max-width: 767px) {
	.tools-list{right: 1%;width: 40px;}
	
}
</style>
