'use client';

import { Dispatch, SetStateAction, useMemo } from 'react';
import CharacterCard from './CharacterCard';
import { getEpisodesIds } from '@/app/helpers/getEpisodesId';
import { CharactersProps } from '../MainSection/MainSection';
import { ICharacterData } from '@/app/api/getAllCharacters';
import { IEpisodeData } from '@/app/api/getCharacterEpisodes';
import { getEpisodesAction } from '@/app/helpers/actions';

interface CharactersSectionProps extends CharactersProps {
  selectedCharacters: number[];
  setSelectedCharacters: Dispatch<SetStateAction<number[]>>;
  setEpisodes: Dispatch<SetStateAction<IEpisodeData[][]>>;
}

const CharactersSection = ({
  characters,
  selectedCharacters,
  setSelectedCharacters,
  setEpisodes,
}: CharactersSectionProps) => {
  const charactersLists = useMemo(() => {
    return [characters.results.slice(0, 10), characters.results.slice(10, 20)];
  }, [characters]);

  const handleOnClickCharacter = async (character: ICharacterData, index: number) => {
    setSelectedCharacters(prev => {
      const newSelectedCharacters = [...prev];
      newSelectedCharacters[index] = character.id;
      return newSelectedCharacters;
    });

    const episodesIds = getEpisodesIds(character.episode);

    const episodesData = await getEpisodesAction(episodesIds);

    setEpisodes(prev => {
      const newEpisodes = [...prev];
      newEpisodes[index] = Array.isArray(episodesData) ? episodesData : [episodesData];
      return newEpisodes;
    });
  };

  return (
    <div className='flex flex-row items-center justify-between mt-4'>
      {charactersLists.map((list, index) => (
        <div className='border-[1px] border-gray-800 rounded-md p-4' key={list[0].name}>
          <p className='text-gray-800 font-bold text-xl'>Character #{index + 1}</p>
          <div className='grid grid-cols-2 gap-4 mt-4'>
            {list.map(character => (
              <div
                key={character.id}
                role='button'
                onClick={() =>
                  index === 1 && selectedCharacters.length === 0 ? null : handleOnClickCharacter(character, index)
                }
                className={`${index === 1 && selectedCharacters.length === 0 ? 'cursor-not-allowed' : null}`}>
                <CharacterCard character={character} selectedCharacters={selectedCharacters} index={index} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CharactersSection;
