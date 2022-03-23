import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';
import renderWithRouter from './Helper';

test('Se o componente contém um heading com o texto Encountered pokémons', () => {
  renderWithRouter(<Pokedex pokemons={ pokemons } isPokemonFavoriteById={ { } } />);
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

test('Se o botão de filtro funciona', () => {
  renderWithRouter(<Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />);
  const button = screen.getByRole('button', { name: 'Fire' });
  userEvent.click(button);
  const typePoke = screen.getAllByText('Fire');
  expect(typePoke[0].innerHTML).toBe(button.innerHTML);
});

test('Se a pokedex tem o botão de filtro', () => {
  renderWithRouter(<Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />);
  const buttons = screen.getAllByTestId('pokemon-type-button');
  expect(buttons[0]).toBeInTheDocument();
});

test('Se a pokedex tem o botão all de resetar o filtro', () => {
  renderWithRouter(<Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />);
  const buttonAll = screen.getByRole('button', { name: 'All' });
  expect(buttonAll).toBeInTheDocument();
});

test('Se o filtro all é selecionado ao carregar', () => {
  renderWithRouter(<Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />);
  const buttonNext = screen.getByRole('button', { name: 'Próximo pokémon' });
  const buttonPoison = screen.getByRole('button', { name: 'Poison' });
  userEvent.click(buttonPoison);
  expect(buttonNext).toBeDisabled();
  const buttonAll = screen.getByRole('button', { name: 'All' });
  userEvent.click(buttonAll);
  expect(buttonNext).not.toBeDisabled();
});
