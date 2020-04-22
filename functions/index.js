const functions = require('firebase-functions')
const unfluff = require('unfluff')
const fetch = require('cross-fetch')

// const agent = new http.Agent({keepAlive: true});

exports.unroll = functions.https.onCall(async (data, context) => {
  const {url} = data;
  // const {uid} = context.auth;
  const result = await extract(url);
  return result;
})

const extract = async (url) => {
  const res = await fetch(url);
  const data = unfluff(await res.text())
  console.log(data)
  return data;
}
