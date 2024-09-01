"use client"

import { getCharactersById } from '@/lib/api';
import { Character, Comic } from '@/types/characters';
import { useCallback, useEffect, useState } from 'react'

export const useCharactersDetailsController = (id: string) => {

const [isLoading, setIsLoading] = useState(false)
  const [character, setCharacter] = useState<Character[]>([]);
  const [comics, setComics] = useState<Comic[]>([]);
  const [error, setError] = useState("");

  const fetchCharacterDetail = useCallback(async () => {
    setIsLoading(true)
    try {
      const { results, comics } = await getCharactersById(id);
      setCharacter(results);
      setComics(comics);
    } catch (e) {
      setError("Erro ao carregar od heróis");
    }
    setIsLoading(false)
  }, [id]);

  useEffect(() => {
    fetchCharacterDetail();
  }, [fetchCharacterDetail]);

  return {
    fetchCharacterDetail,
    setError,
    isLoading,
    character,
    comics,
    error
  }
}