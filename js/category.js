window.onload=function(){
    /*获取左侧栏*/
    var ct_cLeft=document.querySelector(".ct_left");
    /*获取左侧栏的高度*/
    var leftHeight=ct_cLeft.offsetHeight;
    /*获取用来滑动的列表*/
    var ulBox=ct_cLeft.querySelector("ul:first-of-type");
    var ulBoxHeight=ulBox.offsetHeight;

    /*获取所有li元素*/
    var lis=ulBox.querySelectorAll("li");

    /*设置静止状态下的最大top值*/
    var maxTop=0;
    /*设置静止状态下的最小的top值*/
    var minTop=leftHeight-ulBoxHeight;
    /*设置滑动状态下的最大的top值*/
    var maxBounceTop=maxTop+100;
    /*设置滑动状态下的最小top值*/
    var minBounceTop=minTop-100;
    console.log(maxBounceTop+":"+minBounceTop);

    /*实现滑动*/
    var startY=0;
    var moveY=0;
    var distanceY=0;
    /*记录当前元素滑动到的距离*/
    var currentY=0;

    /*添加滑动事件*/
    ulBox.addEventListener("touchstart",function(e){
        /*获取手指的起始坐标*/
        startY= e.targetTouches[0].clientY;
    });
    ulBox.addEventListener("touchmove",function(e){
        moveY= e.targetTouches[0].clientY;
        /*计算距离的差异*/
        distanceY=moveY-startY;
        /*判断滑动的时候是否超出当前指定的滑动区间*/
        if(currentY+distanceY > maxBounceTop || currentY+distanceY < minBounceTop){
            console.log("超出范围啦");
            return;
        }
        /*先将之前可能添加的过渡效果清除*/
        ulBox.style.transition="none";
        /*实现偏移操作:应该在之前的滑动距离的基础之上再进行滑动*/
        ulBox.style.top=(currentY+distanceY)+"px";
    });
    ulBox.addEventListener("touchend",function(e){
        /*判断当前滑动的距离是否在静止状态和滑动状态下的最小top值之间*/
        if(currentY+distanceY < minTop){
            currentY=minTop;
            /*回到minTop位置*/
            ulBox.style.transition="top 0.5s";
            ulBox.style.top=minTop+"px";
        }
        else if(currentY+distanceY > maxTop){
            currentY=maxTop;
            /*回到maxTop位置*/
            ulBox.style.transition="top 0.5s";
            ulBox.style.top=maxTop+"px";
        }
        else{
            /*记录当前滑动的距离*/
            currentY+=distanceY;
        }
    });

    //定义li的index属性
    for(var i = 0;i<lis.length;i++){
        lis[i].index = i;
    }
    //绑定移动端tap事件 这是用自己封装的common.js来使用点击事件的
    // itcast.tap(ulBox,function(e){
    //     // 修改li样式将所有的li样式清除给当前触发事件的li加上
    //     for(var i= 0;i<lis.length;i++){
    //         lis[i].classList.remove("active");
    //     }
    //     // 当前触发事件的对象用e.target获取但获取到的是通过捕获获取到li下面的a标签
    //      var li = e.target.parentNode; //a的父元素
    //      li.classList.add("active");
    //      // 设置偏移  点击第几个li就偏移多少个li的高度 要得到li的索引要自己去定义li的属性
    //      ulBox.style.transition = "top 0.5s";
    //      var index = li.index;
    //      var liHeight = li.offsetHeight;
    //      if(-index*liHeight<minTop){
    //         ulBox.style.top = minTop+"px";
    //         // 移动后也要记录当前的位置为下次移动做基准
    //         currentY = minTop;
    //      }else{
    //         ulBox.style.top = -index*liHeight+"px";
    //         currentY = -index*liHeight;
    //      }
    // })
    //绑定移动端tap事件 这是用封装的zepto.js来使用点击事件的
    // $(ulBox).on("tap",function(e){
    //     // 修改li样式将所有的li样式清除给当前触发事件的li加上
    //     for(var i= 0;i<lis.length;i++){
    //         lis[i].classList.remove("active");
    //     }
    //     // 当前触发事件的对象用e.target获取但获取到的是通过捕获获取到li下面的a标签
    //      var li = e.target.parentNode; //a的父元素
    //      li.classList.add("active");
    //      // 设置偏移  点击第几个li就偏移多少个li的高度 要得到li的索引要自己去定义li的属性
    //      ulBox.style.transition = "top 0.5s";
    //      var index = li.index;
    //      var liHeight = li.offsetHeight;
    //      if(-index*liHeight<minTop){
    //         ulBox.style.top = minTop+"px";
    //         // 移动后也要记录当前的位置为下次移动做基准
    //         currentY = minTop;
    //      }else{
    //         ulBox.style.top = -index*liHeight+"px";
    //         currentY = -index*liHeight;
    //      }
    // })
    //最好的方法是下面这个插件解决click的延迟问题是它可以在pc端和移动端都能用click事件
    /*绑定fastclick*/
    if ('addEventListener' in document) {
        document.addEventListener('DOMContentLoaded', function() {
            /*参数可以是任意的dom元素，如果写document.body，说明会将document.body下面的所的元素都绑定fastclick*/
            FastClick.attach(document.body);
        }, false);
    }
    ulBox.addEventListener("click",function(e){
        for(var i= 0;i<lis.length;i++){
            lis[i].classList.remove("active");
        }
        // 当前触发事件的对象用e.target获取但获取到的是通过捕获获取到li下面的a标签
         var li = e.target.parentNode; //a的父元素
         li.classList.add("active");
         // 设置偏移  点击第几个li就偏移多少个li的高度 要得到li的索引要自己去定义li的属性
         ulBox.style.transition = "top 0.5s";
         var index = li.index;
         var liHeight = li.offsetHeight;
         if(-index*liHeight<minTop){
            ulBox.style.top = minTop+"px";
            // 移动后也要记录当前的位置为下次移动做基准
            currentY = minTop;
         }else{
            ulBox.style.top = -index*liHeight+"px";
            currentY = -index*liHeight;
         }
    })
}