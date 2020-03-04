import { Router } from 'express'

const router = Router()

router.get('/heads', async (_, res) => {
  // const db = await getDb()
  // const ethereumHeadRepository = getCustomRepository(
  //   EthereumHeadRepository,
  //   db.name,
  // )

  // const heads = await ethereumHeadRepository.all({})
  const heads = [{ hello: 'jb' }]
  console.log(heads)
  return res.send(JSON.stringify(heads))
})

router.get('/heads/:id', async (req, res) => {
  // const { id } = req.params
  // const db = await getDb()
  // const node = await db.getRepository(ChainlinkNode).findOne(id)
  // const uptime = await nodeUptime(db, node)
  // const jobCounts = await jobCountReport(db, node)

  // const data = {
  // id: node.id,
  // name: node.name,
  // url: node.url,
  // createdAt: node.createdAt,
  // jobCounts,
  // uptime,
  // }

  // const json = chainlinkNodeShowSerializer(data)
  // return res.send(json)
  const head = { hello: 'jb' }
  console.log(head)
  return res.send(JSON.stringify(head))
})

export default router
