import React, { useEffect, useState } from "react";
import "../styles/Post.css";
import Avatar from "@material-ui/core/Avatar";
import { db } from "../firebase";
import firebase from "firebase/app";

function Post({ postId, user, username, caption, imageURL }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState([]);

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
    return () => {
      unsubscribe();
    };
  }, [postId]);

  const postComment = (e) => {
    e.preventDefault();
    db.collection("posts").doc(postId).collection("comments").add({
      text: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment("");
  };

  return (
    <div className="post">
      <div className="post_header">
        <Avatar
          className="post_avatar"
          alt={username}
          src="/static/images/avatar/1.jpg"
        />
        <h3>{username}</h3>
      </div>
      <img
        className="post_image"
        // src="https://instagram.fcjb3-1.fna.fbcdn.net/v/t51.2885-15/e35/65221954_2199267686775570_4985004513755585652_n.jpg?_nc_ht=instagram.fcjb3-1.fna.fbcdn.net&_nc_cat=106&_nc_ohc=aTOuq931nAkAX8-1bho&_nc_tp=18&oh=c8d375e83f65c9f47f0313404007130d&oe=5FA5089C"
        src={imageURL}
        alt=""
      />
      <h4 className="post_text">
        <strong>{username}: </strong>
        {caption}
      </h4>
      <div className="post_comments">
        {comments.map((comment, i) => (
          <p key={i}>
            <strong>{comment.username}: </strong> {comment.text}
          </p>
        ))}
      </div>
      {user && (
        <form className="post_commentbox">
          <input
            className="post_input"
            type="text"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            className="post_button"
            type="submit"
            disabled={!comment}
            onClick={postComment}
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
}

export default Post;
