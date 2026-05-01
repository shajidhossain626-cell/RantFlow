import { NextResponse } from "next/server";
import OpenAI from "openai";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { buildHybridPrompt, buildSemanticNLPPrompt } from "@/lib/prompts";

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

// Change to false later when OpenAI credits are added
const FORCE_MOCK = true;

function mockHybridResult(keyword, content) {
  return {
    optimized_content: `This is a Hybrid SEO optimized version for "${keyword}".\n\n${content}\n\nThe content has been improved for keyword placement, readability, meta relevance, and helpful content signals.`,
    seo_title: `${keyword}: Complete SEO Guide`,
    meta_description: `Learn about ${keyword} with this optimized, helpful, and SEO-ready guide.`,
    slug: keyword.toLowerCase().replaceAll(" ", "-"),
    score: 92,
    keyword_density: "1.4%",
    readability_score: 76,
    checks: [
      "Keyword reviewed",
      "Meta description created",
      "Slug optimized",
      "Readability improved",
      "Helpful content signals checked",
    ],
    suggestions: [
      "Add 2 internal links",
      "Add FAQ section",
      "Add one expert quote",
      "Add image ALT text with keyword",
    ],
  };
}
function mockRankMathResult(keyword, content) {
  return {
    optimized_content: `Rank Math optimized version for "${keyword}".\n\n${content}\n\nThis content has been improved with stronger keyword placement, better readability, internal link suggestions, media placeholders, and title optimization.`,
    seo_title: `${keyword}: 7 Proven Tips for Better Results`,
    meta_description: `Discover ${keyword} with this Rank Math optimized guide covering practical tips, SEO structure, and helpful insights.`,
    slug: keyword.toLowerCase().replaceAll(" ", "-"),
    rank_math_score: 94,
    score: 94,
    checks_passed: 27,
    keyword_density: "1.5%",
    suggestions: [
      "Add keyword in first paragraph",
      "Add 2 internal links",
      "Add 2 external authority links",
      "Add image ALT tag with keyword",
      "Add FAQ section for featured snippets",
    ],
  };
}
function mockYoastResult(keyword, content) {
  return {
    optimized_content: `Yoast SEO optimized version for "${keyword}".\n\n${content}\n\nThis version improves keyphrase distribution, readability, transition words, meta tags, content structure, internal links, and image SEO.`,
    seo_title: `${keyword}: 9 Essential Tips for Better SEO`,
    meta_description: `Improve ${keyword} with this Yoast-optimized guide covering readability, SEO structure, and practical tips.`,
    slug: keyword.toLowerCase().replaceAll(" ", "-"),
    yoast_score: 91,
    score: 91,
    checks_passed: 45,
    readability_score: 78,
    keyphrase_density: "1.3%",
    suggestions: [
      "Use keyphrase in the introduction",
      "Add keyphrase in conclusion",
      "Add transition words in 30%+ sentences",
      "Keep paragraphs under 150 words",
      "Add minimum 1 outbound and 1 internal link",
      "Add keyphrase to image ALT text",
    ],
  };
}

function mockSemanticResult(keyword, content) {
  return {
    semanticScore: 88,
    grade: "A",
    searchIntent: {
      detected: "informational",
      intentMatch: 86,
      recommendation:
        "Add more explanatory sections and semantic subtopics to fully satisfy informational search intent.",
    },
    entities: [
      { name: keyword, type: "Concept", prominence: 92, seoValue: "high" },
      { name: "Google Search", type: "Product", prominence: 70, seoValue: "high" },
      { name: "Content Strategy", type: "Concept", prominence: 55, seoValue: "medium" },
    ],
    topicClusters: [
      {
        cluster: "Core Topic",
        coverage: 82,
        missingSubtopics: ["examples", "step-by-step explanation"],
      },
      {
        cluster: "Search Intent",
        coverage: 74,
        missingSubtopics: ["comparison", "FAQ"],
      },
      {
        cluster: "E-E-A-T",
        coverage: 61,
        missingSubtopics: ["expert quote", "author experience"],
      },
    ],
    lsiKeywords: {
      detected: ["SEO content", "search ranking", "organic traffic"],
      missing: [
        "semantic search",
        "entity SEO",
        "topical authority",
        "knowledge graph",
      ],
      recommendation:
        "Add missing semantic keywords naturally to improve topical authority.",
    },
    contentDepth: {
      score: 72,
      wordCount: content.split(/\s+/).filter(Boolean).length,
      uniqueConceptCount: 18,
      assessment: "moderate",
    },
    eeatSignals: {
      experience: 65,
      expertise: 70,
      authoritativeness: 62,
      trustworthiness: 68,
      overallEEAT: 66,
      improvements: [
        "Add author experience",
        "Add external citations",
        "Include real examples",
      ],
    },
    semanticGaps: [
      "Missing deeper entity coverage",
      "Missing FAQ-style semantic answers",
      "Missing authoritative source references",
    ],
    optimizationActions: [
      {
        priority: "high",
        action: `Add a section explaining "${keyword}" using entity-rich language.`,
        impact: "Improves semantic relevance and topical authority.",
      },
      {
        priority: "medium",
        action: "Add FAQ schema and People Also Ask style questions.",
        impact: "Improves featured snippet potential.",
      },
      {
        priority: "low",
        action: "Add more related terms naturally.",
        impact: "Improves semantic breadth.",
      },
    ],
    rewrittenIntro: `${keyword} is an important topic in modern SEO because search engines now understand meaning, entities, and context instead of only exact-match keywords.`,
  };
}

export async function POST(req) {
  try {
    const { userId } = await auth();
    const body = await req.json();

    const {
      mode = "hybrid",
      keyword,
      title = "",
      content,
      meta = "",
      intent = "informational",
    } = body;

    if (!userId) {
      return NextResponse.json(
        { error: "You must be logged in to optimize content." },
        { status: 401 }
      );
    }

    if (!keyword || !content) {
      return NextResponse.json(
        { error: "Keyword and content are required." },
        { status: 400 }
      );
    }

    
let result;

if (FORCE_MOCK || !openai) {

  if (mode === "semantic-nlp") {
    result = mockSemanticResult(keyword, content);

  } else if (mode === "rankmath") {
    result = mockRankMathResult(keyword, content);

  } else if (mode === "yoast") {
    result = mockYoastResult(keyword, content);

  } else {
    result = mockHybridResult(keyword, content);
  }

} else {

  const prompt =
    mode === "semantic-nlp"
      ? buildSemanticNLPPrompt({ keyword, content, intent })
      : buildHybridPrompt({ keyword, content, meta });

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.4,
    response_format: { type: "json_object" },
  });

  result = JSON.parse(completion.choices[0].message.content);
}
    await prisma.optimization.create({
      data: {
        userId,
        mode,
        keyword,
        title: title || "",
        inputContent: content,
        optimizedContent:
          mode === "semantic-nlp"
            ? JSON.stringify(result)
            : result.optimized_content || result.optimizedContent || "",
        seoTitle: result.seo_title || result.titleSuggestion || "",
        metaDescription: result.meta_description || result.optimizedMeta || "",
        slug: result.slug || keyword.toLowerCase().replaceAll(" ", "-"),
        score: Number(
          result.score ||
result.rank_math_score ||
result.yoast_score ||
result.semanticScore ||
result.overallScore ||
0
),
      },
    });

    return NextResponse.json({
      result,
      mock: FORCE_MOCK || !openai,
    });
  } catch (err) {
    console.error("[/api/optimize] error:", err);
    return NextResponse.json(
      { error: "Optimization failed. Please try again." },
      { status: 500 }
    );
  }
}