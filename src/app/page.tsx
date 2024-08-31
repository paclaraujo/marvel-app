"use client";

import { useEffect, useState, useCallback } from "react";

import Card from "@/components/Card/Card";
import Header from "@/components/Header/Header";
import Image from "next/image";

import { Character } from "@/types/characters";

import { getCharacters } from "@/lib/api";
import { IconHeartFilled, IconSearch } from "@tabler/icons-react";
import Footer from "@/components/Footer/Footer";

const HomePage = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [initialCharacters, setInitialCharacters] = useState<Character[]>([]);
  const [error, setError] = useState("");

  const fetchCharacters = useCallback(async () => {
    try {
      const { results } = await getCharacters();
      setCharacters(results);
      setInitialCharacters(results);
    } catch (e) {
      setError("Erro ao carregar od heróis");
    }
  }, []);

  useEffect(() => {
    fetchCharacters();
  }, [fetchCharacters]);

  const handleFilterByName = (searchName: string) => {
    const filteredByName = searchName
      ? initialCharacters.filter((character) =>
          character.name.toLowerCase().includes(searchName.toLowerCase())
        )
      : initialCharacters;

    setCharacters(filteredByName);
  };

  const handleOrderByName = (order: string) => {
    const sortedCharacters = [...characters].sort((a, b) =>
      order === "a-z"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );
    setCharacters(sortedCharacters);
  };

  const handleToggleFavorite = (id: number) => {
    const canFavorite = characters.filter((char) => char.favorite);

    if (canFavorite.length < 5) {
      const updateCharacters = characters.map((character) =>
        character.id === id ? { ...character, favorite: true } : character
      );
      setCharacters(updateCharacters);
    } else {
      setError("Você só pode favoritar 5 heróis");
    }
  };

  const handleShowOnlyFavorites = () => {
    const favorites = characters.filter((character) => character.favorite);
    setCharacters(favorites);
  };

  return (
    <main className="container px-6 flex flex-col items-center">
      <Header />
      <div className="flex gap-6 bg-red-50 w-full md:w-[65dvw] rounded-full py-3 px-4 border border-red-100 placeholder:text-red-300">
        <IconSearch className="text-red-400" />
        <input
          aria-labelledby="Pesquisar pelo nome do herói"
          type="text"
          className="placeholder:text-red-300 bg-red-50 w-full"
          placeholder="Procure por heróis"
          onChange={(e) => handleFilterByName(e.target.value)}
        />
      </div>

      <div className="w-full flex flex-col-reverse md:flex-row mt-6 gap-4 items-center justify-center md:justify-between">
        <p className="text-neutral-400">
          Encontrados {characters.length} heróis
        </p>
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <label className="text-red-300 flex gap-2">
            <Image src={`/assets/ic_heroi.svg`} alt={""} width={10} height={10} />
            Ordenar por nome - A-Z
            <input
              aria-labelledby="Ordenar heróis de a-z"
              type="radio"
              name="order"
              value="a-z"
              defaultChecked
              onChange={(e) => handleOrderByName(e.target.value)}
            />
            <input
              aria-labelledby="Ordenar heróis de z-a"
              type="radio"
              name="order"
              value="z-a"
              onChange={(e) => handleOrderByName(e.target.value)}
            />
          </label>

          <button
            className="flex items-center justify-center gap-4 hover:bg-red-50 py-3 text-red-300 rounded-full"
            onClick={handleShowOnlyFavorites}
          >
            <IconHeartFilled className="text-red-400 size-4" />
            Somente favoritos
          </button>
        </div>
      </div>

      {!characters.length ? (
        <p>Carregando...</p>
      ) : (
        <>
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 my-10 justify-center">
            {characters.map((character: Character) => (
              <Card
                onClick={handleToggleFavorite}
                key={character.id}
                character={character}
              />
            ))}
          </div>
        </>
      )}
      <Footer />
    </main>
  );
};

export default HomePage;
