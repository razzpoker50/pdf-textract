import AWS from "aws-sdk"

AWS.config.update({ region: process.env.AWS_REGION })

export async function s3Upload(params) {
  const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
  })

  return new Promise(resolve => {
    try {
      s3.upload(params, (err, data) => {
        if (err) {
          console.error("error validating", err)
          resolve(err)
        } else {
          resolve(data)
        }
      })
    } catch (e) {
      console.log("error uploading to S3", e)
    }
  })
}

export async function documentExtract(key) {
  try {
    return new Promise(resolve => {
      var textract = new AWS.Textract({
        region: "us-west-2", //process.env.AWS_REGION,
        endpoint: "https://textract.us-west-2.amazonaws.com/", //`https://textract.${process.env.AWS_REGION}.amazonaws.com/`,
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY
      })
      var params = {
        Document: {
          S3Object: {
            Bucket: process.env.AWS_BUCKET,
            Name: key
          }
        },
        FeatureTypes: ["FORMS"]
      }

      textract.analyzeDocument(params, (err, data) => {
        if (err) {
          return resolve(err)
        } else {
          resolve(data)
        }
      })
    })
  } catch (e) {
    console.log("error extracting document", e)
  }
}
