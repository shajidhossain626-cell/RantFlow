import { NextResponse } from "next/server";
import OpenAI from "openai";
import { buildHybridPrompt, buildSemanticNLPPrompt } from "@/lib/prompts";

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

// ─── Mock fallbacks ────────────────────────────────────────────────────────────
function mockHybridResult(keyword) {
  return {
    overallScore: 74,
    grade: "B+",
    keywordDensity: "1.6%",
    readabilityScore: 68,
    suggestions: [
      `Use "${keyword}" in your H1 tag.`,
      "Add internal links to related content.",
      "Increase content length to 1,500+ words.",
      "Add an FAQ section for featured snippets.",
      "Compress images and add descriptive alt text.",
    ],
    optimizedMeta: `Learn everything about ${keyword}. Expert guide covering best practices, examples, and actionable tips for 2025.`,
    titleSuggestion: `${keyword}: Complete Guide (2025)`,
    strengths: ["Good paragraph structure", "Relevant topic coverage"],
    weaknesses: ["Thin content depth", "Missing LSI keywords"],
  };
}

function mockSemanticResult(keyword) {
  return {
    semanticScore: 71,
    grade: "B",
    searchIntent: {
      detected: "informational",
      intentMatch: 78,
      recommendation: "Add more definitional and explanatory content to fully satisfy informational intent.",
    },
    entities: [
      { name: keyword, type: "Concept", prominence: 90, seoValue: "high" },
      { name: "Google Search", type: "Product", prominence: 60, seoValue: "high" },
      { name: "Content Strategy", type: "Concept", prominence: 45, seoValue: "medium" },
    ],
    topicClusters: [
      { cluster: "Core Concept", coverage: 80, missingSubtopics: ["historical context", "future trends"] },
      { cluster: "Practical Application", coverage: 55, missingSubtopics: ["step-by-step process", "tools & resources"] },
      { cluster: "Expert Insights", coverage: 30, missingSubtopics: ["case studies", "expert quotes", "statistics"] },
    ],
    lsiKeywords: {
      detected: ["content optimization", "search ranking", "organic traffic", "on-page SEO"],
      missing: ["semantic search", "natural language processing", "knowledge graph", "entity SEO", "topical authority"],
      recommendation: "Incorporate missing LSI terms naturally throughout the content to expand semantic coverage.",
    },
    contentDepth: {
      score: 62,
      wordCount: 480,
      uniqueConceptCount: 14,
      assessment: "moderate",
    },
    eeatSignals: {
      experience: 40,
      expertise: 55,
      authoritativeness: 35,
      trustworthiness: 50,
      overallEEAT: 45,
      improvements: [
        "Add author credentials or bio section.",
        "Reference authoritative external sources with citations.",
      ],
    },
    semanticGaps: [
      "No mention of how search engines use NLP to parse this topic.",
      "Missing subtopic coverage on related entities Google associates with this keyword.",
      "No structured data / schema markup mentioned to reinforce entity signals.",
    ],
    optimizationActions: [
      { priority: "high", action: `Add a dedicated section on "${keyword} and semantic search" with entity-rich language.`, impact: "Significantly improves topical authority score." },
      { priority: "high", action: "Include at least 3 credible external citations (studies, .gov, .edu).", impact: "Boosts E-E-A-T trustworthiness signal." },
      { priority: "medium", action: "Expand to 1,200+ words covering all topic cluster gaps.", impact: "Improves content depth assessment to 'comprehensive'." },
      { priority: "medium", action: "Add FAQ schema targeting People Also Ask questions.", impact: "Increases SERP feature eligibility." },
      { priority: "low", action: "Use more specific named entities (people, organizations, tools) in context.", impact: "Strengthens knowledge graph alignment." },
    ],
    rewrittenIntro: `${keyword} represents a foundational concept in modern search engine optimization, deeply intertwined with how Google's natural language processing systems — including BERT, MUM, and the Knowledge Graph — evaluate content relevance. Understanding ${keyword} requires examining both its semantic relationship to related entities and its role within a broader topical cluster that search engines use to determine authority.`,
  };
}

// ─── Route Handler ─────────────────────────────────────────────────────────────
export async function POST(req) {
  try {
    const body = await req.json();
    const { mode = "hybrid", keyword, content, meta, intent } = body;

    if (!keyword || !content) {
      return NextResponse.json(
        { error: "keyword and content are required." },
        { status: 400 }
      );
    }

    // Build the correct prompt based on mode
    let prompt;
    if (mode === "semantic-nlp") {
      prompt = buildSemanticNLPPrompt({ keyword, content, intent });
    } else {
      prompt = buildHybridPrompt({ keyword, content, meta });
    }

    // If no OpenAI key, return mock data
    if (!openai) {
      const mock = mode === "semantic-nlp"
        ? mockSemanticResult(keyword)
        : mockHybridResult(keyword);
      return NextResponse.json({ result: mock, mock: true });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
      response_format: { type: "json_object" },
    });

    const raw = completion.choices[0].message.content;
    const result = JSON.parse(raw);

    return NextResponse.json({ result, mock: false });
  } catch (err) {
    console.error("[/api/optimize] error:", err);
    return NextResponse.json(
      { error: "Optimization failed. Please try again." },
      { status: 500 }
    );
  }
}
