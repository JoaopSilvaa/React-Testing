import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';
import renderWithRouter from './Helper';

test('Se o componente contém um heading com o texto Encountered pokémons', () => {
  renderWithRouter(<Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />);
  const encoPoke = screen.getByRole('heading',
    { level: 2, name: 'Encountered pokémons' });
  expect(encoPoke).toBeInTheDocument();
});

test('Se é exibido o próximo pokemon da lista se clicar', () => {
  renderWithRouter(<Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />);
  const button = screen.getByRole('button', { name: 'Próximo pokémon' });
  userEvent.click(button);
  screen.getByText('Charmander');
});

test('Se é exibido um pokemon por vez', () => {
  renderWithRouter(<Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />);
  const pikachu = screen.getByText('Pikachu');
  const charmander = screen.queryByText('Charmander');
  expect(pikachu).toBeInTheDocument();
  expect(charmander).not.toBeInTheDocument();
});

test('Se a pokedex tem botões de filtro', () => {
  const number = 9;
  renderWithRouter(<Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />);
  const buttons = screen.getAllByRole('button');
  expect(buttons.length).toBe(number);
  userEvent.click(buttons[1]);
  const typePoke = screen.getByTestId('pokemon-type');
  const electric = screen.getByText(typePoke);
  expect(electric).toContain('Electric');
});

test('Se a pokedex tem o botão all de resetar o filtro', () => {
  renderWithRouter(<Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />);
  const buttonAll = screen.getByRole('button', { name: 'All' });
  expect(buttonAll).toBeInTheDocument();
});
