import { shared } from '@appblocks/node-sdk'

const admin_be_newsLettersAddedList = async ({ req, res }) => {
  const { sendResponse, getBody, httpStatusCodes, prisma, validateRequestMethod, authenticateUser, checkHealth } =
    await shared.getShared()

  try {
    validateRequestMethod(req, ['POST'])
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
    const {
      start_date,
      end_date,
      name_filter,
      status,
      order_by = 'created_at',
      order = 'desc',
      page = 1,
      page_limit = 10,
    } = requestBody

    const skip = (page - 1) * page_limit

    const filters = [
      (start_date || end_date) && {
        created_at: {
          ...(start_date && { gte: new Date(start_date) }),
          ...(end_date && { lte: new Date(end_date) }),
        },
      },
    ]

    if (status) {
      filters.push({ status })
    }

    if (name_filter) {
      filters.push({ email: { contains: name_filter } })
    }

    const query = () => ({
      where: {
        AND: filters,
      },
      orderBy: { [order_by]: order },
    })
    const records = await prisma.leads.findMany({ ...query(), skip, take: page_limit })
    const totalCount = await prisma.leads.count(query())

    sendResponse(res, 200, {
      data: records,
      total_count: totalCount,
      page,
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

// const newsLettersAddedQuery = `select * from getDailyNewsLettersAdded('${start_date}', '${end_date}','${name_filter}')`
// const newsLettersAdded = await prisma.$queryRawUnsafe(newsLettersAddedQuery)
// const replacer = (key, value) => (typeof value === 'bigint' ? value.toString() : value)
// const newsLettersAddedFormatted = JSON.stringify(newsLettersAdded, replacer)
