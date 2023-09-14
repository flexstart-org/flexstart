const FyersAPI = require("fyers-api-v3").fyersModel;
const FyersDataSocket = require("fyers-api-v3").fyersDataSocket;
const FyersOrderSocket = require("fyers-api-v3").fyersOrderSocket;
// import FyersAPI from "fyers-api-v3/apiService/apiService.js";
// import FyersDataSocket from "fyers-api-v3/HSM/datasocket.min.js";
// import FyersOrderSocket from "fyers-api-v3/ordersocket/fyersSocket.js";

const { appID, accessToken, stockCode } = {
  appID: "S3ZENE8T7T-100",
  accessToken:
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhcGkuZnllcnMuaW4iLCJpYXQiOjE2OTQyNzkwNjIsImV4cCI6MTY5NDMwNTgyMiwibmJmIjoxNjk0Mjc5MDYyLCJhdWQiOlsieDowIiwieDoxIiwieDoyIiwiZDoxIiwiZDoyIiwieDoxIiwieDowIl0sInN1YiI6ImFjY2Vzc190b2tlbiIsImF0X2hhc2giOiJnQUFBQUFCa19LV1dXQUVVYkpFR0VMTFpfUDhqTTVYUTZDb0RIdThWc3FEMHl2M1E1clg5eEZfYnV4U3pLczFRSDZPakotZ256X2M3aTV5eDhxaWRyNE8zOExwd3p3Wml4WEtvLXFLQmpJRmdFOG8yRTB2eFRNND0iLCJkaXNwbGF5X25hbWUiOiJNSVRFU0ggUkFNQSBHVVBUQSIsIm9tcyI6IksxIiwiaHNtX2tleSI6IjVjNWUwOGQyMmI4ZTExMWQ1NGVmMTk4ZDNkZGFhOGVmMTIyODY5MzVmZmE4MGVhNTQ3ZTUxNTVkIiwiZnlfaWQiOiJYTTQyNDYxIiwiYXBwVHlwZSI6MTAwLCJwb2FfZmxhZyI6Ik4ifQ.btRWRhXKJXupcNAD7i61pfcYrRZKZ9d8Xpa5ASECm4M",
  stockCode: "NSE:IDEA-EQ",
};

const fyers = new FyersAPI();
const fyersdata = new FyersDataSocket(`${appID}:${accessToken}`);
const fyersOrderdata = new FyersOrderSocket(`${appID}:${accessToken}`);

fyers.setAppId(appID);
fyers.setAccessToken(accessToken);

fyersOrderdata.on("connect", () => {
  fyersOrderdata.subscribe([fyersOrderdata.orderUpdates]);
});

fyersOrderdata.on("error", (err) => {
  console.log(err);
});

fyersOrderdata.on("close", () => {
  console.log("closed");
});

fyersOrderdata.on("orders", (msg) => {
  console.log("orders", msg);
  console.log(msg.s, msg.orders.tradedPrice, msg.orders.status);
});

fyersOrderdata.autoreconnect();
fyersOrderdata.connect();

const main = async (orderId = undefined) => {
  if (orderId) {
    const order = await fyers.get_filtered_orders({ order_id: orderId });
    console.log(order);

    if (order.orderBook[0].status == 2) {
      const buyPrice = order.orderBook[0].tradedPrice;
      trade(buyPrice);
    } else {
      console.log("order status is different");
    }
  } else {
    const orders = await fyers.get_orders();
    console.log(orders);
    if (
      orders.orderBook[0].symbol == stockCode &&
      orders.orderBook[0].side == 1 &&
      orders.orderBook[0].status == 2
    ) {
      const buyPrice = orders.orderBook[0].tradedPrice;
      console.log(buyPrice);
    } else {
      placeOrder();
    }
  }
};

const placeOrder = () => {
  const reqBody = {
    symbol: stockCode,
    qty: 1,
    type: 2,
    side: 1,
    productType: "INTRADAY",
    limitPrice: 10.5,
    stopPrice: 0,
    disclosedQty: 0,
    validity: "DAY",
    offlineOrder: false,
    stopLoss: 0,
    takeProfit: 0,
  };
  console.log("order placed");
  // fyers
  //   .place_order(reqBody)
  //   .then((res) => {
  //     console.log(res);
  //     if (res.s == "ok") {
  //       const orderId = res.id;
  //       main(orderId);
  //     }
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
};

