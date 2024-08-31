
import Image from "next/image";

export const Header = () => {
  return (
    <div className="flex flex-col justify-center items-center p-6">
      <figure>
        <Image
          src={`/assets/logo.svg`}
          alt={'marvel logo'}
          width={200}
          height={200}
        />
      </figure>
      <h1 className="uppercase text-xl font-bold mt-6">Explore o universo</h1>
      <p className="text-xs text-neutral-500 mt-4 text-center">Mergulhe no domínio deslumbrante de todos os personagens clássicos que você ama - e aqueles que você descobrirá em breve!</p>
    </div>
  );
};
