import { client } from "../client"

const ids = [1, 3]

let call = client.remove((err: any, response: any) => {
  if (err) throw err
  console.log("client -> response", JSON.stringify(response))
})


ids.forEach((id) => {
  call.write({ id })
})

call.end()
