/* eslint-disable import/prefer-default-export */
import { Country } from '../../types.ts';

export async function onRequestGet({ env }) {
  const { API_ENDPOINT: url } = env;

  const res = await fetch(url);
  const countries = await res.json();

  const populations = countries
    .map(({ name, population, id }: Country) => (
      { name, population: population || null, id }
    ))
    .sort((a, b) => (a.population > b.population ? -1 : 1));

  return new Response(JSON.stringify(populations));
}
