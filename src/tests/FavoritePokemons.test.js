import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './Helper';

test('Apresentar No favorite pokemon found sem pokemons', () => {
  renderWithRouter(<FavoritePokemons />);
  const noPoke = screen.getByText('No favorite pokemon found');
  expect(noPoke).toBeInTheDocument();
});

test('Mostra o card corretamente', () => {
  const { history } = renderWithRouter(<App />);
  history.push('/pokemons/25');
  const favorite = screen.getByLabelText('Pokémon favoritado?');
  userEvent.click(favorite);
  history.push('/favorites');
  const pikachu = screen.getByText('Pikachu');
  expect(pikachu).toBeInTheDocument();
});
