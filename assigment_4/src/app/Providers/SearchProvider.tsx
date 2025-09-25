"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type SearchContextType = {
  searchText: string;
  setSearchText: (val: string) => void;
  isSorted: boolean;
  setSortedIcon: (val: boolean) => void;
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchText, setSearchText] = useState("");
  const [isSorted, setSortedIcon] = useState(false);
  console.log("Search Provider", searchText);

  return (
    <SearchContext.Provider
      value={{ searchText, setSearchText, isSorted, setSortedIcon }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) throw new Error("useSearch must be used inside SearchProvider");
  return context;
}
