const axios = require('axios')
const core = require('@actions/core');

const {getAuthConfigHeader} = require("./utils");

async function main() {
    const cloudFunctionUrl = core.getInput('cloud_function_url', { required: true });
    const jsonBody = core.getInput('json_body', { required: false });
    const keyValue = core.getInput('key_value', { required: false });

    const config = await getAuthConfigHeader(cloudFunctionUrl,'key.json')

    let message = {}
    if(jsonBody){
        message = JSON.parse(jsonBody)
    }else{
        let input = keyValue.replace(/(\r\n|\n|\r)/gm, "");
        message = JSON.parse('{"' + input.replace(/,/g, '", "').replace(/=/g, '": "') + '"}');
        core.setOutput('parsed_input', message)
    }

    axios.post(cloudFunctionUrl, message, config)
         .then((response) => {
             core.setOutput('result', JSON.stringify(response.data))
           }, (error) => {
             core.setOutput('result', 'HTTP POST FAILED')
           });
}

main()