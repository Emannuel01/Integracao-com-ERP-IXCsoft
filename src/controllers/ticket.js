const { webservice } = require('./webservice');

const url = "https://suportessl.ixcsoft.com.br/webservice/v1";
const token = "Basic MTE4OmRjMzY5OTE2NmY4NmEwMjNlNmRlMGUxNDc3MWQxYTAyZGUyMmE0ZTU5MGMzMjA3YjcxYWQxOTc4MDRiYzIxNGI";

module.exports = {
    async getTicket(req, res) {
        const { id_client } = req.body;
        const data = JSON.stringify({
            "qtype": "su_ticket.id_cliente",
            "oper": "=",
            "query": id_client,
            "pg": "1",
            "rp": "100",
            "sortname": "su_ticket.id",
            "sortorder": "desc",
        });

        const config = {
            method: 'post',
            url: `${url}/fn_areceber`,
            headers: {
                'ixcsoft': 'listar',
                'Authorization': token,
                'Content-Type': 'application/json'
            },
            data: data
        };
        const response = await webservice(config);
        try {
            if (response) {
                return res.status(200).json({
                    type: "sucesso",
                    data: response
                });
            } else {
                return res.status(200).json({
                    type: "error",
                    data: "dados invalidados"
                });
            }
        } catch (err) {
            console.log(err);
            return res.status(500).json({ mensage: err });
        }
    }
}