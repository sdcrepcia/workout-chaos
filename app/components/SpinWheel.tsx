"use client";
import { Exercise } from "../page";

const MUSCLE_GROUPS = [
  "chest", "back", "shoulders", "upper arms",
  "upper legs", "lower legs", "waist", "cardio"
];

type Props = {
  setCurrentExercise: (ex: Exercise) => void;
  spinning: boolean;
  setSpinning: (val: boolean) => void;
};

export default function SpinWheel({ setCurrentExercise, spinning, setSpinning }: Props) {

  async function handleSpin() {
  setSpinning(true);
  setCurrentExercise(null); // 👈 clear previous exercise first

  const muscleGroup = MUSCLE_GROUPS[Math.floor(Math.random() * MUSCLE_GROUPS.length)];

  await new Promise((resolve) => setTimeout(resolve, 2000));

  try {
    const res = await fetch("/api/exercise", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ muscleGroup }),
    });
    const exercise = await res.json();
    console.log("Exercise response:", exercise);
    console.log("GIF URL:", exercise.gifUrl);
    setCurrentExercise(exercise);
  } catch (err) {
    console.error("Failed to fetch exercise:", err);
  } finally {
    setSpinning(false); // 👈 always resets even if error
  }
}

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className={`w-64 h-64 rounded-full bg-gray-800 flex items-center justify-center text-6xl transition-transform ${
          spinning ? "animate-spin" : ""
        }`}
      >
        💪
      </div>
      <button
        onClick={handleSpin}
        disabled={spinning}
        className="bg-yellow-500 hover:bg-yellow-400 text-black font-black px-8 py-3 rounded-2xl text-lg disabled:opacity-50"
      >
        {spinning ? "Spinning... 🎰" : "SPIN 🎰"}
      </button>
    </div>
  );
}
