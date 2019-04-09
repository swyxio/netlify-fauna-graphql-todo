const fetch = require("node-fetch")
exports.handler = async function(event, context) {
  const b64encodedSecret = Buffer.from(
    process.env.FAUNADB_SERVER_SECRET + ":" // weird but they
  ).toString("base64")
  const headers = { Authorization: `Basic ${b64encodedSecret}` }
  const qsp = event.queryStringParameters
  console.log({ qsp })
  await fetch("/.netlify/functions/fauna-graphql", {
    headers
  }).then(x => console.log({x}))
  .catch(err => console.log({err}))
  return {
    statusCode: 200
    body: JSON.stringify('hi')
  }
}
