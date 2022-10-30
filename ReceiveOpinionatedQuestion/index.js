const { QueueServiceClient } = require("@azure/storage-queue");

module.exports = async function (context, req) {
  const connectionString = process.env.STORAGE_CONNECTION_STRING;

  const queueName = "opinionated-questions";

  const queueServiceClient = QueueServiceClient.fromConnectionString(connectionString);

  const queueClient = queueServiceClient.getQueueClient(queueName);

  context.log(context.bindings.question);

  queueClient.sendMessage(context.bindings.question)
};
