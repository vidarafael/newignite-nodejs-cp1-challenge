import http from "node:http"
import { routes } from "./routes/index.js"
import { handleBody } from "./middleware/handleBody.js"
import { getParamsInRoute } from "./middleware/getParamsInRoute.js"

const server = http.createServer(async (req, res) => {
  const { url, method } = getParamsInRoute(req, routes)

  await handleBody(req)

  const route = routes.find((route) => route.method === method && route.path.includes(url))

  if (route) {
    res.setHeader('Content-Type', 'application/json')
    
    return route.handler(req, res)
  }

  res.end("Internal error server")
})

server.listen(3333, () => {
  console.log("Server Started")
})
