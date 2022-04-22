import { Client } from "faunadb";

const secret = process.env.FAUNADB_SECRET

if (!secret) {
  throw new Error("FAUNADB_SECRET env var not defined")
}

export const faunadb = new Client({ secret })