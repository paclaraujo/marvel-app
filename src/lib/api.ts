import md5 from "md5";
import axios from "axios";
import {
  CharacterApiResponse,
  CharacterComicsApiResponse,
} from "@/types/characters";

const MARVEL_BASE_API_URL = process.env.NEXT_PUBLIC_MARVEL_BASE_API_URL;
const MARVEL_PUBLIC_API_KEY= process.env.NEXT_PUBLIC_MARVEL_PUBLIC_API_KEY
const MARVEL_PRIVATE_API_KEY= process.env.NEXT_PUBLIC_MARVEL_PRIVATE_API_KEY

const getTimestamp = () => Date.now().toString();
const getHash = (timeStamp: string) =>
  md5(`${timeStamp}${ MARVEL_PRIVATE_API_KEY}${MARVEL_PUBLIC_API_KEY}`);

const hash = getHash(getTimestamp());

const query = `ts=${getTimestamp()}&apikey=${MARVEL_PUBLIC_API_KEY}&hash=${hash}`;

export const getCharacters = async (): Promise<CharacterApiResponse> => {
  const {
    data: { data },
  } = await axios.get(
    `${MARVEL_BASE_API_URL}/characters?${query}&limit=20&series=1945`
  );

  return data;
};

export const getCharactersById = async (
  id: string
): Promise<CharacterApiResponse> => {
  const {
    data: { data },
  } = await axios.get(`${MARVEL_BASE_API_URL}/characters/${id}?${query}`);

  return data;
};

export const getCharactersComicByCharacterId = async (
  id: string
): Promise<CharacterComicsApiResponse> => {
  const {
    data: { data },
  } = await axios.get(
    `${MARVEL_BASE_API_URL}/characters/${id}/comics?${query}`
  );

  return data;
};

getCharacters();
