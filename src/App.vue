<template>
  <div id="app">
  	<vue-particles color="#409EFF" :particleOpacity="0.4"></vue-particles>
  	<home-header></home-header>
    <router-view class='app-content' />
    <div class="tools-list" :class="{hideMb:isHide}">
    	<i class="el-icon-arrow-up" @click="toTop()" @mouseenter="toTopSlot(true)" @mouseleave="toTopSlot(false)"></i>
    	<i class="el-icon-arrow-down"  @click="toBottom()" @mouseenter="toBottomSlot(true)" @mouseleave="toBottomSlot(false)"></i>
    	<i class="el-icon-close hidePc" @click="closeTop"></i>
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
  		isHide:false,
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
  	},
  	closeTop() {
	    this.$confirm('您将隐藏右侧返回顶部按钮, 是否继续?', '提示', {
	      confirmButtonText: '确定',
	      cancelButtonText: '取消',
	      type: 'warning'
	    }).then(() => {
	    	this.isHide = true;
	      this.$message({
	        type: 'success',
	        message: '已隐藏!'
	      });
	    }).catch(() => {
	      this.$message({
	        type: 'info',
	        message: '已取消隐藏'
	      });          
	    });
	  }
  },
  components: {
  	HomeHeader,
		HomeFooter,
	}
}
</script>
