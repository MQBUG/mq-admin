var vm = new Vue({
	el: '#app',
	data() {
		return {

		}
	},
	methods: {

	}
})

// mditor 配置
var textarea = document.getElementById('editor');
var mditor = Mditor.fromTextarea(textarea);
mditor.on('ready', function() {
	mditor.preivew = true; //打开预览
	mditor.split = false; //关闭 分屏显示
	mditor.fullscreen = true; //打开   全屏  
	
	// 获取本地readme文件并输出
	axios.get('../../README.md').then((res)=>{
		mditor.value=res.data
	})
});

