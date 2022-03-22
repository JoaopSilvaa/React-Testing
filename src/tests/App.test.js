import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './Helper';

test('Se a aplicação contém um conjunto de links no topo da página', () => {
  renderWithRouter(<App />);
  const links = screen.getAllByRole('link');
  expect(links[0].textContent).toContain('Home');
  expect(links[1].textContent).toContain('About');
  expect(links[2].textContent).toContain('Favorite Pokémons');
});

test('Se a aplicação redireciona para a página Home corretamente', () => {
  renderWithRouter(<App />);
  const links = screen.getAllByRole('link');
  userEvent.click(links[0]);
  const encoPoke = screen.getByRole('heading',
    { level: 2, name: 'Encountered pokémons' });
  expect(encoPoke).toBeInTheDocument();
});

test('Se a aplicação é redirecionada para a página de About corretamente', () => {
  renderWithRouter(<App />);
  const links = screen.getAllByRole('link');
  userEvent.click(links[1]);
  const aboutPoke = screen.getByRole('heading',
    { level: 2, name: 'About Pokédex' });
  expect(aboutPoke).toBeInTheDocument();
});

test('Se a aplicação é redirecionada para a página de Favoritos corretamente', () => {
  renderWithRouter(<App />);
  const links = screen.getAllByRole('link');
  userEvent.click(links[2]);
  const favoPoke = screen.getByRole('heading',
    { level: 2, name: 'Favorite pokémons' });
  expect(favoPoke).toBeInTheDocument();
});

test('Se a aplicação é redirecionada para a página de Not Found corretamente', () => {
  const { history } = renderWithRouter(<App />);
  history.push('xablau');
  const notFound = screen.getByText(/Page requested not found/i);
  expect(notFound).toBeInTheDocument();
});
