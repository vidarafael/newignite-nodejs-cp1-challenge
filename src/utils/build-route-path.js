import url from "node:url"

export function buildRoutePath(path) {
  return url.parse(path, true).query
}
