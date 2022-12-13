import { client } from "../client"

const call = client.update()

call.write({ id: "1", companyId: "1", name: "Tools", category: "Purple" })

call.on("data", (data: any) => {
  console.log('Updating card for the first time...', data)

  if (data.status === "UPDATED") {
    console.log('Updating card for the second time...', data)

    call.write({ id: "1", companyId: "1", name: "Tools", category: "Brown" })

    call.end()
  }
})
