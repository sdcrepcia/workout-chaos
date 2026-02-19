export type MemeGrade = "A+" | "A" | "B" | "C" | "D" | "F";

export const memes: Record<MemeGrade, { gif: string; caption: string }> = {
  "A+": {
    gif: "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif",
    caption: "YOU ARE A CERTIFIED GYM BEAST. THE GAINS ARE REAL. 🎺🎺🎺",
  },
  A: {
    gif: "https://media.giphy.com/media/3o7TKSjRrfIPjeiVyM/giphy.gif",
    caption: "Absolutely locked in. Coach is proud. Don't skip tomorrow. 💪",
  },
  B: {
    gif: "https://media.giphy.com/media/l3q2K5jinAlChoCLS/giphy.gif",
    caption: "Solid workout... but those last two skips tho. None of my business. 🐸☕",
  },
  C: {
    gif: "https://media.giphy.com/media/QMHoU66sBXqqLqYvGO/giphy.gif",
    caption: "It's fine. Everything is fine. You definitely tried. 🔥",
  },
  D: {
    gif: "https://media.giphy.com/media/l0HlBO7eyXzSZkJri/giphy.gif",
    caption: "You were distracted by your phone the whole time, weren't you. 😒",
  },
  F: {
    gif: "https://media.giphy.com/media/1gRR6VIJwHEsFUlEfO/giphy.gif",
    caption: "The pallbearers are already on their way. Rest in gainz. 💀",
  },
};

export const workoutGifs: Record<string, string[]> = {
  chest: [
    "https://media.giphy.com/media/cKPsQVloxwsPgbpamd/giphy.gif",
    "https://media.giphy.com/media/kkwTHcFUArfAwxfdwK/giphy.gif",
    "https://media.giphy.com/media/t8qNKunPKwtL3rj5Cv/giphy.gif",
  ],
  back: [
    "https://media.giphy.com/media/WrUEswheRd1TR05wtU/giphy.gif",
    "https://media.giphy.com/media/UUn6oTupFoo0T9g6jS/giphy.gif",
    "https://media.giphy.com/media/SieD4F7finpC5Bdal5/giphy.gif",
  ],
  shoulders: [
    "https://media.giphy.com/media/zc8CJZGmlXi7mCVSac/giphy.gif",
    "https://media.giphy.com/media/mkzzJZXQcUZ9SnuKmS/giphy.gif",
    "https://media.giphy.com/media/sb5rNtbPbtchNP8Qp4/giphy.gif",
  ],
  "upper arms": [
    "https://media.giphy.com/media/k31Uh84qNB9jAFhWqm/giphy.gif",
    "https://media.giphy.com/media/WsFX0H7qz5M1o8VpxH/giphy.gif",
    "https://media.giphy.com/media/dAy49uNPslC0TmuNa4/giphy.gif",
  ],
  legs: [
    "https://media.giphy.com/media/1ymHxRk5KLpTrJQZ4x/giphy.gif",
    "https://media.giphy.com/media/bSfzQitKhtoGnM9oC8/giphy.gif",
    "https://media.giphy.com/media/2mLudFb8CoqhKp7n9Q/giphy.gif",
  ],
  core: [
    "https://media.giphy.com/media/22fEqrD3t3gWWmhksB/giphy.gif",
    "https://media.giphy.com/media/ZcteOOkovIh9HaVFjT/giphy.gif",
    "https://media.giphy.com/media/ZYWYS0w1uyB3h55w9h/giphy.gif",
  ],
  cardio: [
    "https://media.giphy.com/media/lep2wxW2wxAI9PbhPO/giphy.gif",
    "https://media.giphy.com/media/pWXmCJm5ewMco/giphy.gif",
    "https://media.giphy.com/media/LY5RJLumPbxq8yczqp/giphy.gif",
  ],
};

export function getWorkoutGif(bodyPart: string): string {
  const gifs = workoutGifs[bodyPart.toLowerCase()] ?? workoutGifs.chest;
  return gifs[Math.floor(Math.random() * gifs.length)];
}

export function getMemeForGrade(grade: string): { gif: string; caption: string } {
  const validGrades: MemeGrade[] = ["A+", "A", "B", "C", "D", "F"];
  const match = validGrades.find((g) => g === grade);
  return memes[match ?? "F"];
}
