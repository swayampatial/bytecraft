"use client";
import { createContext, useContext, useEffect, useState } from "react";

type FavoriteContextType = {
  favorite: string[];
  setFavorite: React.Dispatch<React.SetStateAction<string[]>>;
  addfavorite: (id: string) => void;
  removefavorite: (id: string) => void;
};

const FavoriteContext = createContext<FavoriteContextType>({
  favorite: [],
  setFavorite: () => {},
  addfavorite: () => {},
  removefavorite: () => {},
});

const FavoriteProvider = ({ children }: { children: React.ReactNode }) => {
  const [favorite, setFavorite] = useState<string[]>([]);

  const addfavorite = (id: string) => {
    setFavorite((prev) => {
      const updated = [...prev, id];
      return Array.from(new Set(updated)); // prevent duplicates
    });
  };

  const removefavorite = (id: string) => {
    setFavorite((prev) => prev.filter((item) => item !== id));
  };

  useEffect(() => {
    const storedFavorite = localStorage.getItem("favorite");
    if (storedFavorite) {
      setFavorite(JSON.parse(storedFavorite));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favorite", JSON.stringify(favorite));
  }, [favorite]);

  return (
    <FavoriteContext.Provider
      value={{ favorite, setFavorite, addfavorite, removefavorite }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};

const useFavorite = () => useContext(FavoriteContext);

export { FavoriteProvider, useFavorite };
