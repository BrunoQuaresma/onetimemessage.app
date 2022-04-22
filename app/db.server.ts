import { Client, values } from "faunadb";

export type Doc<TData> = {
  ref: values.Ref,
  data: TData
}

const secret = process.env.FAUNADB_SECRET

if (!secret) {
  throw new Error("FAUNADB_SECRET env var not defined")
}

export const db = new Client({ secret })