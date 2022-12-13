import { loadPackageDefinition, credentials } from "@grpc/grpc-js"
import { loadSync } from "@grpc/proto-loader"
import { join } from "path"

const packageDefinition = loadSync(join(__dirname, "../src/protos/card.proto"))
const proto = loadPackageDefinition(packageDefinition) as any

export const client = new proto.CardService(
  "localhost:50051",
  credentials.createInsecure()
)
