window.addEventListener("load", () => {
    if (!sessionStorage.getItem("user")) {
        window.location.replace("/app/login");
    }
    getFinan();
    let userName = document.getElementById("name-user");
    userName.innerText = sessionStorage.getItem("user");
});
async function getFinan() {
    let idCliente = sessionStorage.getItem('id_user');

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
        "id_client": `${idCliente}`
    });

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    let response = await fetch("/finan", requestOptions).then(result => result.json());
    assembleModalFinan(response.data);
    return;
}
async function assembleModalFinan(data) {
    let dados = document.querySelector("tbody");
    data.forEach(element => {
        let tr = createTag("tr");
        let tdStatus = createTag("td");
        let tdTime = createTag("td");
        let tdExpiry = createTag("td");
        let tdValue = createTag("td");
        let tdAction = createTag("td");

        tdStatus.textContent = element.status;
        tdTime.textContent = element.obs;
        tdExpiry.textContent = element.data_vencimento;
        tdValue.textContent = element.valor;
        tdAction.innerHTML = `<button class="fas fa-edit print-file" onclick=printFinan(${element.id})></button>`;

        tr.appendChild(tdStatus);
        tr.appendChild(tdTime);
        tr.appendChild(tdExpiry);
        tr.appendChild(tdValue);
        tr.appendChild(tdAction);
        dados.appendChild(tr);
    });
}

function createTag(tag) {
    return document.createElement(tag)
}

async function getFileFinan(id) {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
        "id_finan": `${id}`
    });

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    let response = await fetch("/finan_file", requestOptions).then(result => result.json());
    if (response.type == 'sucesso') {
        return true;
    }
    return false;
}

function closeModalPdf() {
    document.querySelector(".container-pdf").style.display = "none";
    document.querySelector(".container-body").style.display = "block"
    return;
}

async function printFinan(id) {
    let generatedThePdf = await getFileFinan(id);
    if (generatedThePdf == true) {
        document.querySelector(".container-pdf").style.display = "block";
        document.querySelector(".container-body").style.display = "none";
        document.getElementById('container-pdf').innerHTML = "<object data='/filePdf' contentType='application/pdf'></object>";
        return;
    }
    return;
}