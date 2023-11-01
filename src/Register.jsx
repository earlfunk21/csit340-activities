import {
	Alert,
	Box,
	Button,
	Container,
	FormControl,
	Link,
	Paper,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "./actions";

const Register = () => {
	const [username, setUsername] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [errorMessage, setErrorMessage] = React.useState("");

	const navigate = useNavigate();
	const onRegister = async () => {
		await createUser(username, password)
			.then(data => {
				navigate("/home", {
					state: { username: data.username, userId: String(data.id) },
				});
			})
			.catch(error => {
				console.error(error);
				setErrorMessage("Register Failed");
				throw "Register Failed";
			});
	};

	return (
		<Box
			display="flex"
			alignItems="center"
			minHeight="100vh">
			<Container maxWidth="sm">
				<Paper
					sx={{ padding: "40px", borderRadius: "10px" }}
					elevation={3}>
					<Stack marginBottom={4}>
						<Typography variant="h3">Register</Typography>
						<Typography
							variant="caption"
							color="grey.500">
							Secured your account
						</Typography>
					</Stack>
					<Stack spacing={4}>
						{errorMessage && <Alert severity="error">{errorMessage}</Alert>}
						<FormControl fullWidth>
							<TextField
								placeholder="Username"
								value={username}
								onFocus={() => setErrorMessage("")}
								onChange={e => setUsername(e.target.value)}
							/>
						</FormControl>
						<FormControl fullWidth>
							<TextField
								placeholder="Password"
								type="password"
								value={password}
								onFocus={() => setErrorMessage("")}
								onChange={e => setPassword(e.target.value)}
							/>
						</FormControl>
						<Stack
							direction="row"
							justifyContent="space-between">
							<Link href="/">Already have an account</Link>
							<Button
								variant="contained"
								size="large"
								onClick={onRegister}>
								Register
							</Button>
						</Stack>
					</Stack>
				</Paper>
			</Container>
		</Box>
	);
};

export default Register;
