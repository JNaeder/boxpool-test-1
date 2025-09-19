import type { Game } from "./types/gameTypes";
import type { GameInfo, Boxpool } from "./types/boxpoolTypes";
import type { User } from "./types/userTypes";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./lib/firebase";

export const formatDate = (dateString: string) => {
  const newDate = new Date(dateString);
  const formatted = newDate.toLocaleString("en-US", {
    dateStyle: "short",
    timeStyle: "short",
  });
  return formatted;
};

export const generateRandom10Numbers = () => {
  const numbers = Array.from({ length: 10 }, (_, i) => i);
  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }
  return numbers;
};

export const gameToGameInfo = (game: Game): GameInfo | undefined => {
  const competition = game.competitions[0];
  const awayTeam = competition.competitors.find(
    (team) => team.homeAway === "away"
  );
  const homeTeam = competition.competitors.find(
    (team) => team.homeAway === "home"
  );

  if (homeTeam && awayTeam) {
    return {
      date: competition.date,
      teams: {
        awayTeam: {
          name: awayTeam.team.displayName,
          abbreviation: awayTeam.team.abbreviation,
          primaryColor: awayTeam.team.color,
          logo: awayTeam.team.logo,
        },
        homeTeam: {
          name: homeTeam.team.displayName,
          abbreviation: homeTeam.team.abbreviation,
          primaryColor: homeTeam.team.color,
          logo: homeTeam.team.logo,
        },
      },
    } as GameInfo;
  }
};

export const getAllUserBoxPoolData = async (currentUser: User) => {
  if (!currentUser) return;
  const q = query(
    collection(db, "boxpools"),
    where("userId", "==", currentUser.uid)
  );

  const querySnapshot = await getDocs(q);
  const boxpoolsArray = querySnapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() } as Boxpool;
  });
  return boxpoolsArray;
};
