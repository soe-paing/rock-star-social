import { Box, Typography, OutlinedInput, Button, Alert } from "@mui/material";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";

async function postRegister(data) {
	const res = await fetch("http://localhost:8080/register", {
		method: "POST",
		body: JSON.stringify(data),
		headers: {
			"Content-Type": "application/json",
		}
	})

	return res.json();
}

export default function Register() {
	const nameRef = useRef();
	const usernameRef = useRef();
	const profileRef = useRef();
	const passwordRef = useRef();

	const navigate = useNavigate();

	const [ error, setError ] = useState();

	const register = useMutation(postRegister, {
		onSuccess: () => navigate("/login"),
	})

	return (
		<Box>
			<Typography
				variant="h3"
				sx={{ mb: 4 }}>
				Register
			</Typography>

			{error && (
				<Alert
					severity="warning"
					sx={{ mb: 4 }}>
					{error}
				</Alert>
			)}

			<form
				onSubmit={ e => {
					e.preventDefault();

					const name = nameRef.current.value;
					const username = usernameRef.current.value;
					const profile = profileRef.current.value;
					const password = passwordRef.current.value;

					if(!name || !username || !password) {
						return setError("require name, username and password");
					}

					register.mutate({ name, username, profile, password });

					e.currentTarget.reset();
				}}
			>
				<OutlinedInput
					inputRef={nameRef}
					sx={{ mb: 2 }}
					fullWidth
					placeholder="Name"
				/>
				<OutlinedInput
					inputRef={usernameRef}
					sx={{ mb: 2 }}
					fullWidth
					placeholder="Username"
				/>
				<OutlinedInput
					inputRef={profileRef}
                    multiline
					sx={{ mb: 2 }}
					fullWidth
					placeholder="Profile"
				/>
				<OutlinedInput
					inputRef={passwordRef}
					sx={{ mb: 2 }}
					fullWidth
					placeholder="Password"
					type="password"
				/>

				<Button
					variant="contained"
					type="submit"
					fullWidth>
					Register
				</Button>
			</form>
		</Box>
	);
}
