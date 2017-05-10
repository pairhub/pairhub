const express = require('express')
const next = require('next')

const proxy = require('http-proxy-middleware')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const API_HOST = process.env.NODE_ENV !== 'production' ? 'http://localhost:3010' : 'http://api.pairhub.io'
const apiProxy = proxy({ target: API_HOST, changeOrigin: true })

app.prepare()
.then(() => {
  const server = express()

  server.get('/a', (req, res) => {
    return app.render(req, res, '/b', req.query)
  })

  server.get('/b', (req, res) => {
    return app.render(req, res, '/a', req.query)
  })

  server.use('/graphql', apiProxy)
  server.use('/graphiql', apiProxy)
  server.use('/login', apiProxy)
  server.use('/logout', apiProxy)

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
