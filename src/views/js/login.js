async function authenticate() {
    let login = document.getElementById('login').value;
    let password = document.getElementById('passwd').value;

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
    let data = await fetch("http://localhost:3000/login", requestOptions).then(result => result.json());
    validateReturn(data);
    return;
}

async function validateReturn(data) {
    if (data.authenticated) {
        window.sessionStorage.setItem('user', `${data.client}`);
        window.sessionStorage.setItem('id_user', `${data.id_client}`);
        window.location.replace("file:///home/ixcsoft/Documentos/ProjetoApp/src/views/sistema.html");

    }
}