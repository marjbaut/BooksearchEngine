import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import LoginForm from './components/LoginForm';
import Navbar from './components/Navbar';

const client = new ApolloClient({
    uri: '/graphql',
    cache: new InMemoryCache(),
});

function App() {
    return (
        <ApolloProvider client={client}>
            <div>hello</div>
            
        </ApolloProvider>
    );
}

export default App;

// {/* //     <Router>
//         //         <div className="flex-column justify-center align-center min-100-vh bg-primary">
//         //             <Routes>
//         //                 <Route 
//         //                     path="/"
//         //                     element=" "
//         //                 />
//         //             </Routes>
//         //         </div>
//         //     </Router> */}
        
