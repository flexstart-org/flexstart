// const FyersModel = require("fyers-api-v3").fyersModel;
// const FyersDataSocket = require("fyers-api-v3").fyersDataSocket;
// const FyersOrderSocket = require("fyers-api-v3").fyersOrderSocket;

// const { App_ID, Secret_ID, Redirect_URL, Auth_URL, Authcode, Access_Token } = process.env;

// let fyers = new FyersModel({ path: "./" });

// fyers.setAppId(App_ID);
// fyers.setRedirectUrl(Redirect_URL);
// fyers.setAccessToken(Access_Token);


// fyers.get_profile().then((response)=>{
//     console.log(response)
// }).catch((err)=>{
//     console.log(err)
// })

// fyers.getMarketDepth({"symbol":["NSE:SBIN-EQ","NSE:TCS-EQ"],"ohlcv_flag":1}).then((response)=>{
//     console.log(response)
// }).catch((err)=>{
//     console.log(err)
// })

// fyers.market_status().then((res) => {
//   console.log(res);
// });

// let fyersdata = new FyersDataSocket(`${App_ID}:${Access_Token}`);

// function onMsg(message) {
//   console.log(message);
// }

// function onConnect() {
//   fyersdata.subscribe(["NSE:BHARTIARTL-EQ"]); //not subscribing for market depth data
//   // fyersdata.subscribe(['NSE:IDEA-EQ'],true) //subscribing for market depth
//   fyersdata.mode(fyersdata.LiteMode); //set data mode to lite mode
//   fyersdata.autoreconnect(); //enable auto reconnection mechanism in case of disconnection
// }

// function onError(err) {
//   console.log(err);
// }

// function onClose() {
//   console.log("socket closed");
// }

// fyersdata.on("message", onMsg);
// fyersdata.on("connect", onConnect);
// fyersdata.on("error", onError);
// fyersdata.on("close", onClose);

// fyersdata.connect();
