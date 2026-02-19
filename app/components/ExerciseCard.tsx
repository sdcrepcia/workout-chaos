"use client";
import { Exercise } from "../page";

type Props = {
  exercise: Exercise;
  onLog: () => void;
  onSkip: () => void;
};

export default function ExerciseCard({ exercise, onLog, onSkip }: Props) {
  console.log("Exercise data:", exercise);
  console.log("Description:", exercise.description);
    return (
    <div className="w-full max-w-sm sm:max-w-md bg-gray-900 rounded-2xl p-4 flex flex-col items-center gap-3">
      <h2 className="text-lg sm:text-xl font-bold capitalize text-center">{exercise.name}</h2>
      {exercise.gifUrl ? (
        <img
          src={exercise.gifUrl}
          alt={exercise.name}
          className="rounded-xl w-48 h-48 sm:w-64 sm:h-64 object-cover bg-gray-800"
          onError={(e) => {
            e.currentTarget.src = "https://media.giphy.com/media/3o7TKSjRrfIPjeiVyM/giphy.gif";
            e.currentTarget.onerror = null;
          }}
        />
      ) : (
        <div className="w-48 h-48 sm:w-64 sm:h-64 rounded-xl bg-gray-800 flex items-center justify-center text-4xl">💪</div>
      )}
      <p className="text-gray-400 text-sm">Target: <span className="text-white capitalize">{exercise.target}</span></p>
      <p className="text-xl sm:text-2xl font-black">{exercise.reps}</p>
      {exercise.description && (
        <p className="text-gray-300 text-sm bg-gray-800 rounded-xl p-3 text-center">{exercise.description}</p>
      )}
      <div className="flex gap-3 w-full">
        <button onClick={onSkip} className="flex-1 bg-gray-700 hover:bg-gray-600 py-2 rounded-xl font-bold text-sm sm:text-base">Skip 😤</button>
        <button onClick={onLog} className="flex-1 bg-green-600 hover:bg-green-500 py-2 rounded-xl font-bold text-sm sm:text-base">Log It 💪</button>
      </div>
    </div>
  );
}
