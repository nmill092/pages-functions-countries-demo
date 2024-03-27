/* eslint-disable import/prefer-default-export */
import { Country } from '../../types.ts';

export async function onRequestGet({ env }) {
  const { API_ENDPOINT: url } = env;

  const res = await fetch(url);
  const countries = await res.json();

  const capitals = countries.map(({ name, capital, id }: Country) => ({ name, capital, id }));

  return new Response(JSON.stringify(capitals));
}
