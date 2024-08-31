"use client";

import { getCharactersById, getCharactersComicByCharacterId } from "@/lib/api";
import { Character } from "@/types/characters";
import { IconHeartFilled } from "@tabler/icons-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

interface CharacterDetailsPageProps {
  params: {
    id: string;
  };
}

const CharacterDetailsPage = ({ params }: CharacterDetailsPageProps) => {
  const { id } = params;
  const [character, setCharacter] = useState<Character[]>([]);
  const [error, setError] = useState("");

  const fetchCharacterDetail = useCallback(async () => {
    try {
      const { results } = await getCharactersById(id);
      console.log(results)
      setCharacter(results);
    } catch (e) {
      setError("Erro ao carregar od heróis");
    }
  }, []);

  useEffect(() => {
    fetchCharacterDetail();
  }, [fetchCharacterDetail]);

  return (
    <>
      {character.length && (
        <div className="container flex flex-col gap-5 items-center">
          <div className="grid grid-cols-2">
            <article>
              <h1 className="text-3xl font-bold mb-4">{character[0].name} <IconHeartFilled /></h1>
              <p className="text-neutral-500">{character[0].description || 'Nenhuma descrição oferecida pela api'}</p>
            </article>

          <Image
            src={`${character[0].thumbnail.path}.${character[0].thumbnail.extension}`}
            alt={character[0].name}
            width={500}
            height={400}
          />
          </div>
          <div className="max-w-4xl mx-auto text-center">
            <p>{character[0].series.available}</p>
            <p className="text-sm font-light">{character[0].description}</p>
          </div>
          {character[0].comics.items.map((comic) => (
            <h1 key={comic.name}>{comic.name}</h1>
          ))}
        </div>
      )}
    </>
  );
};

export default CharacterDetailsPage;
