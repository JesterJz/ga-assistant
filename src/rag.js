const fs = require("fs");
const path = require("path");

const STOP_WORDS = new Set([
  "la",
  "va",
  "cua",
  "cho",
  "toi",
  "minh",
  "cong",
  "ty",
  "nhu",
  "the",
  "nao",
  "lam",
  "sao",
  "co",
  "can",
  "mot",
  "mot",
  "1",
  "2",
  "3"
]);

function loadDocs() {
  const filePath = path.join(__dirname, "..", "data", "docs.json");
  const raw = fs.readFileSync(filePath, "utf8");
  return JSON.parse(raw);
}

function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((token) => token && !STOP_WORDS.has(token));
}

function scoreDoc(queryTokens, doc) {
  const docTokens = tokenize([doc.title, doc.content, ...(doc.tags || [])].join(" "));
  const docSet = new Set(docTokens);
  let score = 0;
  for (const token of queryTokens) {
    if (docSet.has(token)) score += 1;
  }
  return score;
}

function searchDocs(query, { minScore = 2 } = {}) {
  const docs = loadDocs();
  const queryTokens = tokenize(query);
  if (queryTokens.length === 0) return null;

  let best = null;
  let bestScore = 0;
  for (const doc of docs) {
    const score = scoreDoc(queryTokens, doc);
    if (score > bestScore) {
      bestScore = score;
      best = doc;
    }
  }

  if (!best || bestScore < minScore) return null;
  return { doc: best, score: bestScore };
}

function formatRagAnswer(doc) {
  const lines = [doc.answer, `Nguon: ${doc.source}`];
  return lines.join("\n");
}

module.exports = {
  searchDocs,
  formatRagAnswer
};
