var ws; // 创建socket对象
var errorCount = 0;  // 连接错误次数
var isConnected = false;  // 连接状态
const maxError = 5;  // 最大连接错误次数
var isLogin = false;
var userName = "Default";

var Cookie = document.cookie

if (Cookie == "") {
    alert("Have not login !")
} else {
    isLogin = true
    userName = Cookie.split("=")[1]
}

if(isLogin == true) {
    var ws = new WebSocket("ws://0.0.0.0:8080/socket");  // 添加连接状态 
    connect();  
}

function connect(){
    ws.onopen = function(evt) {  
        alert("连接成功！")
    };  
    //接收到消息时触发  
    ws.onmessage = function(evt) {  
        console.log(evt.data)
        outputMessage(getNowTime() + " 收到消息- " + " " + evt.data);  
    };  
    //连接关闭时触发  
    ws.onclose = function(evt) {  
        console.log("Connection closed.");  
        alert("连接断开")
    };  
}

function outputMessage(message){
    var element = $("<div class='message'> <p class='username'>" + userName + " : </p> <p class='text'>" + " " + message + "</p> </div>");
    $(".messages").prepend(element);
}

$("#logout-button").click(function(){
    if(isConnected){
        ws.close()
        isConnected = false
    }
    window.location.href = "/logout";
})

$("#login-button").click(function(){
    window.location.href = "/login-page"
})

$("#send-button").click(function(){
    if(!isLogin){
        alert("Have not login !")
        return
    }
    var to_object = $("#send-object").val();
    var content  = $("#send-content").val();
    if(to_object === "" || to_object === "all" || to_object === "All"){
        outputMessage(getNowTime() + ' 发送消息- '+ content + " to all");
        emit_content = "all|" + userName + "|" + content;
        ws.send(emit_content) 
    } else {
        outputMessage(getNowTime() + ' 发送消息- '+ content + " (私聊) " + " to " + to_object)
        emit_content = to_object + "|" + userName + "|" + content + " (私聊)"
        ws.send(emit_content)
    }
})

function getNowTime(){
    var date=new Date();   
    var year= date.getFullYear(); //获取当前年份   
    var mon= String(date.getMonth()+1).padStart(2,"0"); //获取当前月份   
    var da= String(date.getDate()).padStart(2,"0"); //获取当前日     
    var h= String(date.getHours()).padStart(2,"0"); //获取小时   
    var m= String(date.getMinutes()).padStart(2,"0"); //获取分钟   
    var s= String(date.getSeconds()).padStart(2,"0"); //获取秒  
    var date = year+'/'+mon+'/'+da+' '+h+':'+m+':'+s;  
    return date;
}

window.onunload = function() {
    if (isConnected) {
        ws.close()
    } 
}
