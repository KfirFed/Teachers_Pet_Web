import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    Box,
    Button,
} from "@mui/material";
import SingleComment from "./SingleComment"
import { Comment } from "../../types/Comment";

interface CommentsModalProps {
    isOpen: boolean;
    onClose: () => void;
    postId: string
}

const CommentsDialog: React.FC<CommentsModalProps> = ({
    isOpen,
    onClose,
}) => {
    const [newComment, setNewComment] = useState<string>("");
    const commentsData: Comment[] = []

    const onSave = async (e: React.FormEvent) => { };

    return (
        <Dialog open={isOpen} onClose={onClose} maxWidth='sm' fullWidth>
            <DialogTitle sx={{ m: 0, p: 2 }}>
                Comments
                <Button
                    onClick={onClose}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}>
                    Close
                </Button>
            </DialogTitle>

            <DialogContent>
                <Box sx={{ mb: 2, maxHeight: "60vh", overflowY: "auto" }}>
                    {commentsData.map((comment: Comment) => (
                        <SingleComment comment={comment} />
                    ))}
                </Box>
                <Box
                    component='form'
                    onSubmit={onSave}
                    sx={{
                        display: "flex",
                        gap: 1,
                        position: "sticky",
                        bottom: 0,
                        bgcolor: "background.paper",
                        pt: 2,
                        flexDirection: "row-reverse",
                    }}>
                    <TextField
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder='הוספת תגובה'
                        variant='outlined'
                        size='small'
                        fullWidth
                        autoFocus
                    />
                    <Button
                        type='submit'
                        variant='contained'
                        disabled={!newComment.trim()}>
                        publish
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default CommentsDialog;