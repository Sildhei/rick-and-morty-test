import { getAllCharacters } from './api/getAllCharacters';
import ErrorComponent from './components/Error/ErrorComponent';
import MainSection from './components/MainSection/MainSection';

export default async function Home({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
  const page = searchParams['page'] ?? '1';
  const name = searchParams['name'] ?? undefined
  const status = searchParams['status'] ?? undefined

  const characters = await getAllCharacters({ page: Number(page), name: name, status: status });

  if (characters.error || isNaN(Number(page))) {
    return <ErrorComponent message={characters.error ? characters.error : 'Invalid Url'} />;
  }

  return (
    <div className='bg-gray-300'>
      <MainSection characters={characters} />
    </div>
  );
}
