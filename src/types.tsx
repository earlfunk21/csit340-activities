export type ReplyType = {
  id: string;
	date: string;
	reply: string;
	user: string;
};

export type PostType = {
  id: string;
	post: string;
	date: string;
	user: string;
	reply: ReplyType[];
};
