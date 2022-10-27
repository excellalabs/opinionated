const { QueueServiceClient } = require("@azure/storage-queue");
const axios = require("axios");

module.exports = async function (context, myTimer) {
  const connectionString = process.env.STORAGE_CONNECTION_STRING;

  const queueName = "opinionated-questions";

  const queueServiceClient =
    QueueServiceClient.fromConnectionString(connectionString);

  const queueClient = queueServiceClient.getQueueClient(queueName);

  const firstMessage = (await queueClient.receiveMessages())
    .receivedMessageItems[0];

  context.log(Buffer.from(firstMessage.messageText, "base64").toString());

  const queuedMessageText = Buffer.from(
    firstMessage.messageText,
    "base64"
  ).toString();

  axios
    .post(
      process.env.SLACK_WEBHOOK,
      {
        text: queuedMessageText,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then(function (response) {
      context.log(response);
    })
    .catch(function (error) {
      context.log(error);
    });

  await queueClient.deleteMessage(
    firstMessage.messageId,
    firstMessage.popReceipt
  );

  var timeStamp = new Date().toISOString();

  // if (myTimer.isPastDue) {
  //   context.log("JavaScript is running late!");
  // }
  // context.log("JavaScript timer trigger function ran!", timeStamp);
};
