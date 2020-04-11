import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { FaEdit as Edit, FaTrash as Trash } from "react-icons/fa"
import { Alert, Button, Container, Table } from "reactstrap"

const GenresPage = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    getAll()
  }, [])

  const getAll = () => {
    axios.get("/api/genres").then(({ data: { data } }) => {
      setData(data)
    })
  }

  const remove = (id) => {
    axios.delete(`/api/genres/${id}`).then((res) => {
      getAll()
    })
  }

  return (
    <Container>
      <h1>Genres</h1>
      <div className="my-3">
        <Link to="/genres/form">Novo</Link>
      </div>
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
                  <th>
                    <Button
                      color="primary"
                      title="Editar"
                      className="d-inline-flex align-items-center mr-3"
                      tag={Link}
                      to={`/genres/form/${genre.id}`}
                    >
                      <Edit />
                    </Button>
                    <Button
                      color="danger"
                      title="Excluir"
                      className="d-inline-flex align-items-center"
                      onClick={() => remove(genre.id)}
                    >
                      <Trash />
                    </Button>
                  </th>
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
