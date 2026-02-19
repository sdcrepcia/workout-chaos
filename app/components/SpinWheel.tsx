"use client";
import { useRef, useState } from "react";
import { Exercise } from "../page";

const MUSCLE_GROUPS = [
  "chest", "back", "shoulders", "upper arms",
  "legs", "core", "cardio"
];

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

type Props = {
  setCurrentExercise: (ex: Exercise | null) => void;
  spinning: boolean;
  setSpinning: (val: boolean) => void;
};

export default function SpinWheel({ setCurrentExercise, spinning, setSpinning }: Props) {
  const muscleQueueRef = useRef<string[]>([]);
  const seenExercisesRef = useRef<Set<string>>(new Set());

  function getNextMuscleGroup(): string {
    if (muscleQueueRef.current.length === 0) {
      muscleQueueRef.current = shuffleArray(MUSCLE_GROUPS);
    }
    return muscleQueueRef.current.shift()!;
  }

  async function fetchExercise(muscleGroup: string): Promise<Exercise | null> {
    const res = await fetch("/api/exercise", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ muscleGroup }),
    });
    return res.json();
  }

  async function handleSpin() {
    setSpinning(true);
    setCurrentExercise(null);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    try {
      const muscleGroup = getNextMuscleGroup();

      let exercise: Exercise | null = null;
      let attempts = 0;

      while (attempts < 5) {
        exercise = await fetchExercise(muscleGroup);
        if (exercise && !seenExercisesRef.current.has(exercise.name)) {
          seenExercisesRef.current.add(exercise.name);
          break;
        }
        attempts++;
      }

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
