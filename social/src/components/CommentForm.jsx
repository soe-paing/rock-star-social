import { useRef } from "react";

import { Box, TextField, Button } from "@mui/material";

export default function CommentForm() {
	const contentRef = useRef();

	return (
		<form
			onSubmit={e => {
				e.preventDefault();
				const content = contentRef.current.value;
                
				// add.mutate(content);

				e.currentTarget.reset();
			}}>
			<Box sx={{
                    mb: 4,
                    flexDirection: "row",
                }}>
				<TextField
					inputRef={contentRef}
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
