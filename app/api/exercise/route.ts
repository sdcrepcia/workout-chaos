import { NextResponse } from "next/server";
import { getWorkoutGif } from "@/lib/memes";
import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const MUSCLE_GROUPS = [
  "chest", "back", "shoulders", "upper arms",
  "legs", "core", "cardio",
];

const BODY_PART_MAP: Record<string, string> = {
  "upper legs": "legs",
  "lower legs": "legs",
  "waist": "core",
};

const BODY_PART_MAP_REVERSE: Record<string, string> = {
  "core": "waist",
};

const LEG_OPTIONS = ["upper legs", "lower legs"];

const REP_SUGGESTIONS = [
  "3 sets of 8 reps",
  "3 sets of 10 reps",
  "4 sets of 6 reps",
  "3 sets of 12 reps",
  "5 sets of 5 reps",
  "2 sets of 15 reps",
  "4 sets of 8 reps",
];

export async function POST(req: Request) {
  try {
    const { muscleGroup } = await req.json();
    const target = muscleGroup ?? MUSCLE_GROUPS[Math.floor(Math.random() * MUSCLE_GROUPS.length)];

    const apiTarget =
      target === "legs"
        ? LEG_OPTIONS[Math.floor(Math.random() * LEG_OPTIONS.length)]
        : BODY_PART_MAP_REVERSE[target] ?? target;

    const exerciseRes = await fetch(
      `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${encodeURIComponent(apiTarget)}?limit=20&offset=0`,
      {
        headers: {
          "X-RapidAPI-Key": process.env.RAPIDAPI_KEY!,
          "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
        },
      }
    );

    const exercises = await exerciseRes.json();
    const random = exercises[Math.floor(Math.random() * exercises.length)];
    const reps = REP_SUGGESTIONS[Math.floor(Math.random() * REP_SUGGESTIONS.length)];
    const normalizedBodyPart = BODY_PART_MAP[random.bodyPart] ?? random.bodyPart;
    const gifUrl = getWorkoutGif(normalizedBodyPart);

    const descriptionRes = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `Give me a 1-2 sentence beginner-friendly description of how to perform the exercise: "${random.name}". Be concise and practical.`,
        },
      ],
      max_tokens: 100,
    });

    const description = descriptionRes.choices[0].message.content ?? "";

    return NextResponse.json({
      name: random.name,
      gifUrl,
      target: normalizedBodyPart,
      reps,
      description,
    });

  } catch (err) {
    console.error("Route error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
