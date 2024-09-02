"use client";

import { Card } from "@/components/Card";
import { Header } from "@/components/Header";
import Image from "next/image";

import { Character } from "@/types/characters";

import { IconHeartFilled, IconSearch, IconX } from "@tabler/icons-react";
import { Loader } from "@/components/Loader";
import { useCharactersController } from "@/hooks/useCharactersController";
import { ErrorBadge } from "@/components/ErrorBadge";

const HomePage = () => {
  const {
    characters,
    error,
    isLoading,
    handleFilterByName,
    handleOrderByName,
    handleToggleFavorite,
    handleShowOnlyFavorites,
    setError,
  } = useCharactersController();

  return (
    <main className="container px-8 flex flex-col items-center">
      <Header />
      <div className="bg-red-50 w-full md:w-[65dvw] rounded-full border border-red-100 relative">
        <IconSearch className="text-red-400 absolute top-3 left-3" />
        <input
          aria-label="Pesquisar pelo nome do herói"
          type="text"
          className="placeholder:text-red-300 pl-12 bg-red-50 w-full md:w-[65dvw] rounded-full py-3 px-4"
          placeholder="Procure por heróis"
          onChange={(e) => handleFilterByName(e.target.value)}
        />
      </div>

      <div className="w-full flex flex-col-reverse md:flex-row mt-6 gap-4 items-center justify-center md:justify-between">
        <p className="text-neutral-400">
          Encontrados {characters.length} heróis
        </p>
        <div className="flex flex-col md:flex-row gap-8 md:items-center items-start ml-4 text-red-300">
          <div className="text-red-300 flex gap-2 items-center">
            <Image
              src={`/assets/ic_heroi.svg`}
              alt={""}
              width={10}
              height={10}
            />
            Ordenar por nome - A-Z
            <label
              htmlFor="checkbox"
              className="bg-gray-200 w-10 h-5 rounded-full relative cursor-pointer"
            >
              <input
                type="checkbox"
                className="sr-only peer"
                id="checkbox"
                onChange={(e) => handleOrderByName(e.target.checked)}
                defaultChecked
              />
              <span className="w-2/5 h-4/5 bg-rose-300 absolute rounded-full left-0.5 top-0.5 peer-checked:bg-rose-600 peer-checked:left-[22px] transition-all duration-500"></span>
            </label>
          </div>

          <button
            className="flex items-center justify-center gap-2 hover:border-b-red-200 hover:border-b py-3 text-red-300"
            onClick={handleShowOnlyFavorites}
          >
            <IconHeartFilled className="text-red-400 size-4" />
            Somente favoritos
          </button>
        </div>
      </div>

      {error && <ErrorBadge error={error} setError={setError} />}

      {isLoading ? (
        <div className="min-h-[30dvh] flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 my-10 justify-center min-h-[30dvh]">
          <>
            {characters.map((character: Character) => (
              <Card
                onClick={handleToggleFavorite}
                key={character.id}
                character={character}
              />
            ))}
          </>
        </div>
      )}
    </main>
  );
};

export default HomePage;
