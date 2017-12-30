
$(function(){
	var start=0;
	
	$('#body').before('<div><canvas id="foreground" width="1920" height="1024">Browser version not supported canvas£¡</canvas></div>');
	var fg=document.getElementById("foreground");
	F=fg.getContext("2d");
	
	var demo=0;var rgb="rgba(22,160,133, 0.1)";
	document.onclick=function(ev){
		var mouse=getMousePos(ev);
		//alert("x:"+mouse.x+"y:"+mouse.y);
		if(1780<mouse.x&&mouse.x<1820&&780<mouse.y&&mouse.y<820){
			demo=1;
			if(start==0){
				begin();
				rgb="rgba(0, 0, 0, 0.1)"
				start=1;
			}
		}
	}

	
	var i=0;
	var timer=setInterval(function(){
		//F.fillText("demo:"+demo,1500,800);
		if(demo>=1){
			demo++;
		}if(demo>=20){
			demo=0;
		}

		i++;
		if(i>=361){
			i=0;
		}
		F.fillStyle="white";
		F.beginPath();
		F.arc(1800,800,20,0,2*Math.PI);
		F.fill();
		
		onex=parseInt(1800+25*Math.cos(i*Math.PI/180));
		oney=parseInt(800+25*Math.sin(i*Math.PI/180));
		twox=parseInt(1800+25*Math.cos((i+180)*Math.PI/180));
		twoy=parseInt(800+25*Math.sin((i+180)*Math.PI/180));

		F.beginPath();
		F.arc(onex,oney,5,0,2*Math.PI);
		F.fill();
		
		F.beginPath();
		F.arc(twox,twoy,5,0,2*Math.PI);
		F.fill();
		
		
		F.fillStyle = rgb;
		F.fillRect(1770, 770, 60, 60);
	},20);

	function begin(){
		$('#body').before('<div><canvas id="canvas" width="1920" height="1024">Browser version not supported canvas£¡</canvas></div>');
		star();
		document.body.style.overflow="hidden";//隐藏滚动条
	}

});


function getMousePos(ev){
	if(ev.pageX || ev.pageY){
		return {x:ev.pageX,y:ev.pageY};
	}
}

function star(){
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
	//渐隐
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
