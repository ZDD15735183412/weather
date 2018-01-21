/*
* @Author: 张丹丹
* @Date:   2018-01-19 15:50:32
* @Last Modified by:   张丹丹
* @Last Modified time: 2018-01-19 17:28:57
*/
var aa="123";
//输出元素
console.log(aa);
//let输出
let button=document.getElementsByClassName("button");
console.log(button);
//当页面加载时
window.onload=function(){
	//当点击按钮消失
	//var button=document.getElementsByClassName("button")
	//
	button[0].onclick=function(){
		//alert("这是一个按钮")
		var city=document.getElementsByClassName("city");
		console.log(city);
		city[0].style.display="none";
	}
	var pos=document.getElementsByClassName("pos");
	pos[0].onclick=function(){
		//获取元素，用document
		var city=document.getElementsByClassName("city");
        console.log(city);
		city[0].style.display="block";
	}
}
//引入远程数据
//关于城市的数据
$.ajax({
 url:"https://www.toutiao.com/stream/widget/local_weather/city/",
 dataType:"jsonp",
 method:"get",
 success:function(obj){
 	var city=obj.data;
 	console.log(city);
 }
})

$.ajax({
	url:"https://www.toutiao.com/stream/widget/local_weather/data/?city=太原",
    dataType:"jsonp",
    method:"get",
    success:function(obj){
       var tianqi=obj.data;
       console.log(tianqi);
 	   console.log(tianqi.weather.currect_temperture);
 	   //var tem=tianqi.weather;
  }
})


//js
//1、当整个页面加载完成时，才可以对元素进行操作
//2、获取元素：document.getElementsByClassName("")[0];
//3、添加事件函数
//4、进行样式的操作

