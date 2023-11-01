import {
	Avatar,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Divider,
	IconButton,
	InputAdornment,
	Paper,
	Popover,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import ReplyCard from "./ReplyCard";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import { deletePost, replyPost } from "./actions";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const PostCard = ({ post, user, fetchPosts }) => {
	const [showReplies, setShowReplies] = React.useState(false);
	const [showReply, setShowReply] = React.useState(false);
	const [reply, setReply] = React.useState("");
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = event => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? "simple-popover" : undefined;

	const replyToPost = async () => {
		replyPost(user.userId, post.id, reply).then(() => {
			fetchPosts();
			setReply("");
		});
	};

	const removePost = async () => {
		deletePost(post.id).then(() => {
			fetchPosts();
		});
	};

	return (
		<>
			<Paper
				sx={{
					paddingTop: "40px",
					paddingBottom: "10px",
					paddingX: "20px",
					borderRadius: "10px",
				}}>
				<Stack spacing={3}>
					<Stack
						direction="row"
						justifyContent="space-between">
						<Stack
							direction="row"
							spacing={1}
							alignItems="center">
							<Avatar
								alt={post.user}
								src={`https://ui-avatars.com/api/?background=random&name=${post.user}`}
							/>
							<Typography variant="subtitle2">{post.user}</Typography>
						</Stack>
						{post.user === user.username && (
							<IconButton
								aria-label="delete"
								onClick={handleClick}>
								<InfoOutlinedIcon />
							</IconButton>
						)}

						<Popover
							id={id}
							open={open}
							anchorEl={anchorEl}
							onClose={handleClose}
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "center",
							}}
							transformOrigin={{
								vertical: "top",
								horizontal: "right",
							}}>
							<Button
								color="error"
								variant="outlined"
								startIcon={<DeleteIcon />}
								onClick={removePost}>
								Delete
							</Button>
						</Popover>
					</Stack>

					<Typography
						variant="body1"
						sx={{ wordWrap: "break-word" }}>
						{post.post}
					</Typography>
					<Divider />
					<Stack
						spacing={1}
						direction="row"
						justifyContent="space-between">
						<Button
							variant="outlined"
							onClick={() => setShowReplies(true)}>
							View Replies
						</Button>
						<Button
							variant="contained"
							onClick={() => setShowReply(true)}>
							Reply
						</Button>
					</Stack>
					{showReply && (
						<>
							<Divider />
							<Stack
								spacing={1}
								direction="row">
								<Avatar
									alt={user.username}
									src={`https://ui-avatars.com/api/?background=random&name=${user.username}`}
								/>
								<TextField
									fullWidth
									variant="filled"
									value={reply}
									onChange={e => setReply(e.target.value)}
									InputProps={{
										disableUnderline: true,
										endAdornment: (
											<InputAdornment position="end">
												<IconButton onClick={replyToPost}>
													<SendIcon />
												</IconButton>
											</InputAdornment>
										),
									}}
									placeholder="Reply to a post..."
									rows={2}
									multiline
								/>
							</Stack>
						</>
					)}
				</Stack>
			</Paper>
			<Dialog
				open={showReplies}
				onClose={() => setShowReplies(false)}
				maxWidth="xs"
				fullWidth>
				{post.reply ? (
					<>
						<DialogTitle>{post.reply.length} Replies</DialogTitle>
						<DialogContent dividers>
							<Stack
								spacing={2}
								divider={<Divider />}>
								{post.reply.map(reply => (
									<ReplyCard
										reply={reply}
										key={reply.id}
										fetchPosts={fetchPosts}
										user={user}
									/>
								))}
							</Stack>
						</DialogContent>
					</>
				) : (
					<DialogTitle>No Replies</DialogTitle>
				)}
				<DialogActions>
					<Button
						variant="outlined"
						autoFocus
						onClick={() => setShowReplies(false)}>
						Close
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

PostCard.propTypes = {
	post: PropTypes.shape({
		id: PropTypes.string.isRequired,
		user: PropTypes.string.isRequired,
		post: PropTypes.string.isRequired,
		reply: PropTypes.arrayOf(
			PropTypes.shape({
				id: PropTypes.string,
				reply: PropTypes.string,
				user: PropTypes.string,
			})
		),
	}).isRequired,
	user: PropTypes.shape({
		username: PropTypes.string.isRequired,
		userId: PropTypes.string.isRequired,
	}),
	fetchPosts: PropTypes.func.isRequired,
};

export default PostCard;
