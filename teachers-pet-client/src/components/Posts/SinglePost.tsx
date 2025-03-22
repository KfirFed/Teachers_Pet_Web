import React from "react";
import {
  Card,
  Typography,
  CardMedia,
  CardContent,
  Stack,
  styled,
  Box,
  Avatar,
} from "@mui/material";
import { Post } from "./../../types/Post";
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { axiosLikePost } from "../../axios/Post";

interface SinglePostProps {
  post: Post;
}

const SinglePostStyle = styled(Card)(({ theme }) => ({
  width: "100%",
  maxWidth: 500,
  margin: "0 auto",
  borderRadius: theme.spacing(2),
  boxShadow: "none",
  border: `1px solid ${theme.palette.divider}`,
}));

export const SinglePost: React.FC<SinglePostProps> = ({ post }) => {
  const { connectedUser } = useContext(UserContext);
  const [currentPost, setCurrentPost] = useState<Post>(post);

  const comments = []

  const handleAddComment = () => { }

  const handleLike = () => {
    if (!connectedUser) return;
    const accessToken = connectedUser?.accessToken;
    try {
      axiosLikePost(currentPost._id, connectedUser._id, accessToken);
      if (currentPost.likes.includes(connectedUser._id)) {
        setCurrentPost({
          ...currentPost,
          likes: currentPost.likes.filter((id) => id !== connectedUser._id),
        });
      } else {
        setCurrentPost({
          ...currentPost,
          likes: [...currentPost.likes, connectedUser._id],
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SinglePostStyle>
      <CardContent>
        <Stack direction="row" alignItems="center" spacing={1} mb={2}>
          <Avatar
            sx={{ bgcolor: "primary.light", width: 32, height: 32 }}
            src={connectedUser?.profileImage}
          />
          <Typography variant="body2" color="text.secondary">
            {currentPost.senderId}
            {/* TODO: add the sender name */}
          </Typography>
        </Stack>

        {currentPost.image && (
          <CardMedia component="img" height="194" image={currentPost.image} />
        )}

        <Box mb={1}>
          <Typography variant="h6" gutterBottom>
            {currentPost.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            {currentPost.content}
          </Typography>
          <div style={{ display: "grid", gridAutoFlow: "column" }}>
            <div>
              <Typography variant="body2" color="text.secondary" paragraph>
                ❤️: {currentPost.likes.length}
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                <button onClick={handleLike}>
                  {!currentPost.likes.includes(connectedUser?._id!!)
                    ? "Like"
                    : "Dislike"}
                </button>
              </Typography>
            </div>
            <div>
              <Typography variant="body2" color="text.secondary" paragraph>
                🗨️: {comments.length}
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                <button onClick={handleAddComment}>
                  Add Comment
                </button>
              </Typography>
            </div>
          </div>

        </Box>
      </CardContent>
    </SinglePostStyle>
  );
};
