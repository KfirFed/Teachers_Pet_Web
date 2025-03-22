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

    // to remove before push
    const staticPostData = [
        {
            id: '1',
            title: 'First Post',
            content: 'This is the content of the first post.',
            image: 'image1.jpg',
            senderId: 'user123',
            likes: ['user456', 'user789'],
        },
        {
            id: '2',
            title: 'A Second Article',
            content: 'Another article with interesting details.',
            image: 'image2.png',
            senderId: 'user456',
            likes: ['user123', 'user987', 'user000'],
        },
        {
            id: '3',
            title: 'Third Time\'s the Charm',
            content: 'This is a short post.',
            image: 'image3.gif',
            senderId: 'user789',
            likes: ['user000'],
        },
        {
            id: '4',
            title: 'The Final Entry',
            content: 'The last entry in this array of objects. A very long post designed to test how multiline strings are displayed.',
            image: 'image4.jpeg',
            senderId: 'user987',
            likes: ['user123', 'user456', 'user789', 'user000'],
        },
    ]

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
            <PostsList postsData={staticPostData} />
        </div>
    );
};