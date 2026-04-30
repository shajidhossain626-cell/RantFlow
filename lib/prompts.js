// ─── Hybrid SEO Prompt ────────────────────────────────────────────────────────
export function buildHybridPrompt({ keyword, content, meta }) {
  return `You are an expert SEO analyst. Analyze the following content for the target keyword and return a JSON object only — no markdown, no explanation.

Target Keyword: "${keyword}"
Meta Description: "${meta || "Not provided"}"
Content:
"""
${content}
"""

Return this exact JSON shape:
{
  "overallScore": <0–100 integer>,
  "grade": "<A+|A|B+|B|C|D|F>",
  "keywordDensity": "<percentage string e.g. 1.4%>",
  "readabilityScore": <0–100>,
  "suggestions": ["<string>", "<string>", "<string>", "<string>", "<string>"],
  "optimizedMeta": "<improved meta description under 160 chars>",
  "titleSuggestion": "<SEO-optimized title tag>",
  "strengths": ["<string>", "<string>"],
  "weaknesses": ["<string>", "<string>"]
}`;
}

// ─── Semantic NLP SEO Prompt ──────────────────────────────────────────────────
export function buildSemanticNLPPrompt({ keyword, content, intent }) {
  return `You are a senior semantic SEO specialist and NLP content strategist. Analyze the content below through the lens of how modern search engines understand meaning, entities, and topical authority. Return ONLY a valid JSON object — no markdown, no explanation, no preamble.

Primary Keyword / Topic: "${keyword}"
Search Intent: "${intent || "informational"}"
Content:
"""
${content}
"""

Return this exact JSON shape:
{
  "semanticScore": <0–100 integer — overall NLP alignment score>,
  "grade": "<A+|A|B+|B|C|D|F>",
  "searchIntent": {
    "detected": "<informational|navigational|transactional|commercial>",
    "intentMatch": <0–100 — how well content matches the detected intent>,
    "recommendation": "<string>"
  },
  "entities": [
    { "name": "<entity name>", "type": "<Person|Place|Organization|Concept|Product|Event>", "prominence": <0–100>, "seoValue": "<high|medium|low>" }
  ],
  "topicClusters": [
    { "cluster": "<cluster name>", "coverage": <0–100>, "missingSubtopics": ["<string>", "<string>"] }
  ],
  "lsiKeywords": {
    "detected": ["<term>", "<term>", "<term>", "<term>", "<term>"],
    "missing": ["<term>", "<term>", "<term>", "<term>", "<term>"],
    "recommendation": "<string>"
  },
  "contentDepth": {
    "score": <0–100>,
    "wordCount": <integer>,
    "uniqueConceptCount": <integer>,
    "assessment": "<thin|moderate|comprehensive|authoritative>"
  },
  "eeatSignals": {
    "experience": <0–100>,
    "expertise": <0–100>,
    "authoritativeness": <0–100>,
    "trustworthiness": <0–100>,
    "overallEEAT": <0–100>,
    "improvements": ["<string>", "<string>"]
  },
  "semanticGaps": ["<string>", "<string>", "<string>"],
  "optimizationActions": [
    { "priority": "<high|medium|low>", "action": "<string>", "impact": "<string>" }
  ],
  "rewrittenIntro": "<A semantically enriched version of the first 2–3 sentences of the content, using more entities and NLP-rich language>"
}`;
}
