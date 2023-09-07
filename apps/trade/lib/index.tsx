"use server";

import FyersApi from "fyers-api-v3/apiService/apiService";
// const FyersDataSocket = require("fyers-api-v3").fyersDataSocket;
// const FyersOrderSocket = require("fyers-api-v3").fyersOrderSocket;

const { App_ID, Secret_ID, Redirect_URL } = process.env;

let fyers = new FyersApi({ path: "../" });

export const getAccessToken = (auth_code: any) => {
  const token = fyers
    .generate_access_token({
      client_id: App_ID,
      secret_key: Secret_ID,
      auth_code: auth_code,
    })
    .then((res: any) => {
      if (res.s == "ok") {
        console.log(res.access_token);
        return res.access_token;
      } else {
        console.log(res.message);
        return `error generating access token, ${res.message}`;
      }
    });

  return token;
};

export const getProfile = (accessToken: string): string => {
  fyers.setAppId(App_ID);
  fyers.setRedirectUrl(Redirect_URL);
  fyers.setAccessToken(accessToken);
  const profile = fyers
    .get_profile()
    .then((res: any) => {
      console.log(res);
      return res.data.name;
    })
    .catch((err) => {
      console.log(err);
    });

  return profile;
};
