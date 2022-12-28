import React from "react";
import "./comments.css";
import "../wishList/wishlist.css"
import { useState, useEffect } from "react";
import { BsChatRight, BsChatRightFill } from "react-icons/bs";
import CommentSection from "./CommentSection";
import { getAllCommentsService } from "../../services/comment.services";
import { useNavigate, useParams } from "react-router-dom";

function ShowComments({ comment }) {
  
  const navigate = useNavigate();
  const { id } = useParams();

  const [showComment, setShowComment] = useState(false);
  const [allComments, setAllComments] = useState([]);
  // Estado para el nuevo comentario que utilizaremos en el Lift the State Up
  const [newComment, setNewComment] = useState("");

  // Función de Lift The State Up
  const addComment = (commenToAdd) => {
    setNewComment(commenToAdd);
  };

  // Actualizamos el ComponentDidMount con el nuevo comentario
  useEffect(() => {
    getAllComments();
  }, [newComment]);

  // Llamada a la DB para obtener todos los comentarios
  const getAllComments = async () => {
    try {
      const { data } = await getAllCommentsService(id, comment);
      // Reverse para que muestre primero el último en ser creado
      setAllComments(data.reverse());
    } catch (err) {
      navigate("/error");
    }
  };

  return (
    <div className="container-show-comments">
      {!showComment ? (
        <BsChatRight
          className="btn-show-comments bookmark"
          style={{ color: "#b9b8b8" }}
          onClick={() => setShowComment(!showComment)}
          type="submit"
        />
      ) : (
        <BsChatRightFill
          className="btn-show-comments bookmark"
          style={{color: '#bb1919'}}
          onClick={() => setShowComment(!showComment)}
          type="submit"
        />
      )}
      <span>Deja tu comentario</span>
      <div className={showComment ? "show-comments" : "hide-element"}>
        {showComment && (
          <CommentSection addComment={addComment} className="hide-component" />
        )}
      </div>
      <h6 className="title-comment"> Comentarios: </h6>
      <div className="comment-box">
        {allComments.map((each) => {
          return (
            <div key={each._id}>
              {each.wineId._id === id ? (
                <div className="container-comments">
                  <div>
                    <img
                      className="img-comment"
                      src={each.commentUser.image}
                      alt="profile image"
                      width={35}
                      style={{ marginRight: "10px" }}
                    />
                  </div>
                  <div>
                    <p className="createdAt">{each.createdAt.slice(0, 10)}</p>
                    <h6 className="username-comment">
                      {each.commentUser.username[0].toUpperCase() +
                        each.commentUser.username.slice(1)}
                      :{" "}
                    </h6>{" "}
                    <span className="comment">{each.comment}</span>
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ShowComments;
