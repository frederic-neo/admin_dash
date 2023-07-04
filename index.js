const handler = async (event) => {
  const { req, res } = event

  // health check
  if (req.params.health === 'health') {
    res.write(JSON.stringify({ success: true, msg: 'Health check success', req }))
    res.end()
    return
  }

  // Add your code here

  res.write(JSON.stringify({ success: true, msg: `Happy Hacking23` }))
  res.end()
}

export default handler
