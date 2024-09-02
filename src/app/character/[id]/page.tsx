"use client";

import {
  IconHeartFilled,
  IconSearch,
  IconStar,
  IconX,
} from "@tabler/icons-react";
import Image from "next/image";
import { useCharactersDetailsController } from "@/hooks/useCharactersDetailsController";
import { Loader } from "@/components/Loader";
import { ErrorBadge } from "@/components/ErrorBadge";
import { Rating } from "@/components/Rating";

interface CharacterDetailsPageProps {
  params: {
    id: string;
  };
}

const CharacterDetailsPage = ({ params }: CharacterDetailsPageProps) => {
  const { id } = params;

  const { character, comics, isLoading, error, setError } =
    useCharactersDetailsController(id);

  return (
    <>
      <header className="mt-6 flex">
        <Image
          src={"/assets/logo_menor.svg"}
          alt={"Logo Marvel"}
          width={200}
          height={250}
        />
        <div className="flex gap-6 bg-white w-full md:w-[65dvw] rounded-full py-3 px-4 ">
          <IconSearch className="text-red-400" />
          <input
            aria-label="Pesquisar pelo nome do herói"
            type="text"
            className="placeholder:text-neutral-400 bg-white w-full"
            placeholder="Procure por heróis"
          />
        </div>
      </header>
      {error && <ErrorBadge error={error} setError={setError} />}
      {isLoading && <Loader />}
      {character.length > 0 && (
        <div className="flex flex-col gap-5 items-center mt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 w-[70dvw] relative">
            <div className="absolute inset-0 flex justify-center items-center -z-10">
              <span className="text-[300px] font-bold text-white uppercase">
                {character[0].name.split(" ")[0]}
              </span>
            </div>
            <article className="flex flex-col gap-6">
              <h1 className="text-3xl font-bold mb-4 flex items-center gap-6">
                {character[0].name} <IconHeartFilled className="size-6" />
              </h1>
              <p className="text-neutral-500">
                {character[0].description ||
                  "Nenhuma descrição oferecida pela api"}
              </p>
              <div className="grid grid-cols-2 md:max-w-[25dvw]">
                <div>
                  <h3 className="mb-3">Quadrilhos</h3>
                  <p className="flex gap-4">
                    <Image
                      src={"/assets/ic_quadrinhos.svg"}
                      alt={"Ícone quadrinhos"}
                      width={20}
                      height={20}
                    />
                    {character[0].comics.available}
                  </p>
                </div>
                <div>
                  <h3 className="mb-3">Filmes</h3>
                  <p className="flex gap-4">
                    <Image
                      src={"/assets/ic_trailer.svg"}
                      alt={"Ícone trailer"}
                      width={20}
                      height={20}
                    />
                    {character[0].series.available}
                  </p>
                </div>
              </div>
              <p className="flex items-center gap-4">
                Rating: <Rating rating={5} />{" "}
              </p>
              <p>Último quadrinho </p>
            </article>

            <Image
              src={`${character[0].thumbnail.path}.${character[0].thumbnail.extension}`}
              alt={character[0].name}
              width={500}
              height={400}
            />
          </div>
          <section>
            <h2 className="self-start text-xl text-gray-700 font-bold mb-10 mt-14">
              Últimos lançamentos
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-6 w-[70dvw]">
              {comics.map((comic) => (
                <div key={comic.title} className="mb-3">
                  <Image
                    src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                    alt={comic.title}
                    width={200}
                    height={200}
                    className="w-[100px] h-[150px]"
                  />
                  <p className="text-sm font-bold text-ellipsis w-[100px]">
                    {comic.title}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default CharacterDetailsPage;
