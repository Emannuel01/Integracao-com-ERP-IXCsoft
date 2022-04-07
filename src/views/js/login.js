function authenticate(url) {
    let login = document.getElementById('login').value;
    let password = document.getElementById('passwd').value;
    var data = JSON.stringify({
        "login": login,
        "password": password
    });

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function() {
        if (this.readyState === 4) {
            console.log(this.responseText);
        }
    });

    xhr.open("GET", "http://localhost:3000/login");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send(data);
}