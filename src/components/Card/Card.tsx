import { Character } from "@/types/characters";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

interface CardProps {
  character: Character;
  onClick: (id: number) => void;
}

const Card = ({ character, onClick }: CardProps) => {
  return (
    <div className="w-min bg-base-200 bg-neutral-50">
      <figure className="h-[200px] w-[200px]">
        <Image
          src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
          alt={character.name}
          width={200}
          height={200}
          className="h-[200px] w-[200px]"
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

export default Card;
