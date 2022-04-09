const http = require('http')
const router = require('./router')

http.createServer(router)
.listen(80, () => console.log('Listen on 80'))

