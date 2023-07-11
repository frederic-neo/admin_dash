import prisma from './utils/prisma.js'

const replacer = (key, value) => (typeof value === 'bigint' ? value.toString() : value)

async function main() {
  console.log('first3')
  const gcCountQuery = `select * from getDailyNewsLettersAdded('2022-05-01'::timestamp with time zone ,'2023-06-30'::timestamp with time zone,'')`
  const gcList = await prisma.$queryRawUnsafe(gcCountQuery)
  console.log(JSON.stringify(gcList, replacer))
  //   console.log('GC count:', JSON.stringify(gcList, null, ' '))
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
