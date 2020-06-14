// 系统配置js文件

//加载页面 
var loading = layer.load();
$(document).ready(function () {
	layer.close(loading);
	$('#app').css('display', 'block')
})
// 设置 标签
function setTabs(e) {
	vm.tabs = e
	vm.$set(vm.tabs, 1, e)
}
// 设置导航栏
function setConfig() {
	var url = 'lib/web/web.json'
	var web = getAjax(url);
	// console.log(web)
	return web
}

const config = setConfig()

// index vue 实例
var vm = new Vue({
	el: '#app',
	data: {
		/*
		 *可修改的配置信息
		 */
		adminName: config.name,
		// 左侧导航栏
		webInfo: {
			bg: config.webInfo.bg,
			// bg:'#4f74b4',
			textColor: config.webInfo.textColor,
			// textColorActive: "#ffd04b"
			textColorActive: config.webInfo.textColorActive
		},
		activeIndex: config.activeIndex,
		footerText: 'mq-admin',
		/*
		 *不建议修改的配置信息
		 */
		isCollapse: true,
		welcome: true,
		navs: config.navs,
		showNav: true,
		tabs: [],
		id: '0',
		i: 0,
		isActive: 'tab-item-active',
		loadOk: false,
		item: '',

	},
	watch: {
		getTabsBoxWidth: function () {
			// 判断边界
			var tbox = $('.tab-item-box')
		}
	},
	methods: {
		isShowNav: function (e) { //隐藏显示左边导航栏
			if (this.showNav) {
				$(".left-side").animate({ left: '-220px' }, "slow");
				$(".right-box").animate({ left: '0' }, "slow");
				this.showNav = !this.showNav
			} else {
				$(".left-side").animate({ left: '0px' }, "slow");
				$(".right-box").animate({ left: '220px' }, "slow");
				this.showNav = !this.showNav
			}
		},
		welTab: function () { //控制台 欢迎页面 tab事件
			this.welcome = true
			this.id = '0'
			this.activeIndex = '0'
			$('.tab-item-ul').css("left", 0)
		},
		openTabs: function (e) { //打开页面 加载显示tabs
			this.welcome = false
			var tabs = this.tabs
			if (this.tabs.length == 0) {
				this.tabs.push({ id: e.id, data: e })
				this.id = e.id
				this.item = e
				calWidth()
			} else {
				var back = checkTab(e.id)
				if (back == 1) { //可以插入
					this.tabs.push({ id: e.id, data: e })
					this.id = e.id
					this.item = e
					calWidth()
				} else { //已打开
					this.id = e.id;
					this.item = e
					calTabWid(e.id)
				}
			}
		},
		//点击tab显示页面 并改变颜色 调整距离
		tabActive: function (e) {
			this.welcome = false
			this.id = e.id;
			this.item = e.data
			this.activeIndex = e.id
			calTabWid(e.id)
		},
		//tabs关闭事件
		tabClose: function (e) {
			closeTabThis(e.id)
		},
		//tabs右移
		tabsRight: function () {
			var left = $('.tab-item-ul').position().left;
			var tbox = $('.tab-item-box').width() //外边盒子距离长度
			var ul = $('.tab-item-ul').width()
			if (ul > tbox) {
				if (left < tbox - ul) {
					layer.tips('到最右边了', '.tab-right', { tips: 1 });
				} else {
					$('.tab-item-ul').css("left", -(ul - tbox))
				}
			} else {
				layer.tips('到最右边了', '.tab-right', { tips: 1 });
			}
		},
		//tabs左移
		tabsLeft: function () {
			var left = $('.tab-item-ul').position().left;
			if (left >= 0) {
				layer.tips('到最左边了', '.tab-left', { tips: 1 });
			} else if (left < -100) {
				$('.tab-item-ul').css("left", left + 100)
			} else {
				$('.tab-item-ul').css("left", 0)
			}
		},
		notice: function () { //公告
			// layer.msg('公告')
			layer.open({
				type: 1,
				title: '系统公告',
				content: $('#notice'),
				area: ['300px', 'auto'],
				btn: '知道啦',
				btnAlign: 'c' //按钮居中
			});
		},
		// 关闭tab 
		tabsCloseItem: function (e) {
			if (e == 'a') {
				// layer.msg('关闭当前')
				closeTabThis(this.id)
			} else if (e == 'b') {
				// layer.msg('关闭其他')
				closeTabOther()
			} else {
				// layer.msg('关闭所有')
				closeTabAll()
			}
		},
		// 个人信息操作
		personCommand(e){
			 switch(e){
				 case 'center': this.$message("个人中心");break;
				 case 'base': this.$message("基本资料");break;
				 case 'logout': 
				 this.$confirm('确定退出登录吗?', '提示', {
				           confirmButtonText: '确定',
				           cancelButtonText: '取消',
				           type: 'warning'
				         }).then(() => {
				         window.location.href="./pages/login/login.html"
				         }).catch(() => {
				           this.$message({  type: 'info', message: '已取消退出' });          
				         });
				 break;
			 }
		}
	},

})

