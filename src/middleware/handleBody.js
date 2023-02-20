async function handleBody(req) {
  const buffer = []

  let data = ''
  for await (const chunk of req) {
    data += chunk
    buffer.push(chunk)
  }

  if (req.url === "/tasks/csv") {
    req.body = data
    return
  }
  
  try {
    req.body = JSON.parse(Buffer.concat(buffer).toString())
  } catch (error) {
    req.body = null
  }
}

export { handleBody }