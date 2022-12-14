import { client } from "../client"

const stream = client.list()

let count = 0

stream.on('data', (data: any) => {
  console.log(`${++count} - ${JSON.stringify(data)}`)
});

stream.on('end', () => console.log('\nTask ended.'))
