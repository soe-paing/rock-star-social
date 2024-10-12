import { useRef } from "react";

import { Box, TextField, Button } from "@mui/material";
import { useMutation, useQueryClient } from "react-query";

async function postComment(content) {
	const token = localStorage.getItem('token');

	const res = await fetch(`http://localhost:8080/comment/${data.postId}`, {
		method: "POST",
		body: JSON.stringify(data),
		headers: {
            Authorization: `Bearer ${token}`
		}
	})

	return res.json();
}

export default function CommentForm({ postId }) {
	const commentRef = useRef();

    const queryClient = useQueryClient();

	const addComment = useMutation(
		async function postComment(content) {
			const token = localStorage.getItem('token');
		
			const res = await fetch(`http://localhost:8080/comment/${postId}`, {
				method: "POST",
				body: JSON.stringify({ content }),
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
		
			return res.json();
		}, {
			onSuccess: async () => {
				await queryClient.cancelQueries("posts");
				queryClient.invalidateQueries("posts");
			}
		}
	);

	return (
		<form
			onSubmit={e => {
				e.preventDefault();
				const content = commentRef.current.value;
                
				addComment.mutate({content});

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
