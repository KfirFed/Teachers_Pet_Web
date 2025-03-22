import React from 'react';
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

  return (
    <SinglePostStyle>
      <CardContent>
        <Stack direction='row' alignItems='center' spacing={1} mb={2}>
          <Avatar
            sx={{ bgcolor: "primary.light", width: 32, height: 32 }}
            src={connectedUser?.profileImage}
          />
          <Typography variant='body2' color='text.secondary'>
            {currentPost.senderId}
            {/* TODO: add the sender name */}
          </Typography>
        </Stack>

        {currentPost.image && (
          <CardMedia component='img' height='194' image={currentPost.image} />
        )}

        <Box mb={1}>
          <Typography variant='h6' gutterBottom>
            {currentPost.title}
          </Typography>
          <Typography variant='body2' color='text.secondary' paragraph>
            {currentPost.content}
          </Typography>
        </Box>
      </CardContent>
    </SinglePostStyle>
  );
};