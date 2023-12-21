import express from 'express'
import cors from 'cors'
import compress from 'compression'

const PORT = process.env.PORT ?? 7282
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(compress())
app.use(express.static('public'))
app.use(express.static('dist'))

app.use('/', (req, res) => {
  res.send('Hello, world!')
  console.log('foo')
})

app
  .listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
  })
  .on('error', (error: Error & { code?: string }) => {
    const isPipe = (portOrPipe: number | string) => Number.isNaN(portOrPipe)
    const bind = isPipe(PORT) ? `Pipe ${PORT}` : `Port ${PORT}`
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges')
        process.exit(1)
        break
      case 'EADDRINUSE':
        console.error(bind + ' is already in use')
        process.exit(1)
        break
      default:
        throw error
    }
  })
