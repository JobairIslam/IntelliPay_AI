const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// ── Invoice Query ─────────────────────────────────────────
export async function askInvoiceAgent(question) {
    const res = await fetch(`${API_BASE_URL}/api/query`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ question })
    });

    if (!res.ok) throw new Error("Server error");

    const data = await res.json();
    return data.answer;
}

// ── Health Check ──────────────────────────────────────────
export async function checkHealth() {
    try {
        const res = await fetch(`${API_BASE_URL}/api/health`);
        const data = await res.json();
        return data.status === "running";
    } catch {
        return false;
    }
}