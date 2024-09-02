"use client"

import { getCharacters } from '@/lib/api';
import { Character } from '@/types/characters';
import { useCallback, useEffect, useState } from 'react'

export const useCharactersController = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [characters, setCharacters] = useState<Character[]>([]);
  const [initialCharacters, setInitialCharacters] = useState<Character[]>([]);
  const [error, setError] = useState("");

  const fetchCharacters = useCallback(async () => {
    setIsLoading(true)
    try {
      const { results } = await getCharacters();
      setCharacters(results);
      setInitialCharacters(results);
    } catch (e) {
      setError("Erro ao carregar os heróis");
    }
    setIsLoading(false)
  }, []);

  useEffect(() => {
    fetchCharacters();
  }, [fetchCharacters]);

  const handleFilterByName = (searchName: string) => {
    const filteredByName = searchName
      ? initialCharacters.filter((character) =>
          character.name.toLowerCase().includes(searchName.toLowerCase())
        )
      : initialCharacters;

    setCharacters(filteredByName);
  };

  const handleOrderByName = (order: boolean) => {
    const sortedCharacters = [...characters].sort((a, b) =>
      order
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );
    setCharacters(sortedCharacters);
  };

  const handleToggleFavorite = (id: number) => {
    const canFavorite = characters.filter((char) => char.favorite);

    if (canFavorite.length < 5) {
      const updateCharacters = characters.map((character) =>
        character.id === id ? { ...character, favorite: true } : character
      );
      setCharacters(updateCharacters);
    } else {
      setError("Você só pode favoritar 5 heróis");
    }
  };

  const handleShowOnlyFavorites = () => {
    const favorites = characters.filter((character) => character.favorite);
    setCharacters(favorites);
  };

  return {
    handleShowOnlyFavorites,
    handleToggleFavorite,
    handleOrderByName,
    handleFilterByName,
    setError,
    isLoading,
    characters,
    error
  }
}