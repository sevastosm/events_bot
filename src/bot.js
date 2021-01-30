"use strict";
require("dotenv").config();
const ViberBot = require("viber-bot").Bot;
const BotEvents = require("viber-bot").Events;
const Keyboard = require("viber-bot").Message.Keyboard;
const TextMessage = require("viber-bot").Message.Text;
const winston = require("winston");
const toYAML = require("winston-console-formatter");
const isEmpty = require("lodash/isempty");
const addUser = require("./controlers/users")
const {bot_message,tracking_mesages}=require("./constans")s

//logger
function createLogger() {
  const logger = new winston.Logger({
    level: "debug", // We recommend using the debug level for development
  });
  logger.format.json()

  logger.add(winston.transports.Console, toYAML.config());
  return logger;
}

const logger = createLogger();


// Creating the bot with access token, name and avatar
const bot = new ViberBot(logger, {
  authToken: process.env.VIBER_PUBLIC_ACCOUNT_ACCESS_TOKEN_KEY, // Learn how to get your access token at developers.viber.com
  name: "ΕΚΚΛΗΣΙΑ ΚΗΦΙΣΙΑΣ",
  avatar: "http://www.apostolicchurch.gr/images/kifisia.jpg", // Just a placeholder avatar to display the user
});



function handleResponseToMessage(response, message) {

  addUser()
  const userProfile = response.userProfile;
  // TD send the response needed based on message
  const sermonDate = "103";

  // keyboard sample
  const keyboard = {
    Type: "keyboard",
    DefaultHeight: true,
    Buttons: [
      {
        ActionType: "reply",
        ActionBody: "selection_1", // should be contants for knowing the current selection
        Text: "ΣΥΝΑΘΡΟΙΣΗ 1 5:00 με 6:00",
        TextSize: "regular",
      },
      {
        ActionType: "reply",
        ActionBody: "selection_2", // should be contants for knowing the current selection
        Text: "ΣΥΝΑΘΡΟΙΣΗ 1 7:00 με 8:00",
        TextSize: "regular",
      },
    ],
  };
  const tracking_data0= {};

  const tracking_data = { key: tracking_mesages.NUMBER_OF_PEOPLE_ASKED };
  const tracking_data1 = { key: tracking_mesages.CHOOSE_SERMON};

  // respond if user ask for dates

  if (!isEmpty(message.trackingData)) {
      console.log("MESAGE ---", message.trackingData.key);
    // TD check if user has already select
    // get user sermon(date)
    // calculate avalabilities
    switch (message.trackingData.key) {
      case tracking_mesages.NUMBER_OF_PEOPLE_ASKED:
        const viewMessage = new TextMessage(bot_message.response.SELET_SERMON);
        const keyboardMessage = new Keyboard(keyboard);
         bot.sendMessage(userProfile, [viewMessage, keyboardMessage],tracking_data1);
        break;
      case tracking_mesages.CHOOSE_SERMON:
        const viewMessage2 = new TextMessage(bot_message.response.WAITING_AT_CHURCH);
         bot.sendMessage(userProfile,viewMessage2,tracking_data0);
        break;
    }
    return;
  }

  if (message.text === sermonDate) {
    const text = bot_message.response.NUMBER_OF_PEOPLE
    // await response.send(new Keyboard(keyboard))
    const viewMessage = new TextMessage(text);
    bot.sendMessage(userProfile, viewMessage,tracking_data);
    // response.send(viewMessage);
    // new TextMessage(viewMessage);
  } else {
    const viewMessage = new TextMessage(bot_message.response.WRONG_MESAGE_RECIVED);
    bot.sendMessage(userProfile, viewMessage,tracking_data0);
  }
}

// handle message received
function handleMessage(response, message) {
  // console.log("RESRONSE", response);
  handleResponseToMessage(response, message);
}

if (!process.env.VIBER_PUBLIC_ACCOUNT_ACCESS_TOKEN_KEY) {
  logger.debug(
    "Could not find the Viber account access token key in your environment variable. Please make sure you followed readme guide."
  );
}

// bot events
// The user will get those messages on first registration
bot.onSubscribe(response => console.log(`Subscribed: ${response.userProfile.name}`));

bot.onUnsubscribe(userId => console.log(`Unsubscribed: ${userId}`));

/**
 * You can see whether a user is subscribed in the subscribed parameter of the conversation_started
 * callback. Note that users’ first message to the bot will make them subscribed,
 * but will not result in a Subscribed callback.
 */

//event 	Callback type - which event triggered the callback 	"conversation_started"
bot.onConversationStarted((userProfile) =>
logger.debug(userProfile)
// if (!isSubscribed) add to firebase => promise
 //onFinish(new TextMessage(`ΚΑΛΩΣ ΗΡΘΑΤΕ ΓΙΑ ΚΡΑΤΗΣΗ ΠΛΗΚΤΡΟΛΟΓΗΣΤΕ 103`))
);

//event 	Callback type - which event triggered the callback 	"subscribed"
bot.onSubscribe(userId =>{
  // if (!isSubscribed) add to firebase => promise
    console.log(`Unsubscribed: ${userId}`)
  });

//event 	Callback type - which event triggered the callback 	"unsubscribed"
bot.onUnsubscribe(userId =>{
// if (!isSubscribed) add to firebase => promise
  console.log(`Unsubscribed: ${userId}`)
});


// event 	Callback type - which event triggered the callback 	"message"
bot.on(BotEvents.MESSAGE_RECEIVED, (message, response) => {
  // This sample bot can answer only text messages, let's make sure the user is aware of that.
  if (!(message instanceof TextMessage)) {
    response.send(
      new TextMessage(bot_message.response.WRONG_MESAGE_RECIVED)
    );
  }else{
    handleMessage(response, message);
  }
});


module.exports = bot
