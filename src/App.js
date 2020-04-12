import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

import HomePage from "./pages/Home"
import GenresPage from "./pages/Genres"
import FormGenrePage from "./pages/Genres/form"
import SeriesPage from "./pages/Series"
import FormSeriePage from "./pages/Series/form"

import Header from "./components/Header"

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/series" exact component={SeriesPage} />
          <Route path="/series/form/:id?" component={FormSeriePage} />
          <Route path="/genres" exact component={GenresPage} />
          <Route path="/genres/form/:id?" component={FormGenrePage} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
