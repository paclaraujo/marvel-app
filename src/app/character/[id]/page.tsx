"use client";

import { getCharactersById } from "@/lib/api";
import { Character, Comic } from "@/types/characters";
import { IconHeartFilled } from "@tabler/icons-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useCharactersDetailsController } from "@/hooks/useCharactersDetailsController";


interface CharacterDetailsPageProps {
  params: {
    id: string;
  };
}

const CharacterDetailsPage = ({ params }: CharacterDetailsPageProps) => {
  const { id } = params;

  const {character, comics } = useCharactersDetailsController(id)



  return (
    <>
      {character.length && (
        <div className="container flex flex-col gap-5 items-center">
          <div className="grid grid-cols-2">
            <article>
              <h1 className="text-3xl font-bold mb-4">
                {character[0].name} <IconHeartFilled />
              </h1>
              <p className="text-neutral-500">
                {character[0].description ||
                  "Nenhuma descrição oferecida pela api"}
              </p>
              <p>Quadrilhos: {character[0].comics.available}</p>
              <p>Filmes: {character[0].series.available}</p>
              <p>Rating: Estrelinhas</p>
              <p>último quadrinho: aachar info</p>
            </article>

            <Image
              src={`${character[0].thumbnail.path}.${character[0].thumbnail.extension}`}
              alt={character[0].name}
              width={500}
              height={400}
            />
          </div>
          <div className="grid grid-cols-6">
            {comics.map((comic) => (
              <div key={comic.title}>
                <Image
                  src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                  alt={comic.title}
                  width={200}
                  height={200}
                  className="w-[100px] h-[150px]"
                />
                <p className="text-sm" >
                  {comic.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default CharacterDetailsPage;
