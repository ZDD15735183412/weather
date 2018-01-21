/*
* @Author: 张丹丹
* @Date:   2018-01-20 08:54:49
* @Last Modified by:   张丹丹
* @Last Modified time: 2018-01-20 17:29:13
*/
//引入远程数据
//关于城市
var city;
var tianqi;
$.ajax({
 url:"https://www.toutiao.com/stream/widget/local_weather/city/",
 dataType:"jsonp",
 method:"get",
 success:function(obj){
 	city=obj.data;
 	console.log(city);
 }
})
// 关于天气信息
$.ajax({
	url:"https://www.toutiao.com/stream/widget/local_weather/data/?city=太原",
    dataType:"jsonp",
    method:"get",
    success:function(obj){
       tianqi=obj.data;
       console.log(tianqi);
  }
})
//页面加载
window.onload=function(){
	//加载数据
    update();
    //页面交互
    var pos=document.getElementsByClassName("pos")[0];
    var cityBox=document.getElementsByClassName("city")[0];
    pos.onclick=function(){
    	cityBox.style.display="block";
    }
    //点击城市详情跳转首页
    var Box=$(".city .citys .con .box");
    for(let i in Box){
    	Box[i].onclick=function(){
    		var chengshi=this.innerHTML;
    		console.log(chengshi);
    		//调用ajax函数
    		AJAX(chengshi);
    		// update();
    	}
    }
  
  //搜索部分 
    var searchBox=document.getElementsByClassName("searchBox")[0];
    var button=document.getElementsByClassName("button")[0];
    var text; 
    searchBox.onfocus=function(){
    	button.innerHTML="确认";
    	text=searchBox.value;
    }
    button.onclick=function(){
    var neirong=button.innerHTML; 
    if(neirong=="取消"){
    	var city3=document.getElementsByClassName("city")[0];
    	city3.style.display="none";
    }else{
    	for(let i in city){
    		for(let j in city[i]){
    			if(text==j){
    				AJAX(text);
    				return;
    			}else{
    				alert("没有此城市天气情况");
    				return;
    			}
    		}

    	}
    }

  }
 }


//获取点击城市信息
function AJAX(str){
	$.ajax({
	url:`https://www.toutiao.com/stream/widget/local_weather/data/?city=${str}`,
    dataType:"jsonp",
    method:"get",
    success:function(obj){
       tianqi=obj.data;
       console.log(tianqi);
       update();
       var city2=$(".city")[0];
       city2.style.display="none";   
  }
})	
}

