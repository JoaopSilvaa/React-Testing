import { screen } from '@testing-library/react';
import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from './Helper';

test('Se a página about contém um heading com o texto About Pokedex', () => {
  renderWithRouter(<NotFound />);
  const notFound = screen.getByRole('heading',
    { level: 2, name: /Page requested not found/i });
  expect(notFound).toBeInTheDocument();
});

test('Se a página contém a imagem correta', () => {
  renderWithRouter(<NotFound />);
  const image = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
  const imageNotFound = screen.getAllByRole('img');
  expect(imageNotFound[1].src).toBe(image);
});
