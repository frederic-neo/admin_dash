import { shared, env } from '@appblocks/node-sdk'

const handler = async (event) => {
  const { req, res } = event

  // health check
  if (req.params.health === 'health') {
    res.write(JSON.stringify({ success: true, msg: 'Health check success', req }))
    res.end()
    return
  }

  // Add your code here

  console.log(req.body)
  res.write(JSON.stringify({ success: true, msg: `Happy Hacking24` }))
  res.end()
}

export default handler
