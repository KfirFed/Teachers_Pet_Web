import React from "react";
import { Box, Typography } from "@mui/material";
import { Comment } from "../../types/Comment";

interface SingleCommentProps {
    comment: Comment;
}

const SingleComment: React.FC<SingleCommentProps> = ({ comment }) => {
    return (
        <Box sx={{ mb: 2, maxHeight: "60vh", overflowY: "auto" }}>
            <Box
                key={comment._id}
                sx={{
                    display: "flex",
                    gap: 2,
                    mb: 2,
                    alignItems: "flex-start",
                    flexDirection: "row-reverse",
                }}>
                <Typography variant='subtitle2'>{comment.ownerId}</Typography>
                <Box sx={{ textAlign: "right" }}>
                    <Typography
                        variant='body2'
                        color='text.secondary'
                        sx={{ wordBreak: "break-word" }}>
                        {comment.content}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default SingleComment;