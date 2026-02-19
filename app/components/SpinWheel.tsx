"use client";
import { Exercise } from "../page";

const MUSCLE_GROUPS = [
  "chest", "back", "shoulders", "upper arms",
  "legs", "core", "cardio"
];

type Props = {
  setCurrentExercise: (ex: Exercise | null) => void;
  spinning: boolean;
  setSpinning: (val: boolean) => void;
};

export default function SpinWheel({ setCurrentExercise, spinning, setSpinning }: Props) {

  async function handleSpin() {
    setSpinning(true);
    setCurrentExercise(null);

    const muscleGroup = MUSCLE_GROUPS[Math.floor(Math.random() * MUSCLE_GROUPS.length)];

    await new Promise((resolve) => setTimeout(resolve, 2000));

    try {
      const res = await fetch("/api/exercise", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ muscleGroup }),
      });
      const exercise = await res.json();
      setCurrentExercise(exercise);
    } catch (err) {
      console.error("Failed to fetch exercise:", err);
    } finally {
      setSpinning(false);
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className={`w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-gray-800 flex items-center justify-center text-5xl sm:text-6xl transition-transform ${
          spinning ? "animate-spin" : ""
        }`}
      >
        💪
      </div>
      <button
        onClick={handleSpin}
        disabled={spinning}
        className="bg-yellow-500 hover:bg-yellow-400 text-black font-black px-6 sm:px-8 py-3 rounded-2xl text-base sm:text-lg disabled:opacity-50"
      >
        {spinning ? "Spinning... 🎰" : "SPIN 🎰"}
      </button>
    </div>
  );
}
