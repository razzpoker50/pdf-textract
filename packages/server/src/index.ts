import express from "express"

import Formidable from "formidable"

import fs from "fs"

import { s3Upload, documentExtract } from "./utils"

require("dotenv").config()

const app = express()
const port = process.env.PORT || 3005

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" })
})

app.post("/upload", (req, res, next) => {
  // Upload logic
  const form = new Formidable.IncomingForm()

  form.parse(req, async (err, fields, files) => {
    try {
      if (err) {
        console.error(err)
      }

      const file = files.File

      const fileContent = fs.readFileSync(file.path)

      const s3Params = {
        Bucket: process.env.AWS_BUCKET,
        Key: `${Date.now().toString()}-${file.name}`,
        Body: fileContent,
        ContentType: file.type,
        ACL: "public-read"
      }

      const s3Content: any = await s3Upload(s3Params)

      const textractData = await documentExtract(s3Content.Key)

      console.log(textractData)
    } catch (e) {
      console.log("error", e)
    }
  })
})

app.listen(port, () => {
  return console.log(`server is listening on ${port}`)
})
