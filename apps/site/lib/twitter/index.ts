import { getTweet } from "@/lib/twitter/get-tweet";

export default function getTweets(ids: string[]) {
  return Promise.all(ids.map((id) => getTweet(id)));
}

export const homepageTweets = [
  "1655542853354033153",
  // "",
  // "",
  // "",
  // "",
  // "",
  // "",
  // "",
  // "",
];
