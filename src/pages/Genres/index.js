import React, { useState, useEffect } from "react"
import axios from "axios"

import { Alert, Container, Table } from "reactstrap"

const GenresPage = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    axios.get("/api/genres").then(({ data: { data } }) => {
      setData(data)
    })
  }, [])

  return (
    <Container>
      <h1>Genres</h1>
      {data.length === 0 ? (
        <Alert color="warning">Você não possui genêros criados.</Alert>
      ) : (
        <Table dark>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {data.map((genre, i) => {
              return (
                <tr key={i}>
                  <th scope="row">{genre.id}</th>
                  <th>{genre.name}</th>
                  <th></th>
                </tr>
              )
            })}
          </tbody>
        </Table>
      )}
    </Container>
  )
}

export default GenresPage
