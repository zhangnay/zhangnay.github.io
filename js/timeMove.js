setInterval(()=>{
    date = new Date()
    h = date.getHours()
    m = date.getMinutes()
    s = date.getSeconds()

    tag = h<12?'上午':'下午'
    h = h<10?'0'+h:h
    m = m<10?'0'+m:m
    s = s<10?'0'+s:s

    TextTime = h+':'+m+':'+s+' <span>'+tag+'</span>' 
    $('.timeText').html(TextTime)
    // console.log(TextTime)
},1000)