"use client";
import { useEffect, useRef, useState } from "react";
import { Exercise } from "../page";

type Props = {
  exercise: Exercise;
};

export default function ExerciseCard({ exercise }: Props) {
  const [visible, setVisible] = useState(false);
  const prevNameRef = useRef<string | null>(null);

  useEffect(() => {
    if (exercise.name !== prevNameRef.current) {
      // Reset first so re-triggering animation works on new exercise
      setVisible(false);
      prevNameRef.current = exercise.name;

      const timer = setTimeout(() => setVisible(true), 50);

      // Haptic feedback on mobile
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
        {exercise.muscle}
      </p>
      <p className="text-white mt-4 leading-relaxed">{exercise.instructions}</p>
    </div>
  );
}
