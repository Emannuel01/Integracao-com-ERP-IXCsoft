async function authenticate() {
    let login = document.getElementById('login').value;
    let password = document.getElementById('passwd').value;
    if (login == "" || password == "") {
        return;
    }

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
        "login": `${login}`,
        "password": `${password}`
    });

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    let response = await fetch("/login", requestOptions).then(result => result.json());
    if (response.authenticated) {
        validateReturn(response);
        return;
    }
    return;
}

function validateReturn(data) {
    window.sessionStorage.setItem('user', `${data.client}`);
    window.sessionStorage.setItem('id_user', `${data.id_client}`);
    window.location.replace("/app/sistema");
}

document.addEventListener('keypress', (e) => {
    if (e.key == "Enter") {
        authenticate()
    }
}, false);