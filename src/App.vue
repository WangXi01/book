<template>
  <div id="app">
  	<vue-particles color="#E940FF" :particleOpacity="0.4"></vue-particles>
  	<home-header></home-header>
    <router-view class='app-content' />
    <div class="tools-list hideMb">
    	<i class="el-icon-arrow-up" @click="toTop()" @mouseenter="toTopSlot(true)" @mouseleave="toTopSlot(false)"></i>
    	<i class="el-icon-arrow-down"  @click="toBottom()" @mouseenter="toBottomSlot(true)" @mouseleave="toBottomSlot(false)"></i>
    </div>
    <home-footer></home-footer>
  </div>
</template>

<script>
import HomeFooter from '@/components/Footer'	
import HomeHeader from '@/components/Header'
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
  },
  components: {
  	HomeHeader,
		HomeFooter,
	}
}
</script>
