const NEWSLETTER_URL =
  "https://www.linkedin.com/newsletters/the-governed-data-ai-brief-7471567076403388416/";

let fileStats = { subscribers: 1731, updatedAt: "2026-06-20T12:00:00.000Z" };
try {
  fileStats = require("../data/newsletter-stats.json");
} catch {
  /* use inline fallback */
}

function formatCount(n) {
  return n.toLocaleString("en-US") + "+";
}

function parseSubscriberCount(html) {
  if (!html) return null;

  const patterns = [
    /(\d{1,3}(?:,\d{3})+)\s+subscribers?/i,
    /subscriberCount["\s:]+(\d+)/i,
    /"totalSubscribers"\s*:\s*(\d+)/i,
    /"subscriber_count"\s*:\s*(\d+)/i,
  ];

  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match) {
      const value = parseInt(String(match[1]).replace(/,/g, ""), 10);
      if (value >= 100 && value <= 10000000) return value;
    }
  }

  return null;
}

async function fetchLinkedInCount() {
  try {
    const res = await fetch(NEWSLETTER_URL, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
        Accept: "text/html",
      },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return null;
    const html = await res.text();
    return parseSubscriberCount(html);
  } catch {
    return null;
  }
}

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
  res.setHeader("Pragma", "no-cache");

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  let subscribers = fileStats.subscribers;
  let updatedAt = fileStats.updatedAt || new Date().toISOString();
  let source = "config";

  const envCount = parseInt(process.env.NEWSLETTER_SUBSCRIBERS || "", 10);
  if (envCount >= 100) {
    subscribers = envCount;
    updatedAt = new Date().toISOString();
    source = "env";
  } else {
    const scraped = await fetchLinkedInCount();
    if (scraped) {
      subscribers = scraped;
      updatedAt = new Date().toISOString();
      source = "linkedin";
    }
  }

  res.status(200).json({
    subscribers,
    formatted: formatCount(subscribers),
    sourceUrl: NEWSLETTER_URL,
    updatedAt,
    source,
    live: true,
  });
};
