import { screen } from '@testing-library/react';
import React from 'react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './Helper';

test('Apresentar No favorite pokemon found sem pokemons', () => {
  renderWithRouter(<FavoritePokemons />);
  const noPoke = screen.getByText('No favorite pokemon found');
  expect(noPoke).toBeInTheDocument();
});

test('Se existir pokemons mostrar pokemon', () => {
  renderWithRouter(<FavoritePokemons />);
});
