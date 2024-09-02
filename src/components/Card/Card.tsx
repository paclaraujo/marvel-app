import { Character } from "@/types/characters";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

interface CardProps {
  character: Character;
  onClick: (id: number) => void;
}

export const Card = ({ character, onClick }: CardProps) => {
  return (
    <div className="bg-base-200 bg-neutral-50 col-span-1">
      <figure className="w-full h-[25dvh] relative">
        <Image
          src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
          alt={character.name}
          fill
        />
      </figure>
      <div className="border-t-4 border-t-red-500 flex justify-between pt-6 pb-2 items-center gap-2">
        <Link
          href={`character/${character.id}`}
          className="font-bold text-neutral-600 text-sm"
        >
          {character.name}
        </Link>
        <button className="text-red-400" onClick={() => onClick(character.id)}>
          {character.favorite ? <IconHeartFilled  /> : <IconHeart />}
        </button>
      </div>
    </div>
  );
};
