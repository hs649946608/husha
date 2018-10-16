window.onload = function(){
	searchEffect();
	timeBack();
	bannerEffect();
}
// 头部JS 效果
function searchEffect(){
	var banner =document.querySelector(".jd_banner");
    var bannerHeight=banner.offsetHeight;
    /*获取header搜索块*/
    var search=document.querySelector(".jd_search");
    /*2.获取当前屏幕滚动时，banner滚动出屏幕的距离*/
    window.onscroll=function(){
        var offsetTop= document.body.scrollTop+document.documentElement.scrollTop;
        console.log(offsetTop)
        /*3.计算比例值，获取透明度，设置背景颜色的样式*/
        var opacity=0;
        /*判断，如果当banner还没有完全 滚出屏幕，那么才有必要计算透明度和设置透明度*/
        if(offsetTop < bannerHeight){
            opacity=offsetTop/bannerHeight;
            /*设置样式*/
            search.style.backgroundColor="rgba(233,35,34,"+opacity+")";
        }
    }
}

// 倒计时js效果
function timeBack(){
	// 获取到每一个span
	var spans = document.querySelector(".jd_skTime").querySelectorAll("span")
	// 设置初始倒计时时间以秒为单位
	var totalTime = 3700;

	// 设置定时器
	var timerId = setInterval(function(){
		totalTime--;
		if(totalTime<0){
			clearInterval(timerId);
			return;
		}
		var hour = Math.floor(totalTime/3600);
		var minute = Math.floor(totalTime%3600/60);
		var second = Math.floor(totalTime%60);
		spans[0].innerHTML=Math.floor(hour/10);
		spans[1].innerHTML=Math.floor(hour%10);

		spans[3].innerHTML=Math.floor(minute/10);
		spans[4].innerHTML=Math.floor(minute%10);

		spans[6].innerHTML=Math.floor(second/10);
		spans[7].innerHTML=Math.floor(second%10);
	},1000)

}
//轮播图js效果
function bannerEffect(){
	//先获取jd_banner
	var banner = document.querySelector(".jd_banner");
	//获取banner里面的第一个子元素ul
	var imgBox = banner.querySelector("ul:first-of-type");
	//获取ul里面的第一个和最后一个li
	var first = imgBox.querySelector("li:first-of-type");
	var last = imgBox.querySelector("li:last-of-type");
	//将第一个复制添加到最后位置  将最后一张添加到第一位置的前面
	imgBox.appendChild(first.cloneNode(true));
	 /*insertBefore(需要插入的dom元素，位置)*/
	imgBox.insertBefore(last.cloneNode(true),imgBox.firstChild);

	//修改对应的样式
	//先获取banner的宽度 ul的宽度就=banner*ul里面li图片的个数
	var bannerWidth = banner.offsetWidth;
	var lis = imgBox.querySelectorAll("li")
	var count = lis.length;
	//给ul修改宽度
	imgBox.style.width = count*bannerWidth+"px";
	//给每一个li修改宽度
	for(var i = 0;i<lis.length;i++){
		lis[i].style.width = bannerWidth+"px";
	}
	var index = 1;
	//设置默认偏移
	imgBox.style.left = -bannerWidth+"px";
	//当屏幕大小改变的时候重新获取宽度赋值给bannerWidth然后改变ul和li的大小
	// 监听屏幕改变事件onresize
	window.onresize = function(){
		bannerWidth = banner.offsetWidth;
		//给ul修改宽度
		imgBox.style.width = count*bannerWidth+"px";
		//给每一个li修改宽度
		for(var i = 0;i<lis.length;i++){
			lis[i].style.width = bannerWidth+"px";
		}
		//设置偏移，不管屏幕在第几张图是变化的大小偏移索引*宽度就好
		imgBox.style.left = -index*bannerWidth+"px";
	}
  //动态添加轮播图下面的小点样式 在过渡效果结束时调用
	var setIndicator = function(index){
		var indicators = banner.querySelector("ul:last-of-type").querySelectorAll("li");
		for(var i = 0;i<indicators.length;i++){
			indicators[i].classList.remove("active");
		}
		indicators[index-1].classList.add("active");
	}


	var timeId;
	//实现自动轮播
	var starTime = function(){
		timeId = setInterval(function(){
			//变换索引进行图片切换
			index++;
			//设置偏移大小
			imgBox.style.left = -index*bannerWidth+"px";
			//设置过渡效果                         慢速开始和结束
			imgBox.style.transition = "left 0.5s ease-in-out";
			//判断是否到最后一张，如果是则去掉过渡效果 并偏移到指定位置
			//执行这一步要等轮播图播放到了最后再执行所以要给个定时器
			setTimeout(function(){
				if(index == count-1){
					//console.log(index)
					index = 1;
					imgBox.style.transition = "none";
					imgBox.style.left = -index*bannerWidth+"px";
				}
			},500)
		},2000)
	}
	starTime();

	// //实现手动轮播
	// //1，定义触摸刚开始、触摸过程中位置变量 以及两个之间差异的变量
	// var startX,moveX,distanceX;
	// //2,监听触摸开始、触摸过程中、触摸结束事件
	// imgBox.addEventListener("touchstart",function(e){
	// 	//触摸一开始就关闭定时器阻止自动轮播
	// 	clearInterval(timeId);
	// 	//e.targetTouch触摸手指是一个数组一般只要一个
	// 	startX = e.targetTouches[0].clientX;
	// });
	// imgBox.addEventListener("touchmove",function(e){
	// 	moveX = e.targetTouches[0].clientX;
	// 	distanceX = moveX - startX;
	// 	//在偏移过程中清除过渡效果
	// 	imgBox.style.transition = "none";
	// 	imgBox.style.left = -(index*bannerWidth+distanceX)+"px";

	// })

	    /*6.实现手动轮播*/
    var startX,moveX,distanceX;
    //定义一个标记变量 限制图片能否被移动
    var isEnd = true;
    /*为图片添加触摸事件--触摸开始*/
    imgBox.addEventListener("touchstart",function(e){
        /*清除定时器*/
        clearInterval(timeId);
        /*获取当前手指的起始位置*/
        startX= e.targetTouches[0].clientX;
    });
	
    /*为图片添加触摸事件--滑动过程*/
    imgBox.addEventListener("touchmove",function(e){
 		if(isEnd){//isEnd为true时可以进行移动
 			/*记录手指在滑动过程中的位置*/
        	moveX= e.targetTouches[0].clientX;
        	/*计算坐标的差异*/
        	distanceX=moveX-startX;
        	/*为了保证效果正常，将之前可能添加的过渡样式清除*/
        	imgBox.style.transition="none";
        	/*实现元素的偏移  left参照最原始的坐标
        	* 重大细节：本次的滑动操作应该基于之前轮播图已经偏移的距离*/
        	imgBox.style.left=(-index*bannerWidth + distanceX)+"px";
 		}
    });
    //添加触摸结束事件松开手指时触发

    imgBox.addEventListener("touchend",function(e){
    	isEnd = false;//手指离开的时候暂时阻止移动图片
    	//当滑动距离的绝对值 超过给定距离100就翻页小于给定距离但是确实做了滑动>0就回弹
    	if(Math.abs(distanceX)>100){
    		if(distanceX>0){
    			index--;
    		}else{
    			index++;
    		}
    		imgBox.style.transition = "left 0.5s ease-in-out";
    		imgBox.style.left = (-index*bannerWidth)+"px";
    	}else if(Math.abs(distanceX)>0){
    		imgBox.style.transition = "left 0.5s ease-in-out";
    		imgBox.style.left = (-index*bannerWidth)+"px";
    	}

    	// 清除移动距离
    	startX = 0;
    	moveX = 0;
    	distanceX = 0;

    })
    /*webkitTransitionEnd:可以监听当前元素的过渡效果执行完毕，当一个元素的过渡效果执行完毕的时候，会触发这个事件*/
    imgBox.addEventListener("webkitTransitionEnd",function(){
    	 /*如果到了最后一张(count-1)，回到索引1*/
        /*如果到了第一张(0)，回到索引count-2*/
    	if(index == count-1){
    		index = 1;
    		imgBox.style.transition = "none";
    		imgBox.style.left = (-index*bannerWidth)+"px";
    	}else if(index == 0){
    		index = count - 2;
    		imgBox.style.transition = "none";
    		imgBox.style.left = (-index*bannerWidth)+"px";
    	}
    	//在过渡效果结束后允许移动图片 并启动定时器 先要清除定时器 

    	setIndicator(index)//动态变换小点样式

    	setTimeout(function(){
    		isEnd = true;
    		clearInterval(timeId);
    		starTime();
    	},500)
    })

}
