$(function(){
    		//数据
    		var list=[ 
    		[ "CUPFOX","CUPFOX.png","www.cupfox.com/","1"], 
    		[ "echo","echo.jpg","app-echo.com","1"], 
    		[ "芒果TV","芒果TV.jpg","www.mgtv.com/","1"],
    		[ "腾讯视频","腾讯视频.jpg","v.qq.com/?ptag=qqbrowser","1"],
    		[ "淘宝","淘宝.png","taobao.com","1"],
    		[ "百度","百度.png","baidu.com","1"],
    		[ "音悦台","音悦台.png","yinyuetai.com","1"],
    		[ "a站","a站.png","www.acfun.cn","1"],
    		[ "b站","b站.jpg","bilibili.com","1"],
    		[ "百度云","百度云.jpg","pan.baidu.com/disk/home#list/path=%2F","1"],
    		[ "贴吧","贴吧.png","tieba.baidu.com","1"],
    		[ "百度传课","百度传课.png","chuanke.com","1"],
    		[ "网易云课堂","网易云课堂.png","study.163.com","1"],
    		[ "runoob","runoob.jpg","runoob.com","1"],
    		[ "Bootstrap","Bootstrap.png","bootcss.com","1"],
    		[ "百度翻译","百度翻译.png","fanyi.baidu.com/translate","1"],
    		[ "Jquery插件","jquery.png","jq22.com","1"],
    		[ "知乎","知乎.png","zhihu.com","1"],
    		[ "素材中国","素材中国.jpg","sccnn.com","1"],
    		[ "爱奇艺","爱奇艺.jpg","iqiyi.com","1"],
    		[ "Neets","neets.png","neets.cc","1"],
            [ "腾讯课堂","腾讯课堂.jpg","ke.qq.com/","1"],
            [ "百度云","百度云.png","cloud.baidu.com/","1"],
            [ "慕课网","慕课网.jpg","imooc.com/","1"],
            [ "牛客网","牛客网.jpg","www.nowcoder.com/3002767","1"],
            [ "leetcode","leetcode.png","leetcode.com/","1"],
            [ "github","github.png","github.com/","1"],

            [ "cc1","cc.jpg","cclolcc.com","1"], 
            [ "小程序开发","小程序.jpg","mp.weixin.qq.com/debug/wxadoc/dev/devtools/new.html","1"],
            [ "智慧树","智慧树.png","zhihuishu.com","1"],
            [ "凡科","凡科.jpg","www.faisco.cn/portal.jsp/","1"],
            [ "58","58.jpg","cq.58.com/","1"],
            [ "汇博","汇博.jpg","www.huibo.com/","1"],
            [ "方块流星雨","腾讯课堂.jpg","方块流星雨.html","0"],
            [ "电子时钟","腾讯课堂.jpg","time.html","0"],
            [ "华为时钟","腾讯课堂.jpg","华为时钟.html","0"],
            [ "jump","腾讯课堂.jpg","jump.html","0"],
            [ "俄罗斯方块","俄.png","block.html","0"],
            [ "欢迎页","腾讯课堂.jpg","welcome.html","0"]
            ] 

            //初始化页数
            var pages=1;var maxpage=list.length;
            //每页加载数量
            var num=27;

            //根据list添加各个网站的按钮到页面中
            add(pages,maxpage,list,num);

            $(".pages-left").click(function(){
                pages--;
                $(".pages-left").css('width','150px');
                $(".pages-right").css('width','70px');
                jugde();
            });
            $(".pages-right").click(function(){
                pages++;
                $(".pages-right").css('width','150px');
                $(".pages-left").css('width','70px');
                jugde();
            });

            function  jugde(){
                if(pages==1){
                    $('.pages-left').addClass('hide');
                    $('.pages-right').css('width','150px');
                }
                if(pages>1){
                    $('.pages-left').removeClass('hide');
                }
                if(pages<Math.ceil(maxpage/num)){
                    $('.pages-right').removeClass('hide');
                }
                if(pages==Math.ceil(maxpage/num)){
                    $('.pages-right').addClass('hide');
                    $('.pages-left').css('width','150px');
                }
                $('#main').html("");
                add(pages,maxpage,list,num);
            }

        });

function add(p,m,list,n){
    var http;
    for (var i = (p-1)*n; i < p*n; i++) {
        if(i<m){
            if(list[i][3]==0){
                http='';
            }else{
                http='http://';
            }
            $('#main').append('<a href="'+http+list[i][2]+
                '" target="_blank"><div class="dh"><div class="img"><img src="img/导航/'+list[i][1]+'" /></div><div class="name"><p>'+
                list[i][0]+'</p></div</div></a>');
        }
    }
}


