"use client";
import { useEffect, useState } from "react";
import { Exercise } from "../page";
import { getMemeForGrade } from "../../lib/memes";

type Props = {
  log: Exercise[];
  onReset: () => void;
  onGradeLoaded: () => void;
};

export default function GradeScreen({ log, onReset, onGradeLoaded }: Props) {
  const [grade, setGrade] = useState<string | null>(null);
  const [comment, setComment] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGrade() {
      try {
        const res = await fetch("/api/grade", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ log }),
        });
        const data = await res.json();
        setGrade(data.grade);
        setComment(data.comment);
      } catch (err) {
        console.error("Grade fetch error:", err);
        setGrade("F");
        setComment("Something broke. Much like your will to exercise. 💀");
      } finally {
        setLoading(false);
        onGradeLoaded();
      }
    }
    fetchGrade();
  }, []);

  const meme = grade ? getMemeForGrade(grade) : null;

  return (
    <div className="w-full max-w-sm sm:max-w-md bg-gray-900 rounded-2xl p-4 sm:p-6 flex flex-col items-center gap-4 text-center">
      {loading ? (
        <>
          <p className="text-lg sm:text-xl font-bold animate-pulse">⏳ GPT is judging you...</p>
          <p className="text-gray-400 text-sm">This may take a second</p>
        </>
      ) : (
        <>
          <h2 className="text-5xl sm:text-6xl font-black">{grade}</h2>
          {meme && (
            <>
              <img src={meme.gif} alt="reaction meme" className="rounded-xl w-56 sm:w-72" />
              <p className="text-base sm:text-lg font-bold">{meme.caption}</p>
            </>
          )}
          {comment && (
            <p className="text-gray-300 text-sm bg-gray-800 rounded-xl p-3 italic">"{comment}"</p>
          )}
          <button
            onClick={onReset}
            className="mt-2 w-full bg-yellow-500 hover:bg-yellow-400 text-black font-black py-2 rounded-xl text-sm sm:text-base"
          >
            🔄 Try Again (You Need It)
          </button>
        </>
      )}
    </div>
  );
}