function checkTab(id) { //检查tabs是否已经打开
	var i = 0;
	var back = 0
	var tabs = vm.tabs
	for (i; i < tabs.length; i++) {
		if (tabs[i].id == id) {
			back = 0
			break //找到id 中断循环
		} else {
			back = 1
		}
	}
	return back
}

//计算 tab距离
function calTabWid(id) {
	// console.log(id)
	var tbox = $('.tab-item-box').width() //外边盒子距离长度
	var ul = $('.tab-item-ul').width() //tabs外边盒子长度
	var left = $('.tab-item-ul').position().left; //ul 左边偏移距离
	var titem = $('#' + id)
	if (titem.length > 0) {
		var iLeft = titem.position().left //tab距离父盒子左边距离
		var titemW = $('#' + id).width()
		if (ul > tbox && left <= 0) {
			var disAreaL = -left //可视区域左边
			var disAreaR = -left + tbox //可视区域右边
			var iRight = titemW + iLeft
			if (iLeft >= disAreaL && iRight <= disAreaR) {
				// console.log('不需要移动')
			} else {
				// console.log('需要移动')
				if (iLeft < disAreaL) {
					// console.log('往右移动')
					$('.tab-item-ul').css("left", left + (disAreaL - iLeft) + 50)
				} else if (iRight > disAreaR) {
					// console.log('往左移动')
					$('.tab-item-ul').css("left", left + (disAreaR - iRight) - 20)
				}
			}
		}
	}
}


// opentab 打开时计算左移距离
function calWidth() {
	var tbox = $('.tab-item-box').width() //外边盒子距离长度
	var titem = $('.tab-item')
	var len = vm.tabs.length + 2 //有几个tabs
	var countLen = titem.width() * len
	var ul = $('.tab-item-ul').width() + 100
	if (tbox - ul < 0) {
		var len = tbox - ul
		$('.tab-item-ul').css("left", len - 20)
	}
}

// 关闭当前tab标签  --> 下拉点击事件、tab X按键关闭事件
function closeTabThis(id) {
	var tabs = vm.tabs
	var i = 0;
	var len = vm.tabs.length - 2
	if (id == 0) {
		layer.msg('这个不能关闭的哦')
		return
	}
	for (i; i < tabs.length; i++) { //找到id在tabs数组中的位置 下标
		// console.log(tabs[i].id)
		if (tabs[i].id == id) {
			break;
		}
	}
	// console.log(i)
	vm.tabs.splice(i, 1) //从tabs中移除

	if (tabs.length == 0) { //如果tabs没有数据，将控制台设置变色
		vm.welcome = true
		vm.id = '0'
	} else {
		if (tabs[len].id != vm.id) { //判断tabs数组中最后一组数据的id是否为当前的id，若不是则设置
			vm.id = tabs[len].id
			vm.item = tabs[len].data
		}
	}
	//调整位置
	closeWidth()
}
//关闭其他标签页
function closeTabOther() { //删除tabs所有数组，重新push
	if (vm.tabs.length == 0) {
		return
	} else {
		if (vm.id == 0) {
			vm.tabs = []
		} else {
			var item = vm.item
			vm.tabs = []
			vm.tabs.push({ id: item.id, data: item })
			$('.tab-item-ul').css("left", 0)
		}
	}
}
//关闭所有标签页
function closeTabAll() {
	vm.tabs = []
	vm.welcome = true
	vm.id = '0'
	$('.tab-item-ul').css("left", 0)
}
// 关闭tabs时重新调整位置
function closeWidth() {
	var tbox = $('.tab-item-box').width() //外边盒子距离长度
	var ul = $('.tab-item-ul').width() //tabs外边盒子长度
	var left = $('.tab-item-ul').position().left; //ul 左边偏移距离
	if (ul > tbox) {
		$('.tab-item-ul').css("left", tbox - ul + 60)
	} else {
		$('.tab-item-ul').css("left", 0)
	}
}

// ajax 获取数据
function getAjax(url) {
	var data = null;
	$.ajax({
		url: url, //json文件路径
		async: false,
		success: function (e) { //成功
			data = e
		},
		error: function (e) { //失败
			console.log('ajax加载失败')
		},
	});
	return data;
}
