import React, { useContext, useState, useEffect, useRef } from "react";
import {
  addNewCommentService,
  getAllCommentsService,
} from "../services/comment.services";
import { useNavigate, useParams } from "react-router-dom";
import { Form } from "react-bootstrap";
import { AuthContext } from "../context/auth.context";

function CommentSection() {
  const { isLogin, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const commentsRef = useRef();

  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);

  // handlers
  const handleChangeComment = (e) => setComment(e.target.value);

  //  Handle comentario
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newComment = {
        comment,
      };

      const { data } = await addNewCommentService(id, newComment);
      console.log(data.comment);
      setAllComments(allComments);
      setComment("");
      setComment(data.comment);

      commentsRef.current.scrollIntoView({ behavior: 'smooth' })

     
    } catch (err) {
      navigate("/error");
    }
  };

  useEffect(() => {
    getAllComments();
  }, [comment]);

  const getAllComments = async () => {
    try {
      const { data } = await getAllCommentsService(id, comment);
      console.log(data);
      setAllComments(data);

    } catch (err) {
      navigate("/error");
    }
  };

  console.log(allComments);

  return (
    <div>
      {isLogin && (
        <div>
          <div>
            <h6>Escribe un comentario</h6>
            <Form onSubmit={handleSubmit}>
              <Form.Control
                type="text"
                name="comment"
                value={comment}
                onChange={handleChangeComment}
                cols="60"
                rows="3"
                as="textarea"
              />
              <br />
              <button className="btn-edit-wine">Enviar</button>
            </Form>
          </div>
          <hr />
          <div className="comment-box">
            <h6> Comentarios: </h6>
            {allComments.map((each) => {
              return (
                <div>
                  {each.wineId._id === id ? (
                    <div className="container-comments">
                      <div>
                        <img
                          src={each.commentUser.image}
                          alt="profile image"
                          width={35} style={{ marginRight: '10px' }}
                        />
                      </div>
                      <div>
                          <p className="createdAt" >{each.commentUser.createdAt = new Date().toLocaleDateString('es', { year:"numeric", month:"short", day:"numeric"})}</p>
                          <h6>{each.commentUser.username[0].toUpperCase() + each.commentUser.username.slice(1) }: </h6>{" "}
                        <span>
                          {each.comment}
                        </span>
                      </div>
                    </div>
                   
                  ) : (
                    <></>
                  )}
                </div>
              );
            })}
          <div ref={commentsRef} />
          </div>
        </div>
      )}
    </div>
  );
}

export default CommentSection;
