"use client";
import { useEffect, useRef, useState } from "react";
import { Exercise } from "../page";

type Props = {
  exercise: Exercise;
  onLog: () => void;
  onSkip: () => void;
};

export default function ExerciseCard({ exercise, onLog, onSkip }: Props) {
  const [visible, setVisible] = useState(false);
  const prevNameRef = useRef<string | null>(null);

  useEffect(() => {
    if (exercise.name !== prevNameRef.current) {
      setVisible(false);
      prevNameRef.current = exercise.name;

      const timer = setTimeout(() => setVisible(true), 50);

      if (navigator.vibrate) {
        navigator.vibrate(80);
      }

      return () => clearTimeout(timer);
    }
  }, [exercise]);

  return (
    <div
      className={`transition-all duration-500 ease-out
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
        bg-gray-800 rounded-2xl p-6 w-full max-w-md shadow-xl`}
    >
      <h2 className="font-bebas text-4xl text-yellow-400 tracking-wide">
        {exercise.name}
      </h2>
      <p className="text-gray-300 mt-1 text-sm uppercase tracking-widest">
        {exercise.target}
      </p>
      {exercise.gifUrl && (
        <img
          src={exercise.gifUrl}
          alt={exercise.name}
          className="w-full rounded-xl mt-4"
        />
      )}
      {exercise.description && (
        <p className="text-white mt-4 leading-relaxed">{exercise.description}</p>
      )}
      <p className="text-yellow-300 font-bold mt-3">{exercise.reps}</p>
      <div className="flex gap-3 mt-5">
        <button
          onClick={onLog}
          className="flex-1 bg-yellow-500 hover:bg-yellow-400 text-black font-black py-3 rounded-2xl"
        >
          ✅ Done
        </button>
        <button
          onClick={onSkip}
          className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded-2xl"
        >
          ⏭️ Skip
        </button>
      </div>
    </div>
  );
}
