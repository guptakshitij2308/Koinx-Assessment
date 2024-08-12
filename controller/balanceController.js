const Trade = require("../models/TradeRecord");

exports.calculateBalance = async (req, res) => {
  const { timestamp } = req.body;

  if (!timestamp) {
    return res.status(400).json({ error: "Timestamp parameter missing" });
  }

  try {
    const endDate = new Date(timestamp);

    const aggregatedTrades = await Trade.aggregate([
      { $match: { utc_time: { $lte: endDate } } },
      {
        $group: {
          _id: "$base_coin",
          totalAmount: {
            $sum: {
              $cond: [
                { $eq: ["$operation", "buy"] },
                "$amount",
                { $subtract: [0, "$amount"] },
              ],
            },
          },
        },
      },
    ]);

    const balanceSheet = aggregatedTrades.reduce((accumulator, trade) => {
      accumulator[trade._id] = trade.totalAmount;
      return accumulator;
    }, {});

    res.status(200).json(balanceSheet);
  } catch (error) {
    console.error("Failed to calculate balance:", error);
    res
      .status(500)
      .json({ error: "An error occurred while calculating balance" });
  }
};
