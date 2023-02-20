import { getQueryParams } from "../utils/getQueryParams.js"

function getParamsInRoute(req, routes) {
  const { url, method } = req;
  getQueryParams(url, req);

  let matchedPath = url;

  for (const { path: routePath, method: routeMethod } of routes) {
    const paths = routePath.split('/');
    const paramIndexes = paths
      .map((path, index) => (path.startsWith(':') ? index : null))
      .filter((index) => index !== null);

    const requestUrlSplit = url.split('/');

    if (requestUrlSplit.length === paths.length && method === routeMethod) {
      const params = {};
      paramIndexes.forEach((paramIndex) => {
        const paramName = paths[paramIndex].substring(1);
        const paramValue = requestUrlSplit[paramIndex];
        params[paramName] = paramValue;
      });

      req.params = { ...params };
      matchedPath = routePath;
      break;
    }
  }

  return { url: matchedPath, method };
}

export { getParamsInRoute }