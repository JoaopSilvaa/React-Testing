import { screen } from '@testing-library/react';
import React from 'react';
import Pokedex from '../components/Pokedex';
import renderWithRouter from './Helper';

test('Se o componente contém um heading com o texto Encountered pokémons', () => {
  renderWithRouter(<Pokedex />);
  const encoPoke = screen.getByRole('heading',
    { level: 2, name: 'Encountered pokémons' });
  expect(encoPoke).toBeInTheDocument();
});

// test('Se é exibido o próximo pokemon da lista se clicar', () => {
//   renderWithRouter(<Pokedex />);
//   // const button = screen.getByRole('button', { name: 'Próximo pokémon' });
//   // userEvent.click(button);
// });

// test('Se a pokedex tem botões de filtro', () => {
//   renderWithRouter(<Pokedex />);
//   const buttons = screen.getAllByRole('button');
//   expect(buttons.length).toBe(2);
// });
