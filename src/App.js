import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"

import GenresPage from "./pages/Genres"
import FormGenrePage from "./pages/Genres/form"
import HomePage from "./pages/Home"

import Header from "./components/Header"

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Route path="/" exact component={HomePage} />
        <Route path="/genres" exact component={GenresPage} />
        <Route path="/genres/form/:id?" component={FormGenrePage} />
      </div>
    </Router>
  )
}

export default App
