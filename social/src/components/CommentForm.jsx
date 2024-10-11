import { useRef } from "react";

import { Box, TextField, Button } from "@mui/material";
import { useMutation, useQueryClient } from "react-query";

async function postComment(postId, comment) {
	const token = localStorage.getItem('token');

	console.log(postId)
	console.log(comment);
	console.log(token);

	const res = await fetch(`http://localhost:8080/comment/${postId}`, {
		method: "POST",
		body: JSON.stringify({ comment }),
		headers: {
            Authorization: `Bearer ${token}`
		}
	})

	return res.json();
}

export default function CommentForm({ postId }) {
	const commentRef = useRef();

    const queryClient = useQueryClient();

	const addComment = useMutation(({postId, comment}) => postComment(postId, comment), {
		onSuccess: async () => {
            await queryClient.cancelQueries("posts");
            queryClient.invalidateQueries("posts");
        }
	})

	return (
		<form
			onSubmit={e => {
				e.preventDefault();
				const comment = commentRef.current.value;
                
				addComment.mutate({postId, comment});

				e.currentTarget.reset();
			}}>
			<Box sx={{
                    mb: 4,
                    flexDirection: "row",
                }}>
				<TextField
					sx={{
						flex: 1
					}}
					size="small"
					inputRef={commentRef}
					type="text"
					placeholder="Comment"
					multiline
				/>
				<Button
					variant="contained"
					type="submit">
					Submit
				</Button>
			</Box>
		</form>
	);
}
