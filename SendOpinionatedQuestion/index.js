const axios = require("axios");

module.exports = async function (context, req) {
  context.log("JavaScript HTTP trigger function processed a request.");
  axios
    .post(
      "https://hooks.slack.com/services/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",
      {
        text: "Which is better, React or Angular? Tell me why!",
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
};
