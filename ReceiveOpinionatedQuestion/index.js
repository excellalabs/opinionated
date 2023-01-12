const { QueueServiceClient } = require("@azure/storage-queue");

module.exports = async function (context, req) {
  const connectionString = process.env.STORAGE_CONNECTION_STRING;

  const queueName = "opinionated-questions";

  const queueServiceClient =
    QueueServiceClient.fromConnectionString(connectionString);

  const queueClient = queueServiceClient.getQueueClient(queueName);

  // context.log("body", req.body);

  // context.log("try - query params", req.query.name);

  // context.log("context.bindings", context.bindings.question);

  context.log(req);

  context.log("hello from slack");

  // queueClient.sendMessage(req.body.hello);
};
