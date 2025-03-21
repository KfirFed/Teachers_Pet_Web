import { PostsList } from "../Posts/PostsList";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { Post } from "../../types/Post";
import { axiosGetAllPosts } from './../../axios/Post'

export const PostsPage: React.FC = () => {
    const [isFiltered, setIsFiltered] = useState<boolean>(false);
    const [postsData, setPostsData] = useState<Post[]>([]);

    const getAllPosts = async () => {
        try {
            const allPostsData: Post[] = await axiosGetAllPosts()
            setPostsData(allPostsData)
        } catch (err: any) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getAllPosts()
    }, []);

    useEffect(() => {
        //todo: add posts data by user
        setPostsData([])
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