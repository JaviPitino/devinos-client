import React, { useContext, useState } from "react";
import './comments.css'
import { addNewCommentService } from "../../services/comment.services";
import { useNavigate, useParams } from "react-router-dom";
import { Form } from "react-bootstrap";
import { AuthContext } from "../../context/auth.context";

function CommentSection(props) {
  const { isLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();

  const { addComment } = props

  const [comment, setComment] = useState("");

  // handlers
  const handleChangeComment = (e) => setComment(e.target.value);

  //  Handle comentario
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newComment = {
        comment
      };

      const { data } = await addNewCommentService(id, newComment);
      console.log(data.comment);
      setComment(data.comment);
      setComment("");

      console.log(comment);
      addComment(comment)
    
    } catch (err) {
      navigate("/error");
    }
  };

  return (
    <div>
      {isLogin && (
        <div>
          <div>
            <h6 className="comment-title">Escribe un comentario</h6>
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
          
        </div>
      )}
    </div>
  );
}

export default CommentSection;
