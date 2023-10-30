import { useEffect, useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "./components/ui/card";
import axios from "axios";
import { Button } from "./components/ui/button";
import { Separator } from "./components/ui/separator";
import { ChevronLeft, ChevronRight, LogOut } from "lucide-react";
import { Textarea } from "./components/ui/textarea";
import useAuth from "./lib/hooks/useAuth";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "./components/ui/form";
import { Link, useNavigate } from "react-router-dom";
import { PostType } from "./types";
import PostCard from "./components/PostCard";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "./components/ui/dropdown-menu";
import { Avatar, AvatarImage } from "./components/ui/avatar";
import { ModeToggle } from "./components/mode-toggle";
import { Skeleton } from "./components/ui/skeleton";
import { toast } from "./components/ui/use-toast";

const PostFormSchema = z.object({
	post: z.string(),
});

function App() {
	const [posts, setPosts] = useState<PostType[]>([]);
	const [page, setPage] = useState(1);
	const { user, onLogout } = useAuth();
	const navigate = useNavigate();
	const postForm = useForm<z.infer<typeof PostFormSchema>>({
		resolver: zodResolver(PostFormSchema),
	});
	const [isLoading, setIsLoading] = useState(false);
	const [focus, setFocus] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		axios
			.get(`http://hyeumine.com/forumGetPosts.php?page=${page}`)
			.then(response => {
				if (!(response.status === 200 && response.statusText === "OK")) {
					throw new Error("Network response was not ok");
				}
				setPosts(response.data);
			})
			.catch(error => {
				toast({
					variant: "destructive",
					title: "There was a problem with the fetch operation",
					description: error,
				});
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, [page]);

	const addNewPost = (data: z.infer<typeof PostFormSchema>) => {
		axios
			.post(
				`http://hyeumine.com/forumNewPost.php`,
				{
					id: user?.userId,
					post: data.post,
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
				toast({
					variant: "destructive",
					title: "There was a problem with the fetch operation",
					description: error,
				});
			});
	};

	return (
		<div className="min-h-screen flex">
			<div className="container flex flex-col gap-y-5 max-w-[700px] pt-4">
				{user ? (
					<>
						<div className="flex justify-end space-x-4">
							<ModeToggle />
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Avatar className="cursor-pointer">
										<AvatarImage
											src={`https://ui-avatars.com/api/?background=random&name=${user.username}`}
										/>
									</Avatar>
								</DropdownMenuTrigger>
								<DropdownMenuContent>
									<DropdownMenuLabel>{user.username}</DropdownMenuLabel>
									<Separator />
									<DropdownMenuItem
										className="cursor-pointer hover:opacity-70"
										onClick={onLogout}>
										<LogOut className="mr-2 h-4 w-4" />
										<span>Logout</span>
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>

						<Form {...postForm}>
							<form onSubmit={postForm.handleSubmit(addNewPost)}>
								<Card className="mt-4 bg-secondary/10">
									<CardHeader>
										<CardTitle>Create Post</CardTitle>
										<CardDescription>Add new Post</CardDescription>
									</CardHeader>
									<CardContent className="p-4">
										<FormField
											control={postForm.control}
											name="post"
											render={({ field }) => (
												<FormItem>
													<FormControl>
														<Textarea
															placeholder="Say Something..."
															{...field}
															rows={focus ? 10 : 3}
															className="focus-visible:ring-rose-500 transition-all ease-in-out duration-300"
															onFocus={() => setFocus(true)}
															onBlur={() => setFocus(false)}
														/>
													</FormControl>
												</FormItem>
											)}
										/>
									</CardContent>
									<CardFooter className="flex justify-end">
										<Button
											className="bg-rose-500 hover:bg-rose-600 text-white"
											type="submit">
											Add Post
										</Button>
									</CardFooter>
								</Card>
							</form>
						</Form>
					</>
				) : (
					<Button asChild>
						<Link to="/login">Login</Link>
					</Button>
				)}

				<div className="flex gap-x-4 justify-center">
					<Button
						onClick={() => setPage(prev => prev - 1)}
						disabled={page <= 1}
						variant="outline">
						<ChevronLeft className="h-4 w-4" />
						Previous Page
					</Button>
					<Separator orientation="vertical" />
					<Button
						onClick={() => setPage(prev => prev + 1)}
						variant="outline">
						Next Page
						<ChevronRight className="h-4 w-4" />
					</Button>
				</div>

				{isLoading ? (
					<Card>
						<CardHeader>
							<div className="flex space-x-2">
								<Skeleton className="h-12 w-12 rounded-full" />
								<div className="flex flex-col space-y-2">
									<Skeleton className="h-4 w-[200px]" />
									<Skeleton className="h-4 w-[200px]" />
								</div>
							</div>
						</CardHeader>
						<CardContent className="space-y-3">
							<Skeleton className="h-4 w-full" />
							<Skeleton className="h-4 w-[90%]" />
							<Skeleton className="h-4 w-[70%]" />
						</CardContent>
					</Card>
				) : (
					posts.map(post => <PostCard post={post} key={post.id} />)
				)}
			</div>
		</div>
	);
}

export default App;
