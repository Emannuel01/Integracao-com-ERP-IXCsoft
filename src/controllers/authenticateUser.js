const { webservice } = require('./webservice');

const url = "https://suportessl.ixcsoft.com.br/webservice/v1";
const token = "Basic MTE4OmRjMzY5OTE2NmY4NmEwMjNlNmRlMGUxNDc3MWQxYTAyZGUyMmE0ZTU5MGMzMjA3YjcxYWQxOTc4MDRiYzIxNGI";

module.exports = {
    async authenticateUser(req, res) {
        const { login, password } = req.body;
        const data = JSON.stringify({
            "qtype": "cliente.ativo",
            "oper": "=",
            "query": "S",
            "pg": "1",
            "rp": "100",
            "sortname": "cliente.id",
            "sortorder": "desc",
            "grid_param": `[{\"TB\":\"cliente.hotsite_email\", \"OP\" : \"=\", \"P\" : \"${login}\"},{\"TB\":\"cliente.senha\", \"OP\" : \"=\", \"P\" : \"${password}\"}]`
        });

        const config = {
            method: 'post',
            url: `${url}/cliente`,
            headers: {
                'ixcsoft': 'listar',
                'Authorization': token,
                'Content-Type': 'application/json'
            },
            data: data
        };
        const response = await webservice(config);
        try {
            console.log(login);
            if (response.total > 0) {
                return res.status(200).json({
                    authenticated: true,
                    id_client: response.registros[0].id
                });
            } else {
                return res.status(200).json({
                    authenticated: false
                });
            }
        } catch (err) {
            console.log(err);
            return res.status(500).json({ mensage: err });
        }
    }
}