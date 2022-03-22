import { screen } from '@testing-library/react';
import React from 'react';
import About from '../components/About';
import renderWithRouter from './Helper';

test('Se a página about contém um heading com o texto About Pokedex', () => {
  renderWithRouter(<About />);
  const aboutPoke = screen.getByRole('heading',
    { level: 2, name: 'About Pokédex' });
  expect(aboutPoke).toBeInTheDocument();
});

test('Se a página contém as informações sobre a pokedex', () => {
  renderWithRouter(<About />);
  const paragraph1 = screen.getByText(/This application simulates/i);
  const paragraph2 = screen.getByText(/One can filter Pokémons/i);
  expect(paragraph1).toBeInTheDocument();
  expect(paragraph2).toBeInTheDocument();
});

test('Se a página contém a imagem correta', () => {
  renderWithRouter(<About />);
  const image = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
  const imagePoke = screen.getByRole('img');
  expect(imagePoke.src).toBe(image);
});
