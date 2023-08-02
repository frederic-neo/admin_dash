import { shared } from '@appblocks/node-sdk'

const admin_be_newsLettersAddedList = async ({ req, res }) => {
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
    const { start_date, end_date, name_filter, status, order_by = 'created_at', order = 'desc' } = requestBody

    // const newsLettersAddedQuery = `select * from getDailyNewsLettersAdded('${start_date}', '${end_date}','${name_filter}')`
    // const newsLettersAdded = await prisma.$queryRawUnsafe(newsLettersAddedQuery)
    // const replacer = (key, value) => (typeof value === 'bigint' ? value.toString() : value)
    // const newsLettersAddedFormatted = JSON.stringify(newsLettersAdded, replacer)

    const records = await prisma.leads.findMany({
      where: {
        AND: [
          {
            created_at: {
              gte: new Date(start_date),
              lte: new Date(end_date),
            },
          },
          name_filter
            ? {
                email: {
                  contains: name_filter,
                },
              }
            : {},
          status && {
            status,
          },
        ],
      },
      orderBy: {
        [order_by]: order,
      },
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

export default admin_be_newsLettersAddedList
