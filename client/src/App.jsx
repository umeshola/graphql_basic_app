import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import Routes
import Signup from "./Comp/SIgnup";
import Navbar from "./Comp/Navbar";
import Add from "./Comp/Add";
import Landing from "./Comp/Landing";
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
    headers: {
      authorization:localStorage.getItem("token") || ""
    },
});

function App() {
  return (
    <Router>
      <div>
        <ApolloProvider client={client}>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Landing />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/add" element={<Add />} />
          </Routes>
        </ApolloProvider>
      </div>
    </Router>
  );
}

export default App;
