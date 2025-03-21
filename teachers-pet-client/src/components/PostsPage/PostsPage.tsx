import { PostsList } from "../Posts/PostsList";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { Post } from "../../types/Post";

export const PostsPage: React.FC = () => {
    const [isFiltered, setIsFiltered] = useState<boolean>(false);
    const [postsData, setPostsData] = useState<Post[]>([]);

    // todo: add axios

    useEffect(() => {
        //todo: add posts data
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