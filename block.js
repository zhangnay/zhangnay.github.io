$(function(){
	//颜色
	var color=Math.floor(Math.random()*9);
	var colorold=Math.floor(Math.random()*9);
	var colors=['#A98307','#F44611','#9B111E','#412227','#EA899A','#6C4675','#3E5F8A','#3F888F','#587246','#8E402A'];

	//定义添加游戏方块方法
	function addgame(c){
		for(i=0;i<game.length-1;i++){
			for(j=0;j<10;j++){
				if(game[i][j]==1){
					$('.game').append('<div class="block bg" ></div>');
				}else if(game[i][j]==2){
					$('.game').append('<div class="block down" style="background-color:'+colors[c]+';box-shadow: 5px 5px 5px '+colors[c]+';"></div>');
				}else{
					$('.game').append('<div class="block "></div>');
				}
			}
		}
	}

	//定义添加即将方块方法
	function addnext(c){
		for(i=0;i<next.length;i++){
			for(j=0;j<next[i].length;j++){
				if(next[i][j]==2){
					$('.next').append('<div class="block bg"  style="background-color:'+colors[c]+';box-shadow: 5px 5px 5px '+colors[c]+';"></div>');
				}else{
					$('.next').append('<div class="block "></div>');
				}
			}
		}
	}

	//加载方块
	addgame(colorold);
	addnext(color);


//刷新等待时长
var timer;
var T=50;
			//状态
			var state=0;
			//分数
			var score=0;
			//时间
			var time=0;
			//是否可以下落，左右移动
			var down=0;var left=0;var right=0;
			//方块坐标--添加一个计数变量
			var x=0;var y=0;var count=0;
			//随机方块m,m下一个方块。mm,nn当前方块
			var m=Math.floor(Math.random()*6);var n=Math.floor(Math.random()*3);
			var mm=Math.floor(Math.random()*6);var nn=Math.floor(Math.random()*3);
			
			//随机位置
			x=Math.floor(Math.random()*6);
			//禁用按钮
			contro();
			//流程控制
			$('.refresh').click(function(event) {
				changes();
			});
			$('.start').click(function(event) {
				changes();
				//alert(T);
				state=3;
				//禁用按钮
				contro();
			});
			$('.stop').click(function(event) {
				state=2;
				//禁用按钮
				contro();
			});
			$('.again').click(function(event) {
				changes();
				state=1;
				//禁用按钮
				contro();
			});
			$('.over').click(function(event) {
				state=0;
				//时间归零
				time=0;
				//分数归零
				score=0;
				//初始化游戏数组
				initgame();
				//初始化即将出现的方块
				initold();
				//禁用按钮
				contro();
			});

			function contro(){
				if(state==0){
					//alert('state:'+state);
					$('.start').attr('disabled',false);
					$('.stop').attr('disabled','');
					$('.again').attr('disabled','');
					$('.over').attr('disabled','');
				}
				if(state==1){
					$('.start').attr('disabled','');
					$('.stop').attr('disabled',false);
					$('.again').attr('disabled',false);
					$('.over').attr('disabled',false);
				}
				if(state==2){
					//alert('state:'+state);
					$('.start').attr('disabled',false);
					$('.stop').attr('disabled','');
					$('.again').attr('disabled',false);
					$('.over').attr('disabled',false);
				}
				if(state==3){
					//alert('state:'+state);
					$('.start').attr('disabled','');
					$('.stop').attr('disabled',false);
					$('.again').attr('disabled',false);
					$('.over').attr('disabled',false);
				}
			}

			function changes(){
				var S=$('.speed input').val();
				
				if(S!=""){
					if(S%10==0){


						alert(S);
						T=parseInt($('.speed input').val());
						$('.speed input').attr("placeholder",'当前速度为：'+S);
						$('.speed input').val('');
						clearInterval(timer);
						Tim();
					}else{
						$('.speed input').attr("placeholder",'请输入整数！');
						$('.speed input').val('');
					}
				}else{
					$('.speed input').attr("placeholder",'请输入数值！');
				}
			}

			function initgame(){
				for(i=0;i<game.length;i++){
					for(j=0;j<game[i].length;j++){
						game[i][j]=0;
					}
				}
			}

			function initold(){
						//将下个方块变为当前方块
						old=next;
						mm=m;
						nn=n;
						//重新随机下一个方块信息
						m=Math.floor(Math.random()*6);n=Math.floor(Math.random()*3);
						x=Math.floor(Math.random()*6);
						colorold=color;
						color=Math.floor(Math.random()*9);
						next=blocks[m][n];
						y=0;
					}

			//计时器--循环
			function Tim(){
				timer=setInterval(function(){
				//流程控制
				controller();
				//重置
				if(state==1){
					//时间归零
					time=0;
					//分数归零
					score=0;
					//初始化游戏数组
					initgame();
					initold();
					//重新开始游戏
					state=3;
				}
				//暂停
				if(state==2){
					
				}
				//运行
				if(state==3){
					//移动方块
					move();
					
					//画面10帧每秒
					if(time%10==0){
						//运行游戏
						begin();
						//方块下落
						y++;
					}
					//刷新时间---没有小数补上'.00S'  一位小数补上'.0S'  两位小数补上'S'
					if(time%(1000/T)==0){
						$('.time').text('时间：'+(time/(1000/T))+'.00s');
					}else if(time%(100/T)==0){
						$('.time').text('时间：'+(time/(1000/T))+'0s');
					}else{
						$('.time').text('时间：'+(time/(1000/T))+'s');
					}
					//刷新分数
					$('.score').val('当前得分：'+score);
					//时间增加
					time++;
				}


				//定义监听键盘控制暂停
				function controller(){
					document.onkeydown=function(event){
						var e = event || window.event || arguments.callee.caller.arguments[0];   
						if(e && e.keyCode==13){
							if(state==3){
								alert('暂停');
								state=2;
							}else{
								alert('开始');
								state=3;
							}
						}
					}
				}

				//定义移动规则
				function move(){
					//添加键盘事件的方法
					document.onkeydown=function(event){
						//创建监听对象
						var e = event || window.event || arguments.callee.caller.arguments[0];

						//如果等于32（空格）旋转方块
						if(e && e.keyCode==32){
							// alert(m);
							// alert(n);
							//nn取值在[0-3]之间
							if(nn!=3){
								nn++;
							}else{
								nn=0;
							}
							//先旋转循环检测是否越界
							var bianhuan=0;
							for(i=0;i<blocks[mm][nn].length;i++){
								for(j=0;j<blocks[mm][nn][i].length;j++){
									//有方块
									if(blocks[mm][nn][i][j]==2){
										//和其他方块重叠或者越界
										if(game[y+i][x+j]==1||(x+j)>9){
											bianhuan++;
										}
									}
								}
							}

							//bianhuan==0则满足旋转的条件
							if(bianhuan==0){
								old=blocks[mm][nn];
							}else{
								//nn取值在[0-3]之间
								if(nn!=0){
									nn--;
								}else{
									nn=3;
								}
							}
							
							
						}

						//循环检测是否可以向左右或向下移动
						for(i=0;i<old.length;i++){
							for(j=0;j<old[i].length;j++){
								//有方块
								if(old[i][j]==2){
									//方块下部有其他已定方块或者到底了
									if(game[y+i+1][x+j]==1||y+i==19){
										down=1;
									}
									//方块左边有其他方块或者已经靠左壁了
									if(game[y+i][x+j-1]==1||x==0){
										left=1;
									}else{
										left=0;
									}
									//方块右边有其他方块或者已经靠右壁了
									if(game[y+i][x+j+1]==1||(x+j)==9){
										right=1;
									}else{
										right=0;
									}

								}
							}
						}


						//满足条件方块左移
						if(e && e.keyCode==65 && left==0){
							x--;
						}

						//满足条件方块下移
						if(e && e.keyCode==83 && down==0){
							y++;
							begin();
						}
						//满足条件方块右移
						if(e && e.keyCode==68 && right==0){
							x++;
						}
						//立刻刷新界面
						begin();
					}; 
				}



				function begin(){

					//初始化计数
					count=0;
					OUT:
					//循环将方块加载到游戏界面中并检测游戏是否已经结束以及是否可以还可以下落
					for(i=0;i<old.length;i++){
						for(j=0;j<old[i].length;j++){
							//已经加载的方块小于四个
							if(count<4){
								//有方块
								if(old[i][j]==2){
									//检查最上层是否有已定方块或者当前加载方块的位置是否有已定方块
									for(k=0;k<game[k].length;k++){
										if(game[y+i][x+j]==1||game[0][k]==1){
											//游戏结束重开
											state=1;
											//弹出提示信息
											alert("Game Over");
											//退出循环至标记处
											break OUT;
										}
									}
									//方块下部有其他已定方块或者到底了
									if(game[y+i+1][x+j]==1||y+i==19){
										//不可下落
										down=1;
									}
									//计数+1
									count++;
									//将方块添加到游戏区域
									game[y+i][x+j]=2;
								}
							}else{
								//已经加载4个方块退出循环至标记处
								break OUT;
							}

						}
					}


					//不可下落
					if(down==1){
						//将当前方块变为已定方块
						for(i=0;i<old.length;i++){
							for(j=0;j<old[i].length;j++){
								//有方块
								if(old[i][j]==2){
									//变为已定方块
									game[y+i][x+j]=1;
								}
							}
						}

						initold();
						down=0;
					}



					//渲染--将方块渲染到游戏区域
					$('.game').html('');
					addgame(colorold);
					$('.next').html('');
					addnext(color);



				    //消除
				    OUTT:
				    //循环满足条件则消除
				    for(i=0;i<game.length;i++){
				    	//重置计数
				    	count=0;
				    	for(j=0;j<game[i].length;j++){
				    		//有一个已定方块
				    		if(game[i][j]==1){
				    			//计数+1
				    			count++;
				    		}
				    		//计数大于10--满足条件
				    		if(count>=10){
				    			//分数+1
				    			score++;
				    			//立即更新分数
				    			$('.score').text('当前得分：'+score);
				    			//删除数组中需要消除的行
				    			game.splice(i,1);
				    			//在数组头部添加一条新数据
				    			game.unshift([0,0,0,0,0,0,0,0,0,0]);
				    			//退出至标记处--好像不用退出
				    			//break OUTT;
				    		}
				    		
				    	}
				    }

				    //重置计数
				    count=0;
				    //清除游戏区域的方块
				    for(i=0;i<game.length;i++){
				    	for(j=0;j<game[i].length;j++){
				    		//清除方块小于4
				    		if(count<4){
				    			//有方块
				    			if(game[i][j]==2){
				    				//清除方块
				    				game[i][j]=0;
				    				//计数+1
				    				count++;
				    			}
				    		}
				    		
				    	}
				    }



				}
				//每0.01秒循环一次；
			},T);
}
//2018.1.7号下午+2018.1.8号下午    2018.1.8完结
});