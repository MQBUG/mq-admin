var num = 10 //红包总数
var id = 0 //红包id
let zIndex = 1; //z-index

// 启动定时器 开启红包雨
var timer = setInterval("creatRedPacket()", 100)

// 创建红包
function creatRedPacket() {
	var boxWidth = $('#redBox').width() - 100;
	var rand = parseInt(Math.random() * boxWidth); //上方出现的位置
	var rdeg = parseInt(Math.random() * 30); //红包图片 旋转的角度
	rdeg = 10 - rdeg
	// console.log(rdeg)
	// console.log(boxWidth, "随机数" + rand);
	$('#redBox').append("<img class='redimg' id='" + id + "' src='./img/red.png' />")
	$("#" + id).css({
		"left": rand,
		"transform": "rotate(" + rdeg + "deg)"
	})
	$('#' + id).animate({
		bottom: '-50px'
	}, 1400, function() {})
	// $("#"+id).delay(00).velocity({bottom: "-80px"}, 1500);
	id++;
	//去掉定时器 
	if (id == 30) {
		clearInterval(timer);
		$('.big_red').css({
			"display": "flex"
		})
	}
}
