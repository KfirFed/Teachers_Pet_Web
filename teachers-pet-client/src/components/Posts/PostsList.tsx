import { Post } from "./../../types/Post";
import { SinglePost } from "./SinglePost";

export interface PostsList {
    postsData: Post[];
    direction?: "column" | "row";
}

export const PostsList: React.FC<PostsList> = ({
    postsData,
    direction = "column",
}) => {
    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: direction === "row" ? "repeat(3, 1fr)" : "1fr",
                gap: "16px",
            }}>
            {postsData.map((post: Post) => (
                <SinglePost
                    key={post?._id}
                    post={post}
                />
            ))}
        </div>
    );
};