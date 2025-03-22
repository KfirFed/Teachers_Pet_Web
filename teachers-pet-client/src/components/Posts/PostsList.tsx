import React, { useState } from "react";
import { Post } from "./../../types/Post";
import { SinglePost } from "./SinglePost";

export interface PostsListProps {
  postsData: Post[];
  direction?: "column" | "row";
}

export const PostsList: React.FC<PostsListProps> = ({
  postsData,
  direction = "column",
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = postsData.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(postsData.length / postsPerPage);

  return (
    <div>
      <div style={{ marginTop: "16px", textAlign: "center" }}>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            style={{
              margin: "5px 5px",
              padding: "8px 12px",
              backgroundColor: index + 1 === currentPage ? "#ccc" : "#eee",
              border: "none",
              cursor: "pointer",
            }}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: direction === "row" ? "repeat(3, 1fr)" : "1fr",
          gap: "16px",
        }}
      >
        {currentPosts.map((post: Post) => (
          <SinglePost key={post?._id} post={post} />
        ))}
      </div>
    </div>
  );
};
