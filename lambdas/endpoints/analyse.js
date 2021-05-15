const Responses = require("../common/API_responses");
const AWS = require('aws-sdk')

const Comprehend = new AWS.Comprehend();

exports.handler = async event => {
  const body = JSON.parse(event.body);

  if (!body || !body.text) {
    return Responses._400({ message: "Missing body or text in it" });
  }

  const text = body.text;

  const params = {
      LanguageCode: 'en',
      TextList:[text],
  }

  try {
      const entityResults = await Comprehend.batchDetectEntities(params).promise();
      const entities = entityResults.ResultList[0]

      const sentimentResults = await Comprehend.batchDetectSentiment(params).promise();
      const sentiment = sentimentResults.ResultList[0];

      const res = {entities,sentiment}

      console.log(res)

      return Responses._200(res);

  } catch (error) {
      console.log(error)
      return Responses._400({ message: "Failed to work with comprehend" });
  }
};
