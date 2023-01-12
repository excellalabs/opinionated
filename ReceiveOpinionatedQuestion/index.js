const { QueueServiceClient } = require("@azure/storage-queue");
const { parse } = require("qs");

module.exports = async function (context, req) {
  const connectionString = process.env.STORAGE_CONNECTION_STRING;

  const queueName = "opinionated-questions";

  const queueServiceClient =
    QueueServiceClient.fromConnectionString(connectionString);

  const queueClient = queueServiceClient.getQueueClient(queueName);

  const parsedData = parse(req.rawBody);

  context.log(parsedData.text);

  queueClient.sendMessage(parsedData.text);
};
