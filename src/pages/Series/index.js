import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { FaEdit as Edit, FaTrash as Trash } from "react-icons/fa"
import { Alert, Button, Container, Table } from "reactstrap"

const SeriesPage = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    getAll()
  }, [])

  const getAll = () => {
    axios.get("/api/series").then(({ data: { data } }) => {
      setData(data)
    })
  }

  const remove = (id) => {
    axios.delete(`/api/series/${id}`).then((res) => {
      getAll()
    })
  }

  return (
    <Container>
      <h1>Séries</h1>
      <div className="my-3">
        <Link to="/series/form">Nova</Link>
      </div>
      {data.length === 0 ? (
        <Alert color="warning">Você não possui séries criadas.</Alert>
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
            {data.map((serie, i) => {
              return (
                <tr key={i}>
                  <th scope="row">{serie.id}</th>
                  <th>{serie.name}</th>
                  <th>
                    <Button
                      color="primary"
                      title="Editar"
                      className="d-inline-flex align-items-center mr-3"
                      tag={Link}
                      to={`/series/form/${serie.id}`}
                    >
                      <Edit />
                    </Button>
                    <Button
                      color="danger"
                      title="Excluir"
                      className="d-inline-flex align-items-center"
                      onClick={() => remove(serie.id)}
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

export default SeriesPage
