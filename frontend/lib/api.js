const axios = require('axios');

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5001";

export async function askInvoiceAgent(question) {

  try {
    const response = await axios.post(`${API_BASE_URL}/api/query`, {
      // method: "POST",
      // headers: { "Content-Type": "application/json" },
      question,
    });

    console.log(response.data);

    const data = response.data.answer;
    return data;
    
  } catch (error) {
    console.log(error);
  }

}

export async function checkHealth() {
  const response = await fetch(`${API_BASE_URL}/api/health`);
  return response.ok;
}
