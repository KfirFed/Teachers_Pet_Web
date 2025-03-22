import { PostsList } from "../Posts/PostsList";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { IconButton } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Post } from "../../types/Post";
import { axiosGetAllPosts, axiosGetPostsBySender } from './../../axios/Post'
import { UserContext } from "../../context/UserContext";

export const PostsPage: React.FC = () => {
    const [isFiltered, setIsFiltered] = useState<boolean>(false);
    const [postsData, setPostsData] = useState<Post[]>([]);

    const { connectedUser } = useContext(UserContext);

    const getAllPosts = async () => {
        try {
            const allPostsData: Post[] = await axiosGetAllPosts()
            setPostsData(allPostsData)
        } catch (err: any) {
            console.error(err.message);
        }
    };

    const getPostsByConnectedUser = async (senderId: string | undefined) => {
        try {
            const allPostsBySenderId: Post[] = await axiosGetPostsBySender(senderId)
            setPostsData(allPostsBySenderId)
        } catch (err: any) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getAllPosts()
    }, []);

    useEffect(() => {
        if (isFiltered) {
            getPostsByConnectedUser(connectedUser?._id)
        } else {
            getAllPosts()
        }
    }, [isFiltered]);

    return (
        <div>
            <IconButton
                aria-label='only my posts'
                onClick={() => setIsFiltered(!isFiltered)}>
                <FilterAltIcon />
            </IconButton>
            <PostsList postsData={postsData} />
        </div>
    );
};