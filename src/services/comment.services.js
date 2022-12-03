import service from "./config.services";

const addNewCommentService = (id, newComment) => {
  return service.post(`/wines/${id}/comments`, newComment)
}

const getAllCommentsService = (id, comment) => {
  return service.get(`/wines/${id}/comments`, comment)
}

export { addNewCommentService, getAllCommentsService }