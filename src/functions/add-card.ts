import { client } from "../client"

client.add({
    id: "4",
    companyId: "3",
    name: "Marketing",
    category: "Orange",
  },
  (error: any, data: any) => {
    if (error) {
      console.error({ error })
    } else {
      console.log(JSON.stringify(data))
    }
  }
)
