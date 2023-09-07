const FyersAPI = require("fyers-api-v3").fyersModel;
const FyersDataSocket = require("fyers-api-v3").fyersDataSocket;
const FyersOrderSocket = require("fyers-api-v3").fyersOrderSocket;
// import FyersAPI from "fyers-api-v3/apiService/apiService.js";
// import FyersDataSocket from "fyers-api-v3/HSM/datasocket.min.js";
// import FyersOrderSocket from "fyers-api-v3/ordersocket/fyersSocket.js";

const { appID, accessToken, stockCode } = {
  appID: "S3ZENE8T7T-100",
  accessToken:
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhcGkuZnllcnMuaW4iLCJpYXQiOjE2OTM4MTM3NjAsImV4cCI6MTY5Mzg3MzgyMCwibmJmIjoxNjkzODEzNzYwLCJhdWQiOlsieDowIiwieDoxIiwieDoyIiwiZDoxIiwiZDoyIiwieDoxIiwieDowIl0sInN1YiI6ImFjY2Vzc190b2tlbiIsImF0X2hhc2giOiJnQUFBQUFCazlZd0FlaC1nWnRpQklUcUhSYTBZb0IyTlEzaVl3WHoxb2hCTjAzVGlDZUFWODAwUF9yTGJPSlJkNXUtazVtS3BXeTctb0dhTDBwRUlGdGtRb0hHNjV1cGY0VlhvRTlvUENrdXdrNl9KcGJUTjczOD0iLCJkaXNwbGF5X25hbWUiOiJNSVRFU0ggUkFNQSBHVVBUQSIsIm9tcyI6IksxIiwiaHNtX2tleSI6ImI0MGY1N2Q2NjljNmVkYjQ3OTU2ZWY3MzIwZmEyNmJhZmU5MDcwMzNiOGJmNjNhNDYwZjI4YjdlIiwiZnlfaWQiOiJYTTQyNDYxIiwiYXBwVHlwZSI6MTAwLCJwb2FfZmxhZyI6Ik4ifQ.L9_Gd6yrz7KiYCrNkI7SeCpsWr4GPQqhaB9qKV89Q6k",
  stockCode: "NSE:BHARTIARTL-EQ",
};

const fyers = new FyersAPI();
const fyersdata = new FyersDataSocket(`${appID}:${accessToken}`);
const fyersOrderdata = new FyersOrderSocket(`${appID}:${accessToken}`);
fyers.setAppId(appID);
fyers.setAccessToken(accessToken);

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

const main = (orderId) => {
  if (orderId) {
    const reqBody = { order_id: orderId };

    fyers
      .get_filtered_orders(reqBody)
      .then((res) => {
        console.log(res);
        if (res.orderBook[0].status == 2) {
          const buyPrice = res.orderBook[0].tradedPrice;
          trade(buyPrice);
        } else {
          console.log("order status is different");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    getOrders();
  }
};

const getOrders = () => {
  fyers.get_orders
    .then((res) => {
      console.log(res);
      if (res.orderBook[0].symbol == stockCode && res.orderBook[0].side == 1) {
        const orderId = res.orderBook[0].id;
        main(orderId);
      } else {
        placeOrder();
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const placeOrder = () => {
  const reqBody = {
    symbol: stockCode,
    qty: 1,
    type: 2,
    side: 1,
    productType: "INTRADAY",
    limitPrice: 0,
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
    fyersdata.autoreconnect(); //enable auto reconnection mechanism in case of disconnection
  });

  fyersdata.on("error", (err) => {
    console.log(err);
  });

  fyersdata.on("close", () => {
    console.log("socket closed");
  });

  fyersdata.connect();
};

/*
fyersOrderdata.on('connect', () => {
    fyersOrderdata.subscribe([fyersOrderdata.orderUpdates,fyersOrderdata.tradeUpdates,fyersOrderdata.positionUpdates,fyersOrderdata.edis,fyersOrderdata.pricealerts]);
    fyersOrderdata.autoreconnect();
});

//for ticks of general data like price-alerts,EDIS
fyersOrderdata.on('general', (msg) => {
    console.log(msg);
});

//for ticks of orderupdates
fyersOrderdata.on('orders', (msg) => {
    console.log("orders",msg)
})

//for ticks of tradebook
fyersOrderdata.on('trades', (msg) => {
    console.log('trades',msg)
})

//for ticks of positions
fyersOrderdata.on('positions', (msg) => {
    console.log('positions',msg)
})

fyersOrderdata.on('close', () => {
    console.log('closed');
});

fyersOrderdata.on("error", (err) => {
    console.log(err);
});

fyersOrderdata.connect();
*/

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
