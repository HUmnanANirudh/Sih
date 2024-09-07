require("dotenv").config();
const puppeteer = require("puppeteer");
const Product = require("../backend/models/product");
const mongoose = require("mongoose");
const { MONGO_URI } = require("./config/config");

async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI, {
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
    ''
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
