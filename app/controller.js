const http = require('http')

let ctrl = {}

ctrl.getRequest = (req, res) => {
  const { url, method, headers, body } = req
  res.setHeader('Content-Type', 'application/json')
  res.writeHeader(200, 'Good')
  res.write(JSON.stringify({
    url,
    method,
    headers,
    body
  }))
  res.end()
}

ctrl.getPart = (req, res) => {
  const { url, method, headers, body } = req
  res.setHeader('Content-Type', 'application/json')
  switch(req.pathParam.part) {
    case 'url':
      res.end(JSON.stringify({
        url
      }))
    case 'headers':
      res.end(JSON.stringify({
        headers
      }))
    case 'body':
      res.end(JSON.stringify({
        body
      }))
    default:
      return true
  }
  res.end()
}

ctrl.notFound = (req, res) => {
  res.writeHeader(404, 'not found')
  res.end()
}

module.exports = ctrl