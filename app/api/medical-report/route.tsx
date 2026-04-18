import { NextRequest, NextResponse } from "next/server";

import { openai } from "@/config/OpenAiModel";
import { SessionChatTable } from "@/config/schema";

import { db } from "@/config/db";
import { eq } from "drizzle-orm";
const REPORT_GEN_PROMPT = `
You are a medical AI assistant.

Generate a COMPLETE medical report from the conversation.

IMPORTANT:
- Do NOT leave any field empty
- If missing, infer a reasonable value

Return ONLY valid JSON:

{
  "chiefComplaint": "main problem in one sentence",
  "summary": "2-3 sentence summary",
  "symptoms": ["symptom1", "symptom2"],
  "duration": "e.g., 2 days / 1 week",
  "severity": "mild / moderate / severe",
  "medicationsMentioned": ["med1", "med2"],
  "recommendations": ["rec1", "rec2"]
}
`;
export async function POST(req:NextRequest){
    const {sessionId,sessionDetail,messages}=await req.json();
    try{
        const conversation = messages
  .map((m:any) => `${m.role}: ${m.text}`)
  .join("\n");

const UserInput = `
Doctor Info: ${JSON.stringify(sessionDetail)}

Conversation:
${conversation}
`;
        const completion = await openai.chat.completions.create({
            model: "google/gemini-2.5-flash-lite-preview-09-2025",
            messages: [
            {role:'system',content:REPORT_GEN_PROMPT},
              { role: "user", content:  UserInput}
            ],
          });
          const rawResp = completion.choices[0].message;
// @ts-ignore
  const Resp=rawResp.content.trim().replace('```json','').replace('```','')
  let JSONResp = {};

try {
  JSONResp = JSON.parse(Resp || "{}");
} catch (err) {
  console.log("JSON parse error:", Resp);
}

  const result=await db.update(SessionChatTable).set({
    report:JSONResp,
    conversation:messages
  }).where(eq(SessionChatTable.sessionId,sessionId));

  return NextResponse.json(JSONResp);
    }catch(e){
       return NextResponse.json(e);
    }
}