import { useQuery } from '@tanstack/react-query';
import debounce from 'lodash.debounce'; // Import debounce
import React, { useMemo, useRef, useState } from 'react';
import { Country } from '../types.ts';
import './App.css';
import {
  CountryWrapper, Loading, OptionButton, SearchBox,
} from './Components.tsx';

const options = [
  {
    label: 'World Capitals',
    endpoint: 'capitals',
  },
  {
    label: 'World Populations',
    endpoint: 'populations',
  },
];

const fetchData = async (endpoint: string) => {
  // eslint-disable-next-line no-promise-executor-return
  await new Promise((resolve) => setTimeout(resolve, 1500));
  const res = await fetch(`/api/${endpoint}`);
  return res.json();
};

function App() {
  const [endpoint, setEndpoint] = useState(options[0].endpoint);
  const [searchValue, setSearchValue] = useState('');

  const {
    data, isLoading, isFetching, isRefetching, isError,
  } = useQuery({
    queryKey: [endpoint],
    queryFn: () => fetchData(endpoint),
  });

  const searchValueRef = useRef<HTMLInputElement>(null);

  const debouncedSearch = debounce((value: string) => {
    setSearchValue(value);
  }, 500);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    debouncedSearch(value);
  };

  const filteredData = useMemo(() => {
    if (!data) return null;
    if (searchValue.trim() === '') return data;

    const searchResult = data.filter((datum: Partial<Country>) => (
      (datum.name?.toLowerCase().includes(searchValue.toLowerCase())
      || datum.capital?.toLowerCase().includes(searchValue.toLowerCase())
      )));

    return searchResult;
  }, [data, searchValue]);

  return (
    <>
      <p className="instructions">Select an endpoint, then open up the Network tab in DevTools to view the request.</p>

      <div className="menu">
        { /* eslint-disable-next-line no-shadow */ }
        {options.map(({ endpoint, label }) => (
          <OptionButton key={endpoint} onClick={() => setEndpoint(endpoint)}>
            {label}
          </OptionButton>
        ))}

        {/* @ts-expect-error: Suppress ref error */}
        <SearchBox ref={searchValueRef} onChange={handleChange} placeholder={`Search for a country${endpoint === 'capitals' ? ' or capital' : '...'}`} />
      </div>

      {(isLoading || isFetching || isRefetching) && (
        <Loading>
          getting
          <a target="_blank" href={`/api/${endpoint}`} rel="noreferrer">
            /api/
            {endpoint}
          </a>
          ...
        </Loading>
      )}

      {isError && (
        <div className="error">
          An error occurred while fetching data. Make sure your API is online and try again.
        </div>
      )}

      <div className="countries">
        {(filteredData && filteredData.length > 0)
          && filteredData.map((datum: Partial<Country>) => (
            <CountryWrapper key={datum.id} stat={endpoint} datum={datum} />
          ))}
        {(filteredData && filteredData.length === 0) && (
          <div className="no-results">
            {`No results found for "${searchValue}"`}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
