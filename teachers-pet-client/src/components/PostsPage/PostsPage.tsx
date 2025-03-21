import { PostsList } from "../Posts/PostsList";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { IconButton } from "@mui/material";

export const PostsPage: React.FC = () => {

    return (
        <div>
            <IconButton
                aria-label='show comments'
                onClick={() => { }}>
                <FilterAltIcon />
            </IconButton>
            <PostsList postsData={[]} />
        </div>
    );
};