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
      available: number
      items: CharacterComic[]
    },
    series: {
      available: number
    }
  }

  export interface CharacterComic {
    resourceURI: string,
    name: string
  }

  export interface Comic {
    id: number,
    title: string,
    resourceURI: string
  }

  export interface Comics {
    data: {
      data: {
        results: Comic[]
      }
    }
  }
  
  export interface Characters {
    results: Character[]
    comics: Comic[]
  }