const axios = require('axios')
const { promisify } = require('util')
const fs = require('fs')

const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

const dbpath = 'data.json'

async function main() {
  const data = JSON.parse(await readFile(dbpath))
  const response = await axios.get('https://api.scavengerhunt-app.de/v2.0/hunts/77/ranking')
  const timestamp = new Date().toISOString()
  const leaderboard = response.data.ranking;
  leaderboard.forEach(({ name, id, progress }) => data.push({ name, id, progress, timestamp }))
  await writeFile(dbpath, JSON.stringify(data))
}

main().catch(console.error)