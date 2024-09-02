import md5 from "md5";
import axios from "axios";
import {
  Characters,
  CharacterComic,
  Comics,
} from "@/types/characters";

const MARVEL_BASE_API_URL = process.env.NEXT_PUBLIC_MARVEL_BASE_API_URL;
const MARVEL_PUBLIC_API_KEY = process.env.NEXT_PUBLIC_MARVEL_PUBLIC_API_KEY;
const MARVEL_PRIVATE_API_KEY = process.env.NEXT_PUBLIC_MARVEL_PRIVATE_API_KEY;

const getTimestamp = () :string => Date.now().toString();
const getHash = (timeStamp: string) =>
  md5(`${timeStamp}${MARVEL_PRIVATE_API_KEY}${MARVEL_PUBLIC_API_KEY}`);

const hash = getHash(getTimestamp());
const query = `ts=${getTimestamp()}&apikey=${MARVEL_PUBLIC_API_KEY}&hash=${hash}`;

export const getCharacters = async (): Promise<Characters> => {
  const {
    data: { data },
  } = await axios.get(
    `${MARVEL_BASE_API_URL}/characters?${query}&limit=20&series=1945`
  );

  return data;
};

function convertToHttps(url: string): string {
  return url.replace(/^http:\/\//i, 'https://');
}

export const getCharactersById = async (
  id: string
): Promise<Characters> => {
  const {
    data: { data },
  } = await axios.get(`${MARVEL_BASE_API_URL}/characters/${id}?${query}`);

  const comics = await Promise.all(
    data.results[0].comics.items.map((item: CharacterComic) => axios.get(`${convertToHttps(item.resourceURI)}?${query}`)
    )
  ) as unknown as Comics[];

  const formattedComics = comics.map(comic => ({...comic.data.data.results[0]}) )

  return { ...data, comics: formattedComics};
};
