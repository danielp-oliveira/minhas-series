import React, { useState, useEffect } from "react"
import axios from "axios"
import { Redirect, Link } from "react-router-dom"
import {
  FaArrowLeft as ArrowLeft,
  FaSave as Save,
  FaWindowClose as Close,
} from "react-icons/fa"
import {
  Badge,
  Button,
  Container,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap"

const FormSeriePage = (props) => {
  const [data, setData] = useState({})
  const [success, setSuccess] = useState(false)
  const [mode, setMode] = useState("INFO")

  const id = props.match.params.id

  useEffect(() => {
    getById(id)
  }, [id])

  const getById = (id) => {
    if (id) {
      axios.get(`/api/series/${id}`).then(({ data }) => {
        console.log(data)
        setData({ ...data })
      })
    }
  }

  const add = () => {
    axios
      .post("/api/series", {
        data,
      })
      .then((res) => {
        setSuccess(true)
      })
  }

  const update = () => {
    axios
      .put(`/api/series/${data.id}`, {
        data,
      })
      .then((res) => {
        setSuccess(true)
      })
  }

  const onChange = (field) => (event) => {
    setData({ ...data, [field]: event.target.value })
  }

  const onSave = () => {
    if (data.id) {
      update()
    } else {
      add()
    }
  }

  if (success) {
    return <Redirect to="/series" />
  }

  const masterHeader = {
    height: "50vh",
    minHeight: "500px",
    backgroundImage: `url('${data.background}')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }

  return (
    <div>
      {data.id && (
        <div>
          <header style={masterHeader}>
            <div className="h-100" style={{ background: "rgba(0,0,0,0.7" }}>
              <Container className="h-100">
                <div className="row h-100 align-items-center">
                  <div className="col-3">
                    <img
                      src={data.poster}
                      className="img-fluid img-thumbnail"
                      alt={data.name}
                    />
                  </div>
                  <div className="col-9">
                    <h1 className="font-weight-light text-white">
                      {data.name}
                    </h1>
                    <div className="lead text-white">
                      <Badge color="success">Assistido</Badge>
                      <Badge color="warning">Para assistir</Badge>
                      Gênero: {data.genre}
                    </div>
                  </div>
                </div>
              </Container>
            </div>
          </header>
          <div>
            <Button
              color="link"
              onClick={() => setMode("INFO")}
              className="d-inline-flex align-items-center mt-3 mr-3"
              tag={Link}
              to="/series"
            >
              <ArrowLeft className="mr-2" /> Voltar
            </Button>
            {mode === "EDIT" && (
              <Button
                color="secondary"
                onClick={() => setMode("INFO")}
                className="d-inline-flex align-items-center mt-3 mr-3"
              >
                <Close className="mr-2" />
                Cancelar
              </Button>
            )}
            {mode === "INFO" && (
              <Button
                color="primary"
                onClick={() => setMode("EDIT")}
                className="d-inline-flex align-items-center mt-3"
              >
                <Save className="mr-2" /> Editar
              </Button>
            )}
          </div>
        </div>
      )}
      <Container>
        {mode === "EDIT" && (
          <div>
            <h1 className="my-5">{data.id ? "Editar Série" : "Nova Série"}</h1>
            <Form>
              <FormGroup className="my-3">
                <Label for="serie-name">Nome</Label>
                <Input
                  type="text"
                  name="nome"
                  id="serie-name"
                  placeholder="Nome da Série"
                  value={data.name}
                  onChange={onChange("name")}
                />
              </FormGroup>
              <FormGroup className="my-3">
                <Label for="serie-comments">Comentário</Label>
                <Input
                  type="text"
                  name="comments"
                  id="serie-comments"
                  placeholder="Comentário da Série"
                  value={data.comments}
                  onChange={onChange("comments")}
                />
              </FormGroup>
              <Button
                color="primary"
                onClick={onSave}
                className="d-inline-flex align-items-center"
              >
                <Save className="mr-2" /> Salvar
              </Button>
            </Form>
          </div>
        )}
      </Container>
    </div>
  )
}

export default FormSeriePage
