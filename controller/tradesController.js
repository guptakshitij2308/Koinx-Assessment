const Trade = require("../models/TradeRecord");
const fs = require("fs");
const csvParser = require("csv-parser");
const path = require("path");

exports.uploadCsv = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const filePath = req.file.path;
  const trades = [];

  fs.createReadStream(filePath)
    .pipe(csvParser())
    .on("data", (data) => {
      try {
        const {
          UTC_Time,
          Operation,
          Market,
          "Buy/Sell Amount": amount,
          Price,
        } = data;
        const utc_time = new Date(UTC_Time);
        const operation = Operation.toLowerCase();
        const [base_coin, quote_coin] = Market.split("/");
        const parsedAmount = parseFloat(amount);
        const parsedPrice = parseFloat(Price);

        if (!isNaN(parsedAmount) && !isNaN(parsedPrice)) {
          trades.push({
            utc_time,
            operation,
            market: Market,
            base_coin,
            quote_coin,
            amount: parsedAmount,
            price: parsedPrice,
          });
        }
      } catch (error) {
        console.error("Error parsing row:", error);
      }
    })
    .on("end", async () => {
      try {
        await Trade.bulkWrite(
          trades.map((trade) => ({
            updateOne: {
              filter: {
                utc_time: trade.utc_time,
                base_coin: trade.base_coin,
                quote_coin: trade.quote_coin,
              },
              update: trade,
              upsert: true,
            },
          }))
        );
        fs.unlinkSync(filePath);
        res.status(200).json({ message: "CSV file processed successfully" });
      } catch (error) {
        console.error("Error saving trades:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });
};
