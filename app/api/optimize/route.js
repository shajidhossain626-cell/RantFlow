import { prisma } from "@/lib/prisma";
import OpenAI from 'openai';
import { buildHybridPrompt } from '@/lib/prompts';

function mockResult({ keyword, title, content }) {
  const safeKeyword = keyword || 'target keyword';
  const wordCount = content ? content.trim().split(/\s+/).filter(Boolean).length : 0;
  return {
    optimized_content: `# ${title || `Ultimate Guide to ${safeKeyword}`}

Updated April 2026

If you want better results for ${safeKeyword}, your content needs to be clear, helpful, and structured around the reader's real intent. This optimized draft is designed to be easy to read, SEO-friendly, and suitable for publishing after your final brand edits.

## What This Content Covers

This article explains the topic in a direct way, adds useful context, and organizes the content with short paragraphs. It avoids keyword stuffing while still using ${safeKeyword} naturally.

## Why ${safeKeyword} Matters

Readers usually search this topic because they want a clear answer, practical guidance, or a trustworthy recommendation. A strong article should answer the main question early, then expand with examples, steps, and useful takeaways.

## Recommended Structure

Use one clear H1, multiple H2 sections, short paragraphs, and a simple conclusion. Add internal links to related pages and external links to trusted sources.

## Final Takeaway

The best content is not only optimized for search engines. It should also help the reader make a better decision faster.

[Internal Link: Related Guide]
[External Source: Add authoritative source]`,
    suggested_title: `${safeKeyword}: The Essential Guide for Better SEO Results`,
    suggested_meta_description: `Learn ${safeKeyword} with a clear, SEO-friendly guide built for readers and search performance.`,
    suggested_slug: safeKeyword.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
    seo_score: 88,
    keyword_density: '1.4%',
    word_count: Math.max(wordCount, 220),
    readability_score: 72,
    checks: [
      { label: 'Keyword in SEO title', status: 'passed', note: 'Target keyword is placed near the beginning.' },
      { label: 'Meta description created', status: 'passed', note: 'Under 155 characters.' },
      { label: 'SEO slug generated', status: 'passed', note: 'Short and keyword focused.' },
      { label: 'Helpful structure', status: 'passed', note: 'Content uses H2 sections and short paragraphs.' },
      { label: 'Internal links', status: 'warning', note: 'Replace placeholder with your real website links.' },
      { label: 'External sources', status: 'warning', note: 'Add trusted source URLs before publishing.' }
    ],
    suggestions: [
      'Add 2 real internal links from your website.',
      'Add 2–3 authoritative source links.',
      'Add an original example, case study, or first-hand experience section.',
      'Add images with keyword-rich ALT text.'
    ],
    badge: 'Hybrid SEO Ready'
  };
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { mode, keyword, title, content, tone, contentType } = body;

    if (!keyword || !content) {
      return Response.json({ error: 'Keyword and content are required.' }, { status: 400 });
    }

    if (mode !== 'hybrid') {
      return Response.json({ status: 'coming_soon', message: 'This mode is prepared for future release.' }, { status: 200 });
    }

    if (!process.env.OPENAI_API_KEY) {
     const mock = mockResult({ keyword, title, content });

await prisma.optimization.create({
  data: {
    mode,
    keyword,
    title: title || "",
    inputContent: content,
    optimizedContent: mock.optimized_content || "",
    seoTitle: mock.seo_title || "",
    metaDescription: mock.meta_description || "",
    slug: mock.slug || "",
    score: Number(mock.score) || 0,
  },
});

return Response.json({ result: mock, mock: true });
    }

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You return only strict JSON. No markdown.' },
        { role: 'user', content: buildHybridPrompt({ keyword, title, content, tone, contentType }) }
      ],
      temperature: 0.4,
      response_format: { type: 'json_object' }
    });

    const raw = completion.choices[0]?.message?.content || '{}';
    const result = JSON.parse(raw);
   await prisma.optimization.create({
  data: {
    mode,
    keyword,
    title: title || "",
    inputContent: content,
    optimizedContent: result.optimized_content || "",
    seoTitle: result.seo_title || "",
    metaDescription: result.meta_description || "",
    slug: result.slug || "",
    score: Number(result.score) || 0,
  },
});

return Response.json({ result, mock: false });
  } catch (error) {
    console.error(error);
    return Response.json(
  { error: "AI limit reached. Please try later." },
  
  { status: 500 }
);
  }
  
}
