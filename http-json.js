const http = require('http')

http.createServer((req, res) => {
  const { url, method, headers } = req
  const header = JSON.stringify(headers, null, 2)
  let body = ''
  req.on('data', chunk => {
    body += chunk
    // chunk: Buffer
  })
  // body 是异步数据，需在 end 事件后才能拿到
  req.on('end', () => {
    res.setHeader('Content-Type', 'application/json')
    res.writeHeader(200, 'Good')
    res.write(JSON.stringify({
      url,
      method,
      header,
      body
    }))
    res.end()
  })
})
.listen(80, () => console.log('Listen on 80'))

