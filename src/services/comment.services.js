import service from "./config.services";

const addNewCommentService = (newComment) => {
  return service.post(`/comment`, newComment)
}

const getAllCommentsService = () => {
  return service.get(`/comment`)
}

export { addNewCommentService, getAllCommentsService }