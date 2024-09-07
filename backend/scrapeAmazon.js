require("dotenv").config();
const puppeteer = require("puppeteer");
const Product = require("../backend/models/product");
const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect( "mongodb+srv://tanirudhganesh:valtisbest@cluster0.gntytop.mongodb.net/" ,{
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000,
    });
    console.log("Connected to MongoDB");
    await scrapeAmazonProducts();
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
}

async function scrapeAmazonProducts() {
  const urls = [
    'https://www.amazon.in/s?k=home+decor&crid=27FY7ZS35XD4B&sprefix=home+decor%2Caps%2C273&ref=nb_sb_noss_1',
    'https://www.amazon.in/s?k=indian+artisans&crid=1AZN67082EIAQ&sprefix=indian+artisa%2Caps%2C486&ref=nb_sb_ss_ts-doa-p_1_13',
    'https://www.amazon.in/s?k=handicraft&crid=1EO6TPXYW4BHU&sprefix=handic%2Caps%2C290&ref=nb_sb_ss_ts-doa-p_2_6',
    'https://www.amazon.in/s?k=handicraft+bazarr&crid=3FSEY10ACF7PB&sprefix=handicraft%2Caps%2C631&ref=nb_sb_ss_ts-doa-p_6_10',
    'https://www.amazon.in/s?k=handicraft+bazar+okhli&crid=18LNXNJ9B8YZI&sprefix=handicraft+bazarr%2Caps%2C398&ref=nb_sb_ss_ts-doa-p_6_17'
  ];

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    timeout: 120000,
  });
  try {
    for (const url of urls) {
      const page = await browser.newPage();
      try {
        await page.goto(url, { waitUntil: "networkidle2" });

        const products = await page.evaluate(() => {
          const productElements = document.querySelectorAll(
            ".s-main-slot .s-result-item"
          );
          const products = [];

          productElements.forEach((element) => {
            const title = element
              .querySelector("span.a-text-normal")
              ?.innerText.trim();
            const image = element.querySelector("img.s-image")?.src;
            const priceText =
              element.querySelector("span.a-price-whole")?.innerText.trim() ||
              "0";
            const price = parseFloat(priceText.replace(/,/g, "") || "0");
            const description =
              element.querySelector(".a-size-base-plus")?.innerText.trim() ||
              element.querySelector(".a-size-base")?.innerText.trim() ||
              "";

            if (title && image && !isNaN(price)) {
              products.push({ title, image, price, description });
            }
          });

          return products;
        });

        for (let productData of products) {
          const product = new Product(productData);
          try {
            await product.save();
            console.log("Product saved:", product);
          } catch (saveError) {
            console.error("Error saving product:", saveError);
          }
        }

        console.log(`Scraped ${products.length} products from ${url}`);
      } catch (pageError) {
        console.error("Error scraping products:", pageError);
      } finally {
        await page.close();
      }
    }
  } catch (browserError) {
    console.error("Error launching browser:", browserError);
  } finally {
    await browser.close();
  }
}

connectDB();
