import { NextApiRequest, NextApiResponse } from "next";
import SitemapGenerator from "sitemap-generator";

export default async function crawler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { key } = req.query;

    if (key == "qazplmxcvbn") {
      // create generator
      const generator = SitemapGenerator("https://flexstart.org", {
        stripQuerystring: false,
        filepath: "./public/sitemap.xml",
        changeFreq: "weekly",
        priorityMap: [1.0, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0],
      });

      // start the crawler
      generator.start();

      // register event listeners
      generator.on("done", () => {
        console.log("created");
      });

      return res.status(200).json("created");
    } else {
      return res.status(400);
    }
  }
}
