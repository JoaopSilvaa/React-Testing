import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';
import renderWithRouter from './Helper';

test('Se é renderizado o pokemon correto', () => {
  renderWithRouter(<Pokemon isFavorite={ false } pokemon={ pokemons[0] } />);
  screen.getByText('Pikachu');
  screen.getByText('Electric');
  screen.getByText('Average weight: 6.0 kg');
  const imagem = screen.getByRole('img');
  expect(imagem.src).toContain('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  expect(imagem.alt).toContain('Pikachu');
});

test('Se tem o link para detalhe correto', () => {
  renderWithRouter(<Pokemon isFavorite={ false } pokemon={ pokemons[0] } />);
  const link = screen.getByRole('link');
  expect(link.href).toContain('/pokemons/25');
});

test('Se o link encaminha para mais detalhes', () => {
  renderWithRouter(<App />);
  const link = screen.getByRole('link', { name: 'More details' });
  userEvent.click(link);
  screen.getAllByText('Pikachu Details');
});

test('Se aparecea estrela de favorito', () => {
  renderWithRouter(<Pokemon isFavorite pokemon={ pokemons[0] } />);
  const imageStar = screen.getAllByRole('img');
  expect(imageStar[1].src).toContain('http://localhost/star-icon.svg');
  expect(imageStar[1].alt).toContain('Pikachu is marked as favorite');
});
