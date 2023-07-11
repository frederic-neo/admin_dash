import { shared } from '@appblocks/node-sdk'

const admin_be_spacesCreatedList = async ({ req, res }) => {
  const { sendResponse, getBody, httpStatusCodes, prisma, validateRequestMethod, authenticateUser, checkHealth } =
  await shared.getShared()

  try {
    validateRequestMethod(req, ['GET'])
    // health check
    if (checkHealth(req, res)) return

    // checks authenticated user
    // const authenticatedUser = await authenticateUser(req)
    // if (authenticatedUser.status === 401) {
    //   return sendResponse(res, httpStatusCodes.Unauthorized, {
    //     message: 'Unauthorized',
    //   })
    // }

    const requestBody = await getBody(req)
    const { start_date, end_date, name_filter } = requestBody
    
    const spacesCreatedQuery = `select * from getDailySpacesCreated('${start_date}', '${end_date}','${name_filter}')`
    const spacesCreated = await prisma.$queryRawUnsafe(spacesCreatedQuery)
    const replacer = (key, value) => (typeof value === 'bigint' ? value.toString() : value)
    const spacesCreatedFormatted = JSON.stringify(spacesCreated, replacer)

    sendResponse(res, 200, {
      data: JSON.parse(spacesCreatedFormatted),
      message: httpStatusCodes[200],
    })
  } catch (e) {
    console.log('error:', JSON.stringify(e), e)
    const errorCode = e.errorCode || 500
    sendResponse(res, errorCode, {
      message: httpStatusCodes[errorCode],
    })
  }
}

export default admin_be_spacesCreatedList