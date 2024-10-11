import { ButtonGroup, IconButton, Button } from "@mui/material";

import { useMutation, useQueryClient } from "react-query";

import { useApp } from "../ThemedApp";

async function postLike(postId) {
    const token = localStorage.getItem("token");

    const res = await fetch(`http://localhost:8080/like/${postId}`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return res.json();
}

async function deletePostUnlike(postId) {
    const token = localStorage.getItem("token");

    const res = await fetch(`http://localhost:8080/unlike/${postId}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

import {
    FavoriteBorder as LikeIcon,
    Favorite as LikedIcon,
} from "@mui/icons-material"

export default function LikeButton({ item }) {
    const { auth, authUser } = useApp();
    const queryClient = useQueryClient();

    function isLiked() {
        if(auth && item.likes) {
            return item.likes.find(like => like.userId == authUser.id);
        }

        return false;
    }

    const like = useMutation(postLike, {
        onSuccess: async () => {
            await queryClient.cancelQueries("posts");
            await queryClient.invalidateQueries("posts");
            await queryClient.invalidateQueries("post");
        }
    })

    const unlike = useMutation(deletePostUnlike, {
        onSuccess: async () => {
            await queryClient.cancelQueries("posts");
            await queryClient.invalidateQueries("posts");
            await queryClient.invalidateQueries("post");
        }
    })

    return <ButtonGroup>
        {isLiked() ? (
            <IconButton
                size="small"
                onClick={ e => {
                unlike.mutate(item.id);
                e.stopPropagation();
            }}>
                <LikedIcon
                    fontSize="small"
                    color="error"
                />
            </IconButton>
        ) : (
            <IconButton
                size="small"
                onClick={ e => {
                like.mutate(item.id);
                e.stopPropagation();
            }}>
                <LikeIcon
                    fontSize="small"
                    color="error"
                />
            </IconButton>
        )}
        <Button
            size="small"
            variant="text">
            {item.likes ? item.likes.length : 0}
        </Button>
    </ButtonGroup>
}