const sellOrder = () => {
  const reqBody = {
    symbol: stockCode,
    qty: 1,
    type: 2,
    side: -1,
    productType: "INTRADAY",
    limitPrice: 0,
    stopPrice: 0,
    disclosedQty: 0,
    validity: "DAY",
    offlineOrder: false,
    stopLoss: 0,
    takeProfit: 0,
  };
  console.log("sold");
  // fyers
  //   .place_order(reqBody)
  //   .then((response) => {
  //     console.log(response);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
};

const trade = (buyPrice) => {
  fyersdata.on("message", (message) => {
    console.log(message);
    const ltp = message.symbol == stockCode ? message.ltp : 0;

    if (ltp > 0) {
      if (ltp >= buyPrice + 5) {
        sellOrder();
      } else if (ltp <= buyPrice - 5) {
        sellOrder();
      }
    } else {
      console.log("error getting last traded price of stock");
    }
  });

  fyersdata.on("connect", () => {
    fyersdata.subscribe([stockCode]); //not subscribing for market depth data
    // fyersdata.subscribe([stockCode],true) //subscribing for market depth
    fyersdata.mode(fyersdata.LiteMode); //set data mode to lite mode
    fyersdata.autoreconnect();
  });

  fyersdata.on("error", (err) => {
    console.log(err);
  });

  fyersdata.on("close", () => {
    console.log("socket closed");
  });

  fyersdata.connect();
};

// main();

// fyers.get_profile().then((response)=>{
//     console.log(response)
// }).catch((err)=>{
//     console.log(err)
// })

// fyers.get_orders().then((response) => {
//   console.log(response)
// }).catch((error) => {
//   console.log(error)
// })

// fyers.get_filtered_orders({order_id:"23090900003182"}).then((response) => {
//   console.log(response)
// }).catch((error) => {
//   console.log(error)
// })

// fyers.getMarketDepth({"symbol":["NSE:SBIN-EQ","NSE:TCS-EQ"],"ohlcv_flag":1}).then((response)=>{
//     console.log(response)
// }).catch((err)=>{
//     console.log(err)
// })

// fyers.market_status().then((res) => {
//   console.log(res);
// });

/*
Fyers Model:-
get_profile
get_funds
get_holdings
get_orders
get_filtered_orders
get_positions
get_tradebook
place_order
place_multi_order
modify_order
modify_multi_order
cancel_order
cancel_multi_order
exit_position
convert_position
market_status
getHistory
getQuotes
getMarketDepth

Fyers Socket:-
connect
autoreconnect
on
subscribe
unsubscribe
close
isConnected
startPing
stopPing
*/

/*
Fyers API endpoints:-

export const Config = {
    "API":"https://api.fyers.in/api/v2",
    "SYNC_API":"https://api-t1.fyers.in/api/v3",
    "data_Api": "https://api.fyers.in/data-rest/v2",
    "data_Api1": "https://api-t1.fyers.in/data",
    "HSM_SOCKET": "wss://socket.fyers.in/hsm/v1-5/prod",
    "Order_SOCKET": "wss://socket.fyers.in/trade/v3",
    "get_profile" : "/profile",
    "tradebook" : "/tradebook",
    "positions" : "/positions",
    "holdings" : "/holdings",
    "convertPosition" : "/positions",
    "funds" : "/funds",
    "gtt":"/gtt",
    "orders" : "/orders",
    "orders_sync" : "/orders/sync",
    "orderStatus" : "/order-status",
    "marketStatus" : "/marketStatus",
    "auth" : "/generate-authcode",
    "generateAccessToken" : "/validate-authcode",
    "exitPositions" : "/positions",
    "multi_orders" : "/multi-order/sync",
    "history" : "/history",
    "quotes" : "/quotes",
    "market_depth" : "/depth"
}
*/
