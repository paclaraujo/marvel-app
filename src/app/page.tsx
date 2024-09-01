"use client";

import { useEffect, useState, useCallback } from "react";

import { Card } from "@/components/Card";
import { Header } from "@/components/Header";
import Image from "next/image";

import { Character } from "@/types/characters";

import { IconHeartFilled, IconSearch, IconX } from "@tabler/icons-react";
import { Loader } from "@/components/Loader";
import { useCharactersController } from "@/hooks/useCharactersController";

const HomePage = () => {
  const {
    characters,
    error,
    isLoading,
    handleFilterByName,
    handleOrderByName,
    handleToggleFavorite,
    handleShowOnlyFavorites,
    setError
  } = useCharactersController();

  return (
    <main className="container px-8 flex flex-col items-center">
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
        <div className="flex flex-col md:flex-row gap-4 md:items-center items-start w-full ml-4">
          <label className="text-red-300 flex gap-2">
            <Image
              src={`/assets/ic_heroi.svg`}
              alt={""}
              width={10}
              height={10}
            />
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
            className="flex items-center justify-center gap-2 hover:border-b-red-200 hover:border-b py-3 text-red-300"
            onClick={handleShowOnlyFavorites}
          >
            <IconHeartFilled className="text-red-400 size-4" />
            Somente favoritos
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-300 text-neutral-100">
          {" "}
          {error}{" "}
          <button onClick={() => setError("")}>
            <IconX />
          </button>
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 my-10 justify-center items-center min-h-[30dvh]">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {characters.map((character: Character) => (
              <Card
                onClick={handleToggleFavorite}
                key={character.id}
                character={character}
              />
            ))}
          </>
        )}
      </div>
    </main>
  );
};

export default HomePage;
