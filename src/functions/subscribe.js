// import fetch from "node-fetch";
const fetch = require('node-fetch')

const API_ENDPOINT =
  'https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8'

const encode = data => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')
}

export async function handler(event) {
  const { email } = JSON.parse(event.body)

  const data = encode({
    email: email,
    oid: process.env.SALESFORCE_OID,
  })

  return fetch(API_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': data.length,
    },
    body: data,
  })
    .then(response => response.text())
    .then(data => ({
      statusCode: 200,
      body: data,
    }))
    .catch(error => ({ statusCode: 422, body: String(error) }))
}