//获取数据
function update(){
	//城市
	var pos=document.getElementsByClassName("pos")[0];
	pos.innerHTML=tianqi.city;
	
	//空气质量
	var quality_level=document.getElementsByTagName('h5')[0];
	quality_level.innerHTML=tianqi.weather.quality_level;

	//当前温度
	var current_temperature=document.getElementsByClassName('title1')[0];
	current_temperature.innerHTML=tianqi.weather.current_temperature+"°"; 

	//
	var current_condition=document.getElementsByClassName("title2")[0];
	current_condition.innerHTML=tianqi.weather.current_condition;

	//当前风的方向
	var wind_direction=document.getElementsByClassName("wind_der")[0];
	wind_direction.innerHTML=tianqi.weather.wind_direction;

	//风的等级
	var wind_level=document.getElementsByClassName("wind_level")[0];
	wind_level.innerHTML=tianqi.weather.wind_level+"级";


	//今天天气图标
	var today_icon=document.getElementsByClassName("conPic")[0];
	today_icon.style=`background-image:url("img/${tianqi.weather.dat_weather_icon_id}.png")`;

	//今天下头天气情况
	var today_con=document.getElementsByClassName("con")[0];
	today_con.innerHTML=tianqi.weather.day_condition;
	
	// 今天气温
	var tod_high_tem=document.getElementsByClassName("heigher")[0];
	tod_high_tem.innerHTML=tianqi.weather.dat_high_temperature+"°/";

	var tod_low_tem=document.getElementsByClassName("lower")[0];
	tod_low_tem.innerHTML=tianqi.weather.dat_low_temperature+"°";
	//明天天气图标
	var tomorrow_icon=document.getElementsByClassName("tomorrow_icon")[0];
	tomorrow_icon.style=`background-image:url("img/${tianqi.weather.tomorrow_weather_icon_id}.png")`;

	//明天下头天气情况
	var tomorrow_con=document.getElementsByClassName("tomorrow_con")[0];
	tomorrow_con.innerHTML=tianqi.weather.tomorrow_condition;
	
	// 明天气温
	var tom_high_tem=document.getElementsByClassName("heigher1")[0];
	tom_high_tem.innerHTML=tianqi.weather.tomorrow_high_temperature+"°/";

	var tom_low_tem=document.getElementsByClassName("lower1")[0];
	tom_low_tem.innerHTML=tianqi.weather.tomorrow_low_temperature+"°";
	//每小时天气预报
	var hourlyArr=tianqi.weather.hourly_forecast;
	var wrap=document.getElementsByClassName("wrap")[0];
	for(let i in hourlyArr){
		//创建box
		var box1=document.createElement("div");
	    box1.className="box";
	   
	    //创建time块
	    var time=document.createElement("div");
	    //添加类名
		time.className="time";
		//添加到父级元素上
		box1.appendChild(time);
		//添加内容
		time.innerHTML=hourlyArr[i].hour+":00";

		//添加图标块
		var icon=document.createElement("div");
		icon.className="icon";
		box1.appendChild(icon);
		//修改样式
		icon.style=`background-image:url("img/${hourlyArr[i].weather_icon_id}.png")`;

		//创建温度块
		var timeTem=document.createElement("div");
		timeTem.className="timeTem";
		box1.appendChild(timeTem);
		//修改样式
		timeTem.innerHTML=hourlyArr[i].temperature+"°";

		//添加到box
		wrap.appendChild(box1);
	}

	//未来15天
	var dayArr=tianqi.weather.forecast_list;
	var wrap1=document.getElementsByClassName("wrap1")[0];

	for(let i in dayArr){
		var box2=document.createElement("div");
	    box2.className="box";

	    var date=document.createElement("div");
		date.className="date";
		box2.appendChild(date);
		date.innerHTML=dayArr[i].date;

		var weather=document.createElement("div");
		weather.className="weather";
		box2.appendChild(weather);
		weather.innerHTML=dayArr[i].condition;
		
		var icon=document.createElement("div");
		icon.className="icon";
		box2.appendChild(icon);
		icon.style=`background-image:url("img/${dayArr[i].weather_icon_id}.png")`;
		
        var higher=document.createElement("div");
		higher.className="higher";
		box2.appendChild(higher);
		higher.innerHTML=dayArr[i].high_temperature;
		
		var lower=document.createElement("div");
		lower.className="lower";
		box2.appendChild(lower);
		lower.innerHTML=dayArr[i].low_temperature;

		var wind=document.createElement("div");
		wind.className="wind";
		box2.appendChild(wind);
		wind.innerHTML=dayArr[i].wind_direction;

		var degree=document.createElement("div");
		degree.className="degree";
		box2.appendChild(degree);
		degree.innerHTML=dayArr[i].wind_level;

		wrap1.appendChild(box2);
	}
	//关于城市信息
	var city1=document.getElementsByClassName("city")[0];
	for(let i in city){
		var citys=document.createElement("div");
		citys.className="citys";

		var title=document.createElement("div");
		title.className="title";
		title.innerHTML=i;
		citys.appendChild(title);

		var con=document.createElement("div");
		con.className="con";
		
		for(let j in city[i]){
			var box=document.createElement("div");
			box.className="box";
			box.innerHTML=j;
			con.appendChild(box);
		}
		citys.appendChild(con);
		city1.appendChild(citys);
	}

}







