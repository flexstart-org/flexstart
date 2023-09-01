const FyersModel = require("fyers-api-v3").fyersModel;
const FyersDataSocket = require("fyers-api-v3").fyersDataSocket;
const FyersOrderSocket = require("fyers-api-v3").fyersOrderSocket;

const App_ID = "S3ZENE8T7T-100";
const Secret_ID = "4QFS2VMJ4P";
const Redirect_URL = "https://trade.flexstart.org";
const Auth_URL =
  "https://api-t1.fyers.in/api/v3/generate-authcode?client_id=S3ZENE8T7T-100&redirect_uri=https://trade.flexstart.org&response_type=code";

const Access_Token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhcGkuZnllcnMuaW4iLCJpYXQiOjE2OTM0Nzg5OTMsImV4cCI6MTY5MzUyODI1MywibmJmIjoxNjkzNDc4OTkzLCJhdWQiOlsieDowIiwieDoxIiwieDoyIiwiZDoxIiwiZDoyIiwieDoxIiwieDowIl0sInN1YiI6ImFjY2Vzc190b2tlbiIsImF0X2hhc2giOiJnQUFBQUFCazhIQlJWN0ZUUmVXRnBFSXh6NWxUbVBtOWVFc2FWdmszN19PMTRwdU9YWUJCNnQ0ZkFSWi1hNk1ac2RWNXZvRmctNkRmYXNIeThXcXhydEI3STNEdmh1dURmd09Bc1hzSWI5VEFSY2Jod0xtMTNXQT0iLCJkaXNwbGF5X25hbWUiOiJNSVRFU0ggUkFNQSBHVVBUQSIsIm9tcyI6IksxIiwiaHNtX2tleSI6ImI0MGY1N2Q2NjljNmVkYjQ3OTU2ZWY3MzIwZmEyNmJhZmU5MDcwMzNiOGJmNjNhNDYwZjI4YjdlIiwiZnlfaWQiOiJYTTQyNDYxIiwiYXBwVHlwZSI6MTAwLCJwb2FfZmxhZyI6Ik4ifQ.09TaYB8k5EEjrnUriybxYVX-iRDjrM0c0BSTIN8fVqc";

let fyers = new FyersModel({ path: "./" });
let fyersdata = new FyersDataSocket(`${App_ID}:${Access_Token}`);

fyers.setAppId(App_ID);
fyers.setRedirectUrl(Redirect_URL);
fyers.setAccessToken(Access_Token);

// const authcode = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhcGkubG9naW4uZnllcnMuaW4iLCJpYXQiOjE2OTM0Nzg3OTgsImV4cCI6MTY5MzUwODc5OCwibmJmIjoxNjkzNDc4MTk4LCJhdWQiOiJbXCJ4OjBcIiwgXCJ4OjFcIiwgXCJ4OjJcIiwgXCJkOjFcIiwgXCJkOjJcIiwgXCJ4OjFcIiwgXCJ4OjBcIl0iLCJzdWIiOiJhdXRoX2NvZGUiLCJkaXNwbGF5X25hbWUiOiJYTTQyNDYxIiwib21zIjoiSzEiLCJoc21fa2V5IjoiYjQwZjU3ZDY2OWM2ZWRiNDc5NTZlZjczMjBmYTI2YmFmZTkwNzAzM2I4YmY2M2E0NjBmMjhiN2UiLCJub25jZSI6IiIsImFwcF9pZCI6IlMzWkVORThUN1QiLCJ1dWlkIjoiOWVlZTA1ZDZiOTBhNGZmZTk4Y2E5N2Q0NzMyN2Q0MzAiLCJpcEFkZHIiOiIwLjAuMC4wIiwic2NvcGUiOiIifQ.mpcuw5_G2ZJc_rs_kVd3j7UXrUeWx7L8beBCC_blk-w";

// fyers
//   .generate_access_token({
//     client_id: App_ID,
//     secret_key: Secret_ID,
//     auth_code: authcode,
//   })
//   .then((response) => {
//     if (response.s == "ok") {
//       fyers.setAccessToken(response.access_token);
//       console.log(response.access_token);
//     } else {
//       console.log("error generating access token", response);
//     }
//   });

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

function onMsg(message) {
  console.log(message);
}

function onConnect() {
  fyersdata.subscribe(["NSE:NIFTY50-INDEX", "NSE:TCS-EQ", "NSE:IDEA-EQ"]); //not subscribing for market depth data
  // fyersdata.subscribe(['NSE:IDEA-EQ'],true) //subscribing for market depth
  fyersdata.mode(fyersdata.LiteMode); //set data mode to lite mode
  fyersdata.autoreconnect(); //enable auto reconnection mechanism in case of disconnection
}

function onError(err) {
  console.log(err);
}

function onClose() {
  console.log("socket closed");
}

fyersdata.on("message", onMsg);
fyersdata.on("connect", onConnect);
fyersdata.on("error", onError);
fyersdata.on("close", onClose);

fyersdata.connect();
