"use strict";

require("dotenv").config();
const bot = require("./bot");
const ngrok = require("./get_public_url");

function startBot (){
return ngrok
  .getPublicUrl()
  .then((publicUrl) => {
    const http = require("http");
    const port = process.env.PORT || 8080;
    http
      .createServer(bot.middleware())
      .listen(port, () => bot.setWebhook(publicUrl));
  })
  .catch((error) => {
    console.log("Can not connect to ngrok server. Is it running?");
    console.error(error);
    process.exit(1);
  })
}

module.exports = startBot;