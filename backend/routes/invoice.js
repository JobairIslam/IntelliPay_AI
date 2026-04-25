const express = require("express");
const router = express.Router();
const { getSheetData, formatDataForAI } = require("../services/sheetsService");
const { askAI } = require("../services/aiService");

// ─── QUERY ROUTE ──────────────────────────────────────────
router.post("/query", async (req, res) => {
    try {
        const { question } = req.body;

        if (!question || question.trim() === "") {
            return res.status(400).json({
                error: "No question provided"
            });
        }

        console.log(`📩 Question received: ${question}`);

        // Step 1: Fetch data from Google Sheets
        const records = await getSheetData();
        const invoiceText = formatDataForAI(records);

        // Step 2: Ask Gemini AI
        const answer = await askAI(question.trim(), invoiceText);

        console.log(`✅ Answer sent successfully`);

        res.json({ answer });

    } catch (err) {
        console.error("Query route error:", err.message);
        res.status(500).json({
            error: err.message || "Failed to process your question. Please try again."
        });
    }
});

module.exports = router;