const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const invoiceRoutes = require("./routes/invoice");

const app = express();

app.use(cors({
    origin: "*"
}));
app.use(express.json());

// Routes
app.use("/api", invoiceRoutes);

// Health check
app.get("/api/health", (req, res) => {
    res.json({
        status: "running",
        message: "IntelliPay AI backend is live",
        ai: "Google Gemini",
        database: "Google Sheets"
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error("Server error:", err.message);
    res.status(500).json({ error: "Internal server error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Server running on http://127.0.0.1:${PORT}`);
    console.log(`🤖 AI: Google Gemini`);
    console.log(`📊 Database: Google Sheets`);
});