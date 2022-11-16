import service from "./config.services";

const winesListService = () => {
  return service.get("/wines")
}

export { winesListService }