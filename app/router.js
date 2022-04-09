const { notFound, getRequest, getPart, getApp } = require('./controller')

const RULE_LIST = {
  '/app.js': getApp,
  '/:part': getPart,
  '/': getRequest,
  '*': notFound,
}

// 根据路由规则生成正则表达式
const genReq = (rule) => {
  let reg = ''
  if (rule.indexOf('/') > -1) {
    let regList = []
    rule.split('/').forEach(str => {
      regList.push(
        str === ''
          ? ''
          : str
              .replace(/\:(.*)/, '([^\\/]+?)')
              .replace('*', '\\*')
      )
    })
  } else {
    reg = '.*'
  }
  return new RegExp(reg)
}

const parse = (req, res) => {
  const path = req.url
  const [pathName, search = ''] = path.split('?')
  let pathParam = {}
  let searchParam = {}
  let body = ''
  req.on('data', chunk => {
    body += chunk
  })
  req.on('end', () => {
    search.split('&').forEach(str => {
      const [key, value = ''] = str.split('=')
      searchParam[key] = value
    })

    for (let rule in RULE_LIST) {
      const reg = genReq(rule)
      if (reg.test(pathName)) {
        rule.split('/').forEach((str, idx) => {
          if (str.indexOf(':') === 0) {
            pathParam[str.replace(':', '')] = pathName.split('/')[idx]
          }
        })
        let fn = RULE_LIST[rule] || function() { return true}
        let toContinue = fn({...req, body, pathParam, searchParam}, res)
        if (!toContinue) break
      }
    }
  })
}

module.exports = parse