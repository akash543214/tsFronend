import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Components/App.js';
import { store } from './store/store.ts';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import HomePage from './pages/HomePage.js';
import UserProfile from './pages/UserProfile.js';
import LandingPage from './pages/LandingPage.js';
import AuthLayout from './Components/AuthLayout.js'

const router = createBrowserRouter(
[
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: (
                <AuthLayout authentication={false}>
                    <LandingPage />
                </AuthLayout>
            ),
        },
        {
            path: "/home",
            element: (
                <AuthLayout authentication={true}>
                    <HomePage />
                </AuthLayout>
            ),
        },   
        {
          path: "/profile",
          element: (
              <AuthLayout authentication={true}>
                  <UserProfile />
              </AuthLayout>
          ),
      },   
    ],
},
]
)

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={router}/>
      </Provider>
    </React.StrictMode>,
  );
} else {
  console.error("Root element not found");
}
