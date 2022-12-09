import React from "react";
import "./comments.css";
import { useState } from "react";
import { BsChatRight, BsChatRightTextFill } from "react-icons/bs";
import CommentSection from "./CommentSection";
import gsap from "gsap";

function ShowComments() {
  const [showComment, setShowComment] = useState(false);

  // Animation likes from GSAP
  const onEnter = () => {
    gsap.to(".chat", { scale: 1.5 });
  };
  const onLeave = () => {
    gsap.to(".chat", { scale: 1 });
  };

  return (
    <div className="container-show-comments">
      {!showComment ? (
        
        <BsChatRight
          className="btn-show-comments chat"
          style={{ color: "#b9b8b8" }}
          onClick={() => setShowComment(!showComment)}
          onMouseEnter={onEnter}
          onMouseLeave={onLeave}
         />
      ) : (
        <BsChatRightTextFill
          className="btn-show-comments chat"
          style={{ color: "#35357c" }}
          onClick={() => setShowComment(!showComment)}
          onMouseEnter={onEnter}
          onMouseLeave={onLeave}
        />
      )}
      <span>Deja tu comentario</span>
      {/* {showComment ? "Ocultar" : <FaRegComments/>} */}
      <div className={showComment ? "show-comments" : "hide-element"}>
        {showComment && <CommentSection />}
      </div>
    </div>
  );
}

export default ShowComments;
