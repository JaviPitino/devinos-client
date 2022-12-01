import service from "./config.services";

const bodegasListService = () => {
  return service.get("/bodegas")
}

const addNewBodegaService = (newBodega) => {
  return service.post('/bodegas', newBodega)
}

const getBodegaDetailsService = (id) => {
  return service.get(`/bodegas/${id}`)
}

const editBodegaService = (id, newBodega) => {
  return service.patch(`/bodegas/${id}`, newBodega)
}

const deleteBodegaService = (id) => {
  return service.delete(`/bodegas/${id}`)
}

export { bodegasListService, addNewBodegaService, getBodegaDetailsService, editBodegaService, deleteBodegaService }