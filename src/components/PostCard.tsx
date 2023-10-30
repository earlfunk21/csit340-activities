import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "./ui/collapsible";
import { MessagesSquare, MoreVertical, Trash2 } from "lucide-react";
import { PostType } from "@/types";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import axios from "axios";
import useAuth from "@/lib/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import ReplyCard from "./ReplyCard";
import { Avatar, AvatarImage } from "./ui/avatar";

type Props = {
	post: PostType;
};

const formSchema = z.object({
	reply: z.string(),
});

function PostCard({ post }: Props) {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	});
	const { user } = useAuth();
	const navigate = useNavigate();

	function onSubmit(data: z.infer<typeof formSchema>) {
		axios
			.post(
				`http://hyeumine.com/forumReplyPost.php`,
				{
					user_id: user?.userId,
					post_id: post.id,
					reply: data.reply,
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
				navigate(0);
			})
			.catch(error => {
				console.error("There was a problem with the fetch operation:", error);
			});
	}

	function deletePost() {
		axios
			.get(`http://hyeumine.com/forumDeletePost.php?id=${post.id}`, {
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
			})
			.then(response => {
				if (!(response.status === 200 && response.statusText === "OK")) {
					throw new Error("Network response was not ok");
				}
				navigate(0);
			})
			.catch(error => {
				console.error("There was a problem with the fetch operation:", error);
			});
	}

	return (
		<Card
			className="pt-3 bg-secondary/10"
			key={post.id}>
			<CardHeader>
				<div className="flex justify-between">
					<div className="flex space-x-2">
						<Avatar>
							<AvatarImage
								src={`https://ui-avatars.com/api/?background=random&name=${post.user}`}
							/>
						</Avatar>
						<div className="flex flex-col">
							<div className="font-bold text-md">{post.user}</div>
							<div className="italic text-muted-foreground text-sm">
								{post.date}
							</div>
						</div>
					</div>
					{post.user === user?.username && (
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="ghost"
									className="p-0">
									<MoreVertical className="text-muted-foreground" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuItem onClick={deletePost}>
									<Trash2 className="mr-2 h-4 w-4" />
									<span>Delete</span>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					)}
				</div>
			</CardHeader>
			<CardContent>
				<p className="break-words">{post.post}</p>
			</CardContent>
			<CardFooter className="flex flex-col">
				<Collapsible className="w-full">
					<CollapsibleTrigger asChild>
						<div className="flex justify-end">
							<Button
								className="underline flex gap-x-2"
								variant="outline">
								<MessagesSquare />
								Reply
							</Button>
						</div>
					</CollapsibleTrigger>
					<CollapsibleContent className="mt-2 space-y-2">
						<div className="flex w-full space-x-2 items-center">
							<Form {...form}>
								<form
									onSubmit={form.handleSubmit(onSubmit)}
									className="w-full flex flex-col items-end space-y-2">
									<FormField
										control={form.control}
										name="reply"
										render={({ field }) => (
											<FormItem className="w-full flex space-x-2">
												<Avatar className="cursor-pointer mt-2">
													<AvatarImage
														src={`https://ui-avatars.com/api/?background=random&name=${post.user}`}
													/>
												</Avatar>
												<FormControl>
													<Textarea
														placeholder="Reply to post"
														className="my-3"
														{...field}
													/>
												</FormControl>
											</FormItem>
										)}
									/>

									<Button type="submit">Submit</Button>
								</form>
							</Form>
						</div>
					</CollapsibleContent>
				</Collapsible>
				{post.reply && (
					<Collapsible className="w-full flex justify-center flex-col">
						<CollapsibleTrigger asChild>
							<Button
								variant="link"
								className="underline hover:no-underline">
								Show {post.reply.length} Replies
							</Button>
						</CollapsibleTrigger>
						<CollapsibleContent>
							{post.reply &&
								post.reply.map(reply => (
									<ReplyCard
										reply={reply}
										key={reply.id}
									/>
								))}
						</CollapsibleContent>
					</Collapsible>
				)}
			</CardFooter>
		</Card>
	);
}

export default PostCard;
