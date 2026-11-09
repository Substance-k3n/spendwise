import { RouterProvider } from 'react-router';
import { router } from '../routes/router';

// App-wide providers (auth, data fetching, theme…) wrap the router here.
export function App() {
  return <RouterProvider router={router} />;
}
