import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function POST(req: Request) {
  try {
    console.log("Grade route hit");
    console.log("OpenAI key exists:", !!process.env.OPENAI_API_KEY);

    const { log } = await req.json();
    console.log("Workout log received:", log);

    const exerciseList = log
      .map((ex: { name: string; reps: string; target: string }) =>
        `- ${ex.name} (${ex.target}): ${ex.reps}`
      )
      .join("\n");

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are a brutally honest but funny gym coach who uses meme culture and internet humor. 
          Grade the user's workout session with a letter grade (A+, A, B, C, D, or F) based on:
          - Variety of muscle groups hit
          - Total volume (number of exercises)
          - Balance between upper and lower body
          
          Respond in JSON with exactly two fields:
          - "grade": one of "A+", "A", "B", "C", "D", "F"
          - "comment": a short 1-2 sentence funny coach comment using meme/internet humor
          
          Be savage but encouraging. Think drill sergeant meets Shrek.`,
        },
        {
          role: "user",
          content: `Here's my workout:\n${exerciseList}\n\nGrade me.`,
        },
      ],
      response_format: { type: "json_object" },
    });

    console.log("GPT response received");
    const result = JSON.parse(completion.choices[0].message.content ?? "{}");
    console.log("Grade result:", result);
    
    return Response.json(result);

  } catch (err) {
    console.error("Grade route error:", err);
    return Response.json({ grade: "F", comment: "Something broke. Much like your gains. 💀" }, { status: 500 });
  }
}
