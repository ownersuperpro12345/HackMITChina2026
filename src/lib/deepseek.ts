const DEEPSEEK_API_URL = "https://api.deepseek.com/v1/chat/completions";
const DEFAULT_KEY = "sk-62917b57f9644994a4fce29e6c3ef5de";

export function getDeepSeekKey(): string {
  try {
    const userKey = localStorage.getItem("stella-deepseek-key") ?? "";
    return userKey.length > 10 ? userKey : DEFAULT_KEY;
  } catch { return DEFAULT_KEY; }
}

export function setDeepSeekKey(key: string): void {
  try { localStorage.setItem("stella-deepseek-key", key); } catch { /* ignore */ }
}

export function clearDeepSeekKey(): void {
  try { localStorage.removeItem("stella-deepseek-key"); } catch { /* ignore */ }
}

export function hasCustomKey(): boolean {
  try { return (localStorage.getItem("stella-deepseek-key") ?? "").length > 10; } catch { return false; }
}

export function hasDeepSeekKey(): boolean {
  return true; // always available — default key is built-in
}

export interface DeepSeekMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export async function callDeepSeek(
  messages: DeepSeekMessage[],
  options?: { temperature?: number; maxTokens?: number }
): Promise<string> {
  const key = getDeepSeekKey();
  if (!key) throw new Error("NO_KEY");

  const response = await fetch(DEEPSEEK_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages,
      temperature: options?.temperature ?? 0.5,
      max_tokens: options?.maxTokens ?? 3000,
    }),
  });

  if (response.status === 401) throw new Error("INVALID_KEY");
  if (!response.ok) throw new Error(`API_ERROR_${response.status}`);
  const data = await response.json();
  return data.choices?.[0]?.message?.content ?? "";
}

export async function markAnswerWithAI(
  question: string,
  studentAnswer: string,
  markScheme: string,
  maxMarks: number,
  subject: string
): Promise<{ marks: number; feedback: string; improvements: string[] }> {
  const messages: DeepSeekMessage[] = [
    {
      role: "system",
      content: `You are an experienced Cambridge IGCSE and A-Level examiner for ${subject}. 
Mark student answers fairly and constructively, following the mark scheme closely.
Respond ONLY with valid JSON in this exact format:
{
  "marks": <integer 0 to ${maxMarks}>,
  "feedback": "<2-3 sentence examiner feedback>",
  "improvements": ["<improvement 1>", "<improvement 2>", "<improvement 3>"]
}`,
    },
    {
      role: "user",
      content: `Question: ${question}

Mark Scheme (${maxMarks} marks):
${markScheme}

Student Answer:
${studentAnswer || "(no answer given)"}

Mark this answer and respond with JSON only.`,
    },
  ];

  const raw = await callDeepSeek(messages, { temperature: 0.3, maxTokens: 600 });
  try {
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("no json");
    const parsed = JSON.parse(jsonMatch[0]);
    return {
      marks: Math.min(Math.max(0, parseInt(String(parsed.marks), 10) || 0), maxMarks),
      feedback: String(parsed.feedback ?? ""),
      improvements: Array.isArray(parsed.improvements) ? parsed.improvements.slice(0, 3) : [],
    };
  } catch {
    return {
      marks: 0,
      feedback: "Could not parse AI feedback. Please try again.",
      improvements: [],
    };
  }
}

export async function generateLessonContent(
  subtopicName: string,
  topicName: string,
  subjectName: string,
  qualification: string,
  allSubtopics?: string[]
): Promise<{
  explanation: string;
  keyPoints: string[];
  workedExample: string;
  tryYourselfQ: string;
  tryYourselfAnswer: string;
}> {
  const subtopicsList = allSubtopics && allSubtopics.length > 1
    ? `The topic covers ALL of these subtopics — teach EVERY one of them:\n${allSubtopics.map((s, i) => `${i + 1}. ${s}`).join("\n")}`
    : `Subtopic: ${subtopicName}`;

  const messages: DeepSeekMessage[] = [
    {
      role: "system",
      content: `You are an expert ${subjectName} teacher for Cambridge ${qualification} students.
Create a comprehensive, complete lesson that teaches the ENTIRE topic — not just one part.
For each subtopic covered, include: a clear explanation, a worked example with steps, and a practice question.
Use rich HTML formatting. Respond ONLY with valid JSON in this exact structure:
{
  "explanation": "<HTML: teach ALL subtopics. For each use <h3> heading, <p> explanations, <ul><li> for rules, <div class='formula-box'> for formulas. Cover every concept fully. Minimum 600 words total.>",
  "keyPoints": ["<key point 1>", "<key point 2>", "<key point 3>", "<key point 4>", "<key point 5>", "<key point 6>"],
  "workedExample": "<HTML: one fully worked example per subtopic, with clear numbered steps, <strong> for key steps, <div class='formula-box'> for calculations.>",
  "tryYourselfQ": "<A multi-part practice question covering different subtopics — label parts (a), (b), (c) etc.>",
  "tryYourselfAnswer": "<HTML: complete solutions to all parts with full working shown step by step>"
}`,
    },
    {
      role: "user",
      content: `Create a comprehensive lesson for the topic: ${topicName}
Subject: ${subjectName}
Level: ${qualification}

${subtopicsList}

Teach the complete topic — cover every subtopic listed with explanations, examples, and practice questions.`,
    },
  ];

  const raw = await callDeepSeek(messages, { temperature: 0.5, maxTokens: 4000 });
  try {
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("no json");
    return JSON.parse(jsonMatch[0]);
  } catch {
    throw new Error("Failed to parse lesson content");
  }
}
