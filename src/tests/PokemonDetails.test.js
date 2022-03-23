import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './Helper';

const pikachu = '/pokemons/25';

test('Se é renderizado o pokemon correto', () => {
  const { history } = renderWithRouter(<App />);
  history.push(pikachu);
  screen.getByText('Pikachu Details');
  const link = screen.queryByRole('link', { name: 'More details' });
  expect(link).not.toBeInTheDocument();
  screen.getByRole('heading', { level: 2, name: 'Summary' });
  screen.getByText(/This intelligent Pokémon/i);
});

test('Se é mostrado o mapa com as localizações do pokemon', () => {
  const { history } = renderWithRouter(<App />);
  history.push(pikachu);
  screen.getByRole('heading', { level: 2, name: 'Game Locations of Pikachu' });
  const imagensMap = screen.getAllByRole('img');
  expect(imagensMap[1].src).toContain('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
  expect(imagensMap[1].alt).toContain('Pikachu location');
});

test('Se há como favoritar o pokemon', () => {
  const { history } = renderWithRouter(<App />);
  history.push(pikachu);
  const favorite = screen.getByRole('checkbox');
  userEvent.click(favorite);
  const imageStar = screen.getAllByRole('img');
  expect(imageStar[1].alt).toContain('Pikachu is marked as favorite');
  const labelFavorite = screen.getByLabelText('Pokémon favoritado?');
  expect(favorite).toBe(labelFavorite);
});
