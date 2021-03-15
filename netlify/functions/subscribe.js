const https = require('https')

exports.handler = async function(event, context) {
    const { email } = JSON.parse(event.body)

    const data = {
        email: email,
        oid: "00D1U00000110AJ"
    }

    const options = {
        hostname: 'webto.salesforce.com',
        port: 443,
        path: '/servlet/servlet.WebToLead?encoding=UTF-8',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length
        }
    }
    
    const req = https.request(options, res => {
        console.log(`statusCode: ${res.statusCode}`)
        
        res.on('data', d => {
            process.stdout.write(d)
        })
    })
    
    req.on('error', error => {
        console.error(error)
    })
    
    req.write(data)
    req.end()
}