import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Navbar from './components/Navbar';
import SearchBooks from './pages/SearchBooks'
import SavedBooks from './pages/SavedBooks';


// // const client = new ApolloClient({
// //     uri: '/graphql',
// //     cache: new InMemoryCache(),
// // });
// const authLink = setContext((_, { headers }) => {
//   const token = localStorage.getItem('id_token');
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : '',
//     },
//   };
// });
//Importing Apollo Provider



const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
          <Navbar />
          <Routes >
            <Route  path="/" element={ <SearchBooks />} />
            <Route  path="/saved" element={<SavedBooks/>} />
          </Routes>
      </Router>
    </ApolloProvider>
    );
}

export default App;
