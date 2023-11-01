import {
	Avatar,
	Button,
	IconButton,
	Popover,
	Stack,
	Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { deleteReply } from "./actions";

const ReplyCard = ({ reply, user, fetchPosts }) => {
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = event => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? "simple-popover" : undefined;

	const removeReply = async () => {
		deleteReply(reply.id).then(() => {
			fetchPosts();
		});
	};

	return (
		<Stack spacing={2}>
			<Stack>
				<Stack
					direction="row"
					justifyContent="space-between"
          alignItems="center">
					<Typography color="grey.500" variant="body1" fontStyle="italic">{reply.date}</Typography>
					{reply.user === user.username && (
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
							onClick={removeReply}>
							Delete
						</Button>
					</Popover>
				</Stack>
				<Stack
					direction="row"
					spacing={1}
					alignItems="center">
					<Avatar
						alt={reply.user}
						src={`https://ui-avatars.com/api/?background=random&name=${reply.user}`}
					/>
					<Typography variant="subtitle2">{reply.user}</Typography>
				</Stack>
			</Stack>

			<Typography
				variant="body1"
				sx={{ wordWrap: "break-word" }}>
				{reply.reply}
			</Typography>
		</Stack>
	);
};

ReplyCard.propTypes = {
	reply: PropTypes.shape({
		id: PropTypes.string,
		reply: PropTypes.string,
		user: PropTypes.string,
		date: PropTypes.string,
	}),
	user: PropTypes.shape({
		username: PropTypes.string.isRequired,
		userId: PropTypes.string.isRequired,
	}),
	fetchPosts: PropTypes.func.isRequired,
};
export default ReplyCard;
