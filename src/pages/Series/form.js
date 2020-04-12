import React, { useState, useEffect } from "react"
import axios from "axios"
import { Redirect, Link } from "react-router-dom"
import { FaArrowLeft as ArrowLeft, FaSave as Save } from "react-icons/fa"
import { Button, Container, Form, FormGroup, Label, Input } from "reactstrap"

const FormSeriePage = (props) => {
  const [form, setForm] = useState({ id: null, name: "" })
  const [success, setSuccess] = useState(false)

  const id = props.match.params.id

  useEffect(() => {
    getById(id)
  }, [id])

  const getById = (id) => {
    if (id) {
      axios.get(`/api/series/${id}`).then(({ data }) => {
        setForm({ ...data })
      })
    }
  }

  const add = () => {
    axios
      .post("/api/series", {
        name: form.name,
      })
      .then((res) => {
        setSuccess(true)
      })
  }

  const update = () => {
    axios
      .put(`/api/series/${form.id}`, {
        name: form.name,
      })
      .then((res) => {
        setSuccess(true)
      })
  }

  const onChange = (event) => {
    const name = event.target.value
    setForm({ ...form, name })
  }

  const onSave = () => {
    if (form.id) {
      update()
    } else {
      add()
    }
  }

  if (success) {
    return <Redirect to="/series" />
  }

  return (
    <Container>
      <h1>{form.id ? "Editar Série" : "Nova Série"}</h1>
      <Form>
        <FormGroup>
          <Label for="serie-name">Nome</Label>
          <Input
            type="text"
            name="nome"
            id="serie-name"
            placeholder="Nome da Série"
            value={form.name}
            onChange={onChange}
          />
        </FormGroup>
        <Button
          color="link"
          tag={Link}
          to="/series"
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

export default FormSeriePage
