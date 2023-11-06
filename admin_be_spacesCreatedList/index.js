import { shared } from '@appblocks/node-sdk'

const admin_be_spacesCreatedList = async ({ req, res }) => {
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
      order_by = 'created_at',
      order = 'desc',
      offset = 0, // Default to page 1
      page_limit = 10, // Default to 10 items per page
    } = requestBody

    const records = await prisma.spaces.findMany({
      where: {
        ...(name_filter && {
          name: {
            contains: name_filter.toLowerCase(),
          },
        }),
        // name_filter
        //   ? {
        //       name: {
        //         contains: name_filter,
        //       },
        //     }
        //   : {},
        AND: [
          start_date &&
            end_date && {
              created_at: {
                gte: start_date,
                lte: end_date,
              },
            },
        ],
      },
      orderBy: {
        [order_by]: order,
      },
      skip: offset, // Skip the specified number of records
      take: page_limit, // Take only the specified number of records
    })

    const totalNoOfSpaces = await prisma.spaces.count()

    // Fetch the total count of spaces based on the same filter criteria
    const spaceCount = await prisma.spaces.count({
      where: {
        ...(name_filter && {
          name: {
            contains: name_filter.toLowerCase(),
          },
        }),
        // name_filter
        //   ? {
        //       name: {
        //         contains: name_filter,
        //       },
        //     }
        //   : {},
        AND: [
          start_date &&
            end_date && {
              created_at: {
                gte: start_date,
                lte: end_date,
              },
            },
        ],
      },
    })

    sendResponse(res, 200, {
      data: { totalNoOfSpaces, spaceCount, spaceData: records },
      message: httpStatusCodes[200],
    })

    // const spacesCreatedQuery = `select * from getDailySpacesCreated('${start_date}', '${end_date}','${name_filter}')`
    // const spacesCreated = await prisma.$queryRawUnsafe(spacesCreatedQuery)
    // const replacer = (key, value) => (typeof value === 'bigint' ? value.toString() : value)
    // const spacesCreatedFormatted = JSON.stringify(spacesCreated, replacer)

    // sendResponse(res, 200, {
    //   data: JSON.parse(spacesCreatedFormatted),
    //   message: httpStatusCodes[200],
    // })
  } catch (e) {
    console.log('error:', JSON.stringify(e), e)
    const errorCode = e.errorCode || 500
    sendResponse(res, errorCode, {
      message: httpStatusCodes[errorCode],
    })
  }
}

export default admin_be_spacesCreatedList
