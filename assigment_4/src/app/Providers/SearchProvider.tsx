"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type SearchContextType = {
  searchText: string;
  setSearchText: (val: string) => void;
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchText, setSearchText] = useState("");
  console.log("Search Provider",searchText)
  return (
    <SearchContext.Provider value={{ searchText, setSearchText }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) throw new Error("useSearch must be used inside SearchProvider");
  return context;
}
