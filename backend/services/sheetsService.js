const fs = require("fs");
const path = require("path");
const { parse } = require("csv-parse/sync");

function getSheetData() {
    try {
        const filePath = path.join(__dirname, "../data/invoice_DB_-_Sheet1.csv");
        const fileContent = fs.readFileSync(filePath, "utf-8");

        const records = parse(fileContent, {
            columns: true,        // use first row as headers
            skip_empty_lines: true,
            trim: true
        });

        console.log(`📊 Loaded ${records.length} records from CSV`);
        return records;

    } catch (err) {
        console.error("CSV read error:", err.message);
        throw new Error("Failed to read invoice data from CSV file");
    }
}

function formatDataForAI(records) {
    if (!records || records.length === 0) {
        return "No invoice data found in the database.";
    }

    const lines = ["COMPANY INVOICE DATABASE:\n"];

    records.forEach((row, index) => {
        lines.push(
            `${index + 1}. Invoice: ${row.invoice_number} | ` +
            `Worker: ${row.worker_name} | ` +
            `Role: ${row.role} | ` +
            `Team: ${row.team} | ` +
            `Amount: $${row.amount} | ` +
            `Date: ${row.payment_date} | ` +
            `Status: ${row.status} | ` +
            `Description: ${row.description}`
        );
    });

    return lines.join("\n");
}

module.exports = { getSheetData, formatDataForAI };