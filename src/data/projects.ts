// src/data/projects.ts

import { Project } from "../types/index";
import movieSearch from "../assets/moviesearch.png";
import weatherApp from "../assets/weatherapp.png";

export const projects: Project[] = [
  {
    name: "Movie Search App",
    image: movieSearch,
    link: "https://conorhutchins.github.io/movie-search/",
    repo: "https://github.com/conorhutchins/movie-search",
    techStack: ["React", "TypeScript", "CSS Modules"],
  },
  {
    name: "Weather App",
    image: weatherApp,
    link: "https://conorhutchins.github.io/personal-weather-app/",
    repo: "https://github.com/conorhutchins/personal-weather-app",
    techStack: ["Node.js", "Express", "MongoDB"],
  },
];
