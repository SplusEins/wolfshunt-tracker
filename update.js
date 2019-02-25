const axios = require('axios')
const { promisify } = require('util')
const fs = require('fs')

const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

const dbpath = 'data.json'

async function main() {
  const data = JSON.parse(await readFile(dbpath))
  const response = await axios.get('https://api.scavengerhunt-app.de/hunts/77/ranking')
  const timestamp = new Date().toISOString()
  const leaderboard = response.data.ranking.filter((team, index, teams) => teams.indexOf(team) == index)
  leaderboard.forEach((team, rank) => data.push({ team, rank, timestamp }))
  await writeFile(dbpath, JSON.stringify(data))
}

main().catch(console.error)