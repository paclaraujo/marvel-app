export interface Character {
    id: number,
    name: string,
    description: string,
    favorite?: boolean,
    thumbnail: {
      path: string,
      extension: string
    },
    comics: {
      items: Comics[]
    },
    series: {
      available: number
    }
  }

  interface Comics {
    resourceURI: string,
    name: string
  }

  export interface CharacterComics {
    id: number,
    title: string,
    resourceURI: string
  }

  export interface CharacterComicsApiResponse {
    results: CharacterComics[]
  }
  
  export interface CharacterApiResponse {
    results: Character[]
  }