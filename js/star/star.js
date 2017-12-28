
$(function(){
	
	$('#body').before('<div><canvas id="canvas" width="1920" height="1024">Browser version not supported canvas！</canvas></div>');
	

	load();
	//var docElm = document.documentElement;
	//docElm.webkitRequestFullScreen();
	document.body.style.overflow="hidden";//隐藏页面水平和垂直滚动条
});

function load(){
	var canvas=document.getElementById("canvas");
	C=canvas.getContext("2d");

	var list=new Array();

	for (var i = 0; i < 30; i++) {
		list.push(one());
	}
	var bgs=bg();
	var color=["#31372B","#35682D","#57A639","#BDECB6"];
	var time=0;
	var timer=setInterval(function(){
				//画一个透明系数为0.05的矩形，达到渐隐的效果
				C.fillStyle = "rgba(0, 0, 0, 0.1)";
				C.fillRect(0, 0, 1920, 1080);
				bgs.forEach(function(star){
					C.fillStyle="white";
					C.fillRect(star.x,star.y,star.size,star.size);
				});
				//C.clearRect(0,0,1920,1080);
				list.forEach(function(one, index, array){
					if(one[0].y>=(600+one[0].size*30)){
						one[0].d+=1;
						if(one[0].d==100){
							list.splice(index,1);
							alert("s");
						}
						
					}else{
						one.forEach(function(o, index, array){
							C.fillStyle=color[index];
							C.fillRect(o.x,o.y,o.size,o.size);
							if(o.y<1100){
								o.y+=o.s;
							}
						});
					}
					
				});
				time++;
				if(time%5==0){
					list.push(one());
					time=0;
				}
			},20);



}

function bg(){
	var bgs=new Array();
	for (var i =0; i <1000; i++) {
		var star=new Object();
		star.x=Math.round(Math.random()*1920);
		star.y=Math.round(Math.random()*700);
		star.size=Math.round(1+Math.random()*3);
		bgs[i]=star;
	}
	return bgs;
}

function one(){
	var one=new Array();
	var x=Math.round(Math.random()*170);
	var s=Math.round(2+Math.random()*4);
	var size=Math.round(3+Math.random()*4);
	for (var j = 0; j < 4; j++) {
		var o=new Object();
		o.x=x*10;
		o.y=j*15-60;
		o.s=s;
		o.size=size;
		one[j]=o;
	}
	return one;
}
