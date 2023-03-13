var btn = document.getElementById("login-button")
btn.onclick = function(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/login-success", true);
    xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        window.location.href = "login-success";
    }
    };
    xhr.send();
}