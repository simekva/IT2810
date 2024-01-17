import { makeVar } from "@apollo/client";

export const globalGenreVar = makeVar < string | null > (null);
export const globalSortOrderVar = makeVar < string | null > (null);
export function getGlobalGenre() {
    const genre = localStorage.getItem('selectedGenre') || globalGenreVar();
    return genre === null ? 'Action' : genre;
  }
  
