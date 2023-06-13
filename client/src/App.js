import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import LoginForm from './components/LoginForm';
import Navbar from './components/Navbar';

// const client = new ApolloClient({
//     uri: '/graphql',
//     cache: new InMemoryCache(),
// });

const SearchGoogleBooks = () => {
const[searchGoogleBooks,setSearchGoogleBooks] = React.useState([])
React.useEffect(()=> {
    fetch('https://www.googleapis.com/books/v1/volumes?q=${query}')
    .then(response=> response.json())
    .then(searchGoogleBooks=> setSearchGoogleBooks(searchGoogleBooks))
    .catch(err=>console.log(err))
},[])
    return (
        <div>
 
        </div>
    )
}
function App() {
    return (
        <ApolloProvider client={SearchGoogleBooks}>
      <Router>
        <div className="flex-column justify-center align-center min-100-vh bg-primary">
          <Routes>
            <Route 
              path="/" 
              element={<Navbar />}
            />
            <Route 
              path="/"
              element={<LoginForm />}
            />
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
    );
}

export default App;
