import * as functions from 'firebase-functions';
import unfluff from 'unfluff'
import fetch from 'cross-fetch'
// const agent = new http.Agent({keepAlive: true});

exports.unroll = functions.https.onCall(async (data, context) => {
  const {url} = data;
  // const {uid} = context.auth;
  const result = await extract(url);
  return result;
})

const extract = async (url:string) => {
  const res = await fetch(url);
  const data = unfluff(await res.text())
  console.log(data)
  return data;
}