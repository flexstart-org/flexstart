import SitemapGenerator from "sitemap-generator";

// create generator
const generator = SitemapGenerator("https://flexstart.org", {
  stripQuerystring: false,
  filepath: "./public/sitemap.xml",
  changeFreq: "weekly",
  priorityMap: [1.0, 0.8, 0.6, 0.4, 0.2, 0],
});

// start the crawler
generator.start();

// register event listeners
generator.on("done", () => {
  console.log("created");
});
