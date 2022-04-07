const axios = require('axios');

async function webservice(config) {
    const resp = await axios(config);
    return resp.data;
}

module.exports = { webservice };