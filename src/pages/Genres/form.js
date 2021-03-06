import React, { useState, useEffect } from "react"
import axios from "axios"
import { Redirect, Link } from "react-router-dom"
import { FaArrowLeft as ArrowLeft, FaSave as Save } from "react-icons/fa"
import { Button, Container, Form, FormGroup, Label, Input } from "reactstrap"

const FormGenrePage = (props) => {
  const [data, setData] = useState({ id: null, name: "" })
  const [success, setSuccess] = useState(false)

  const id = props.match.params.id

  useEffect(() => {
    getById(id)
  }, [id])

  const getById = (id) => {
    if (id) {
      axios.get(`/api/genres/${id}`).then(({ data }) => {
        setData({ ...data })
      })
    }
  }

  const add = () => {
    axios
      .post("/api/genres", {
        name: data.name,
      })
      .then((res) => {
        setSuccess(true)
      })
  }

  const update = () => {
    axios
      .put(`/api/genres/${data.id}`, {
        name: data.name,
      })
      .then((res) => {
        setSuccess(true)
      })
  }

  const onChange = (event) => {
    const name = event.target.value
    setData({ ...data, name })
  }

  const onSave = () => {
    if (data.id) {
      update()
    } else {
      add()
    }
  }

  if (success) {
    return <Redirect to="/genres" />
  }

  return (
    <Container>
      <h1 className="my-5">{data.id ? "Editar Gênero" : "Novo Gênero"}</h1>
      <Form>
        <FormGroup>
          <Label for="genre-name">Nome</Label>
          <Input
            type="text"
            name="nome"
            id="genre-name"
            placeholder="Nome do Genêro"
            value={data.name}
            onChange={onChange}
          />
        </FormGroup>
        <Button
          color="link"
          tag={Link}
          to="/genres"
          className="d-inline-flex align-items-center mr-3"
        >
          <ArrowLeft className="mr-2" /> Voltar
        </Button>
        <Button
          color="primary"
          onClick={onSave}
          className="d-inline-flex align-items-center"
        >
          <Save className="mr-2" /> Salvar
        </Button>
      </Form>
    </Container>
  )
}

export default FormGenrePage
