import { createBrowserRouter } from 'react-router';
import { HomePage } from './HomePage';

// Every page is registered here. Feature pages live in src/features/<feature>/,
// e.g. { path: '/expenses', element: <ExpensesPage /> }.
export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
]);
