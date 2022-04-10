const { webservice } = require('../webservice/webserviceClient');

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
            url: `${process.env.APP_URL}/cliente`,
            headers: {
                'ixcsoft': 'listar',
                'Authorization': process.env.SECRET_API,
                'Content-Type': 'application/json'
            },
            data: data
        };
        const response = await webservice(config);
        try {
            if (response.total > 0) {
                return res.status(200).json({
                    authenticated: true,
                    id_client: response.registros[0].id,
                    client: response.registros[0].razao
                });
            }
            return res.status(200).json({
                authenticated: false
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ mensage: err });
        }
    }
}