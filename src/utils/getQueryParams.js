import { buildRoutePath } from "./build-route-path.js"

function getQueryParams(url, req) {
  const verifyIfExistsQueryParamsInRoute = url.split("?")
  
  if (verifyIfExistsQueryParamsInRoute.length > 1) {
    const queryParams = buildRoutePath(url)

    req.query = { ...queryParams }
  }
}

export { getQueryParams }