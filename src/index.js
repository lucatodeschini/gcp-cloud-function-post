const axios = require('axios')
const core = require('@actions/core');

const {getAuthConfigHeader} = require("./utils");

async function main() {
    const cloudFunctionUrl = core.getInput('cloud_function_url', { required: true });
    const jsonBody = core.getInput('json_body', { required: true });

    const config = await getAuthConfigHeader(cloudFunctionUrl,'key.json')

    const message = JSON.parse(jsonBody)

    axios.post(cloudFunctionUrl, message, config)
         .then((response) => {
             core.setOutput('result', JSON.stringify(response.data))
           }, (error) => {
             core.setOutput('result', 'HTTP POST FAILED')
           });
}

main()