"use client";
import { Exercise } from "../page";

type Props = {
  log: Exercise[];
  onFinish: () => void;
};

export default function WorkoutLog({ log, onFinish }: Props) {
  return (
    <div className="w-full max-w-sm sm:max-w-md bg-gray-900 rounded-2xl p-4">
      <h2 className="text-lg sm:text-xl font-bold mb-3">📋 Today's Chaos</h2>
      <ul className="flex flex-col gap-2">
        {log.map((ex, i) => (
          <li key={i} className="flex justify-between text-xs sm:text-sm bg-gray-800 rounded-lg px-3 py-2 gap-2">
            <span className="font-medium capitalize truncate">{ex.name}</span>
            <span className="text-gray-400 whitespace-nowrap">{ex.reps}</span>
          </li>
        ))}
      </ul>
      <button
        onClick={onFinish}
        className="mt-4 w-full bg-red-600 hover:bg-red-500 text-white font-bold py-2 rounded-xl text-sm sm:text-base"
      >
        🏁 End Workout & Get Judged
      </button>
    </div>
  );
}
