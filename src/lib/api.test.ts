import { describe, it, expect, vi } from "vitest";
import axios from "axios";
import { getCharacters, getCharactersById } from "./api";

vi.mock("axios");

describe("getCharacters", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return characters list", async () => {
    const mockData = {
      data: {
        data: {
          results: [
            { id: 1, name: "Spider-Man" },
            { id: 2, name: "Iron Man" },
          ],
        },
      },
    };

    vi.spyOn(axios, 'get').mockResolvedValueOnce(mockData);

    const characters = await getCharacters();

    expect(characters.results).toHaveLength(2);
    expect(characters.results[0].name).toBe("Spider-Man");
    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining("/characters?")
    );
  });
});

describe("getCharactersById", () => {
  it("should return characters and comics data", async () => {
    const mockCharacterData = {
      data: {
        data: {
          results: [
            {
              id: "1",
              name: "Spider-Man",
              comics: {
                items: [
                  {
                    resourceURI: "http://gateway.marvel.com/v1/public/comics/1",
                  },
                  {
                    resourceURI: "http://gateway.marvel.com/v1/public/comics/2",
                  },
                ],
              },
            },
          ],
        },
      },
    };

    const mockComicData1 = {
      data: {
        data: {
          results: [{ id: "1", title: "Amazing Spider-Man #1" }],
        },
      },
    };

    const mockComicData2 = {
      data: {
        data: {
          results: [{ id: "2", title: "Amazing Spider-Man #2" }],
        },
      },
    };

    vi.spyOn(axios, 'get')
      .mockResolvedValueOnce(mockCharacterData)
      .mockResolvedValueOnce(mockComicData1)
      .mockResolvedValueOnce(mockComicData2);

    const character = await getCharactersById("1");

    expect(character.results[0].name).toBe("Spider-Man");
    expect(character.comics).toHaveLength(2);
    expect(character.comics[0].title).toBe("Amazing Spider-Man #1");
  });
});
