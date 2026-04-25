const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function askAI(userQuestion, invoiceDataText) {
    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash" // free and fast
        });

        const prompt = `You are an AI Invoice Query Assistant for a company called IntelliPay.
You have access to the company's complete invoice and payment database below.
Answer questions clearly and accurately based only on the data provided.
Format all currency with $ sign.
Format dates in a readable way like "January 15, 2025".
If asked for a list, use bullet points.
If asked for totals, calculate them accurately.
If the data does not contain what the user is asking, say so honestly.
Be concise, professional, and helpful.

${invoiceDataText}

USER QUESTION: ${userQuestion}

Answer:`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        return text;

    } catch (err) {
        console.error("Gemini AI error:", err.message);
        throw new Error("Failed to get response from Gemini AI");
    }
}

module.exports = { askAI };