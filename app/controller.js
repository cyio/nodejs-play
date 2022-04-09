const fs = require('fs')
const http = require('http')

const control = {}

control.getRequest = (req, res) => {
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

control.getPart = (req, res) => {
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

control.notFound = (req, res) => {
  res.writeHeader(404, 'not found')
  res.end()
}

control.getApp = (req, res) => {
  const { url, method, headers, body } = req
  res.setHeader('Content-Type', 'text/javascript')
  fs.readFile('./app/app.js', (err, buf) => {
    if (err) throw err
    res.end(buf)
  })
}

module.exports = control
