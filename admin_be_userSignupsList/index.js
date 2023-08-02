import { shared } from '@appblocks/node-sdk'

const admin_be_userSignupsList = async ({ req, res }) => {
  const { sendResponse, getBody, httpStatusCodes, prisma, validateRequestMethod, authenticateUser, checkHealth } =
    await shared.getShared()

  try {
    validateRequestMethod(req, ['GET'])
    // health check
    if (checkHealth(req, res)) return

    console.log(req.test)

    // checks authenticated user
    // const authenticatedUser = await authenticateUser(req)
    // if (authenticatedUser.status === 401) {
    //   return sendResponse(res, httpStatusCodes.Unauthorized, {
    //     message: 'Unauthorized',
    //   })
    // }

    const requestBody = await getBody(req)
    const { start_date, end_date, name_filter, email_verified } = requestBody

    const filters = {
      AND: [
        {
          created_at: {
            gte: new Date(start_date),
            lte: new Date(end_date),
          },
        },
        name_filter && {
          OR: [
            { email: { contains: name_filter } },
            { user_name: { contains: name_filter } },
            { full_name: { contains: name_filter } },
          ],
        },
        email_verified && { email_verified: { equals: email_verified } },
      ].filter(Boolean),
    }

    const selectedFields = {
      email: true,
      user_name: true,
      full_name: true,
      email_verified: true,
      created_at: true,
    }

    const records = await prisma.users.findMany({
      where: filters,
      select: selectedFields,
    })

    console.log('records', records)

    sendResponse(res, 200, {
      data: records,
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

export default admin_be_userSignupsList
