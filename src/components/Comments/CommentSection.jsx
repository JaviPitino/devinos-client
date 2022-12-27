import React, { useContext, useState, useEffect, useRef } from "react";
import './comments.css'
import {
  addNewCommentService,
  getAllCommentsService,
} from "../../services/comment.services";
import { useNavigate, useParams } from "react-router-dom";
import { Form } from "react-bootstrap";
import { AuthContext } from "../../context/auth.context";
import ShowComments from "./ShowComments";

function CommentSection(props) {
  const { isLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();

  const { addComment } = props
  // const commentsRef = useRef();

  const [comment, setComment] = useState("");
  // const [allComments, setAllComments] = useState([]);

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
      
      // commentsRef.current.scrollIntoView({ behavior: 'smooth' })

     
    } catch (err) {
      navigate("/error");
    }
  };

  // useEffect(() => {
  //   getAllComments();
  // }, [comment]);

  // const getAllComments = async () => {
  //   try {
  //     const { data } = await getAllCommentsService(id, comment);
  //     setAllComments(data.reverse());

  //   } catch (err) {
  //     navigate("/error");
  //   }
  // };

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
          <hr />
          {/* <div className="comment-box">
            <h6> Comentarios: </h6>
            {allComments.map((each) => {
              return (
                <div key={each._id}>
                  {each.wineId._id === id ? (
                    <div className="container-comments">
                      <div>
                        <img className="img-comment"
                          src={each.commentUser.image}
                          alt="profile image"
                          width={35} style={{ marginRight: '10px' }}
                        />
                      </div>
                      <div>
                          <p className="createdAt" >{each.createdAt.slice(0, 10) }</p>
                          <h6 className="username-comment" >{each.commentUser.username[0].toUpperCase() + each.commentUser.username.slice(1) }: </h6>{" "}
                        <span className="comment" >
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
          </div> */}
        </div>
      )}
    </div>
  );
}

export default CommentSection;
