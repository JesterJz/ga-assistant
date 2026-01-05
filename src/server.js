const express = require("express");
const dotenv = require("dotenv");
const cron = require("node-cron");

const { detectIntent } = require("./intents");
const { searchDocs, formatRagAnswer } = require("./rag");

dotenv.config();

const app = express();
app.use(express.json({ limit: "1mb" }));

app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const durationMs = Date.now() - start;
    console.log(
      JSON.stringify({
        at: new Date().toISOString(),
        method: req.method,
        path: req.path,
        status: res.statusCode,
        durationMs
      })
    );
  });
  next();
});

function safeFallback() {
  return (
    "Hien tai minh khong co thong tin chinh thuc ve van de nay. " +
    "Ban vui long lien he HR hoac cho thong bao chinh thuc tu cong ty."
  );
}

function extractMessageText(body) {
  if (body && body.message && body.message.text) return body.message.text;
  if (body && body.text) return body.text;
  return "";
}

async function sendChatMessage(text) {
  const webhookUrl = process.env.GOOGLE_CHAT_WEBHOOK_URL;
  if (!webhookUrl) {
    console.warn("GOOGLE_CHAT_WEBHOOK_URL is not set. Skipping send.");
    return { skipped: true };
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text })
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Chat webhook failed: ${response.status} ${detail}`);
  }

  return { ok: true };
}

function buildOnboardingMessage() {
  return [
    "Chao mung ban gia nhap cong ty!",
    "1) Noi quy: https://intranet.local/policies",
    "2) IT ho tro: https://intranet.local/it",
    "3) HR ho tro: https://intranet.local/hr"
  ].join("\n");
}

function buildContractReminderMessage() {
  return [
    "[Thong bao] Hop dong sap het han trong 30 ngay.",
    "Vui long kiem tra danh sach tren HR Portal va lien he HR neu can ho tro."
  ].join("\n");
}

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

app.post("/webhook", (req, res) => {
  try {
    const text = extractMessageText(req.body);
    const intent = detectIntent(text);

    if (intent === "unknown") {
      return res.json({ text: safeFallback() });
    }

    const result = searchDocs(text);
    if (!result) {
      return res.json({ text: safeFallback() });
    }

    const answer = formatRagAnswer(result.doc);
    return res.json({ text: answer });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ text: "Co loi xay ra. Vui long thu lai sau." });
  }
});

app.post("/demo/onboarding", async (req, res) => {
  try {
    const text = buildOnboardingMessage();
    await sendChatMessage(text);
    res.json({ ok: true, message: "onboarding_sent" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, error: error.message });
  }
});

app.post("/demo/contract-reminder", async (req, res) => {
  try {
    const text = buildContractReminderMessage();
    await sendChatMessage(text);
    res.json({ ok: true, message: "contract_reminder_sent" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, error: error.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

const schedule = process.env.CONTRACT_REMINDER_CRON || "0 9 * * *";
cron.schedule(schedule, async () => {
  try {
    const text = buildContractReminderMessage();
    await sendChatMessage(text);
    console.log("Contract reminder sent");
  } catch (error) {
    console.error("Contract reminder failed", error);
  }
});
