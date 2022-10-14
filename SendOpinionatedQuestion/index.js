const axios = require("axios");

module.exports = async function (context, req) {
  context.log("JavaScript HTTP trigger function processed a request.");
  axios
    .post(
      "excella-slack-webhook",
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
