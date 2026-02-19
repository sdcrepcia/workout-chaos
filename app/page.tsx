"use client";
import { useState, useRef, useEffect } from "react";
import SpinWheel from "./components/SpinWheel";
import ExerciseCard from "./components/ExerciseCard";
import WorkoutLog from "./components/WorkoutLog";
import GradeScreen from "./components/GradeScreen";

export type Exercise = {
  name: string;
  gifUrl: string | null;
  target: string;
  reps: string;
};

export default function Home() {
  const [currentExercise, setCurrentExercise] = useState<Exercise | null>(null);
  const [workoutLog, setWorkoutLog] = useState<Exercise[]>([]);
  const [showGrade, setShowGrade] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const gradeRef = useRef<HTMLDivElement>(null);

  const logExercise = () => {
    if (currentExercise) {
      setWorkoutLog((prev) => [...prev, currentExercise]);
      setCurrentExercise(null);
    }
  };

  useEffect(() => {
    if (showGrade && gradeRef.current) {
      gradeRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [showGrade]);

  const handleGradeLoaded = () => {
    setTimeout(() => {
      gradeRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white flex flex-col items-center p-6 gap-6">
      <h1 className="text-4xl font-black tracking-tight mt-4">Workout Chaos</h1>
      <p className="text-gray-400 text-sm">Spin. Lift. Get Judged.</p>

      <SpinWheel setCurrentExercise={setCurrentExercise} spinning={spinning} setSpinning={setSpinning} />

      {currentExercise && (
        <ExerciseCard exercise={currentExercise} onLog={logExercise} onSkip={() => setCurrentExercise(null)} />
      )}

      {workoutLog.length > 0 && (
        <WorkoutLog log={workoutLog} onFinish={() => setShowGrade(true)} />
      )}

      {showGrade && (
        <div ref={gradeRef}>
          <GradeScreen
            log={workoutLog}
            onReset={() => { setWorkoutLog([]); setShowGrade(false); }}
            onGradeLoaded={handleGradeLoaded}
          />
        </div>
      )}
    </main>
  );
}
