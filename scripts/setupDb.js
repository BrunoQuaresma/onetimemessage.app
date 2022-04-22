require('dotenv').config()
const { Client, If, Collection, Exists, CreateCollection } = require("faunadb")

const secret = process.env.FAUNADB_SECRET

if (!secret) {
  throw new Error("FAUNADB_SECRET env var not defined")
}

const db = new Client({ secret })

const setup = async () => {
  await db.query(
    If(Exists(Collection("messages")), false, CreateCollection({ name: "messages", ttl: 2 }))
  )
}

setup()