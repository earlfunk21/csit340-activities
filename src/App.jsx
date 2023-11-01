import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import {
	Avatar,
	Button,
	Pagination,
	Paper,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import PostCard from "./PostCard";
import { createPost, getPosts } from "./actions";
import React from "react";

export default function App() {
	const location = useLocation();
	const user = location.state;
	const [posts, setPosts] = React.useState([]);
	const [page, setPage] = React.useState(1);
	const [post, setPost] = React.useState("");

	const fetchPosts = React.useCallback(async () => {
		getPosts(page).then(data => {
			setPosts(data);
		});
	}, [page]);

	const addPost = async () => {
		createPost(user.userId, post).then(() => {
			fetchPosts();
      setPost("");
		});
	};

	React.useEffect(() => {
		fetchPosts();
	}, [fetchPosts]);

	return (
		<Box
			display="flex"
			justifyContent="center"
			minHeight="100vh"
			paddingTop={4}>
			<Container maxWidth="sm">
				<Stack spacing={3}>
					<Paper
						sx={{
							paddingTop: "40px",
							paddingBottom: "20px",
							paddingX: "20px",
							borderRadius: "10px",
						}}
						elevation={3}>
						<Stack spacing={3}>
							<Stack
								direction="row"
								spacing={1}
								alignItems="center">
								<Avatar
									alt={user.username}
									src={`https://ui-avatars.com/api/?background=random&name=${user.username}`}
								/>
								<Typography variant="subtitle2">{user.username}</Typography>
							</Stack>
							<TextField
								multiline
								variant="standard"
								placeholder="Write a caption..."
								fullWidth
								rows={4}
								value={post}
								onChange={e => setPost(e.target.value)}
								InputProps={{ disableUnderline: true }}
							/>
							<Button
								variant="contained"
								fullWidth
								onClick={addPost}>
								Post
							</Button>
						</Stack>
					</Paper>
					<Box
						display="flex"
						justifyContent="center">
						<Stack spacing={2}>
							<Pagination
								count={10}
								onChange={(event, page) => setPage(page)}
								variant="outlined"
							/>
						</Stack>
					</Box>

					{posts.map(post => (
						<PostCard
							post={post}
							user={user}
							key={post.id}
              fetchPosts={fetchPosts}
						/>
					))}
				</Stack>
			</Container>
		</Box>
	);
}
