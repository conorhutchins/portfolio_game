// src/data/projects.ts

import { Project } from "../types/index";
import movieSearch from "../assets/moviesearch.png";
import lastManStanding from "../assets/lastManStanding.png";
import weatherApp from "../assets/weatherapp.png";
import foraging from "../assets/foragingBe.png";
import TicTacToe from "../assets/ticTacToe.png";
import nourishAndGather from "../assets/nourishAndGather.jpg";
import gamesBackend from "../assets/gamesBackend.png";
import boardGamesSite from "../assets/boardGamesReviewSite.png";

export const projects: Project[] = [
  {
    name: "Last Man Standing App",
    image: lastManStanding, // You can leave this empty if there's no image yet
    link: "",
    repo: "",
    techStack: ["React", "TypeScript", "Flutter"],
    comingSoon: true,
  },

  {
    name: "Movie Search",
    image: movieSearch,
    link: "https://conorhutchins.github.io/movie-search/",
    repo: "https://github.com/conorhutchins/movie-search",
    techStack: ["React", "TypeScript", "CSS Modules", "HTML", "API Integration"],
  },
  {
    name: "Weather App",
    image: weatherApp,
    link: "https://conorhutchins.github.io/personal-weather-app/",
    repo: "https://github.com/conorhutchins/personal-weather-app",
    techStack: ["React", "Typescript", "HTML", "CSS", "API Integration"],
  },
  {
    name: "Noughts and Crosses",
    image: TicTacToe,
    link: "",
    repo: "https://github.com/conorhutchins/conors_tic_tac_toe",
    techStack: ["React Native", "Typescript", "Redux"],
  },
  {
    name: "Nourish & Gather Frontend",
    image: nourishAndGather,
    link: "",
    repo: "https://github.com/conorhutchins/foragingFE",
    techStack: ["React Native", "Expo Go", "JavaScript"],
  },
  {
    name: "Nourish & Gather API",
    image: foraging,
    link: "",
    repo: "https://github.com/conorhutchins/foragingBE",
    techStack: ["Node.js", "Express", "MongoDB"],
  },
  {
    name: "Conor's Board Games Review Site",
    image: boardGamesSite,
    link: "",
    repo: "https://github.com/conorhutchins/fe-conors-games",
    techStack: ["React", "JavaScript", "Node.js"],
  },
  {
    name: "Conor's Board Games Review REST API",
    image: gamesBackend,
    link: "",
    repo: "https://github.com/conorhutchins/Conors_game",
    techStack: ["JavaScript", "PostgreSQL"],
  },
];
