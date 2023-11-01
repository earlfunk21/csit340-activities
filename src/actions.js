import axios from "axios";

export const getPosts = async page => {
	return axios
		.get(`http://hyeumine.com/forumGetPosts.php?page=${page}`)
		.then(reponse => {
			return reponse.data;
		})
		.catch(err => {
			throw new Error(err);
		});
};

export const getUser = async (username, password) => {
	return axios
		.post(
			`http://hyeumine.com/forumLogin.php`,
			{
				username: username,
				password: password,
			},
			{
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
			}
		)
		.then(response => {
			if (response.status !== 200) {
				throw new Error("Network response was not ok");
			}
			return response.data;
		})
		.catch(error => {
			throw new Error(error);
		});
};

export const createPost = async (userId, post) => {
	return axios
		.post(
			`http://hyeumine.com/forumNewPost.php`,
			{
				id: userId,
				post: post,
			},
			{
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
			}
		)
		.then(response => {
			if (response.status !== 200) {
				throw new Error("Network response was not ok");
			}
		})
		.catch(error => {
			throw new Error(error);
		});
};

export const replyPost = async (userId, postId, reply) => {
	return axios
		.post(
			`http://hyeumine.com/forumReplyPost.php`,
			{
				user_id: userId,
				post_id: postId,
				reply: reply,
			},
			{
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
			}
		)
		.then(response => {
			if (!(response.status === 200 && response.statusText === "OK")) {
				throw new Error("Network response was not ok");
			}
		});
};

export const deletePost = async postId => {
	return axios
		.get(`http://hyeumine.com/forumDeletePost.php?id=${postId}`, {
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
		})
		.then(response => {
			if (!(response.status === 200 && response.statusText === "OK")) {
				throw new Error("Network response was not ok");
			}
		});
};

export const deleteReply = async replyId => {
	return axios
		.get(`http://hyeumine.com/forumDeleteReply.php?id=${replyId}`, {
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
		})
		.then(response => {
			if (!(response.status === 200 && response.statusText === "OK")) {
				throw new Error("Network response was not ok");
			}
		});
};

export const createUser = async (username, password) => {
	return axios
		.post(
			`http://hyeumine.com/forumCreateUser.php`,
			{
				username: username,
				password: password,
			},
			{
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
			}
		)
		.then(response => {
      if(response.status !== 200 || response.statusText !== "OK"){
        throw new Error("Network response was not ok")
      }
			return response.data;
		})
};
