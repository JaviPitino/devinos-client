import service from "./config.services";

const winesListService = () => {
  return service.get("/wines")
};

const getWineDetailsService = (id) => {
  return service.get(`/wines/${id}`)
}

export { winesListService, getWineDetailsService }