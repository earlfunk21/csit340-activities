import { Card, CardContent, CardHeader } from "./ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ReplyType } from "@/types";
import useAuth from "@/lib/hooks/useAuth";
import { Button } from "./ui/button";
import { MoreVertical, Trash2 } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarImage } from "./ui/avatar";

type Props = {
	reply: ReplyType;
};

function ReplyCard({ reply }: Props) {
	const { user } = useAuth();
	const navigate = useNavigate();

	function deleteReply() {
		axios
			.get(`http://hyeumine.com/forumDeleteReply.php?id=${reply.id}`, {
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
		<Card>
			<CardHeader>
				<div className="flex justify-between">
					<div className="flex  space-x-2">
						<Avatar>
							<AvatarImage
								src={`https://ui-avatars.com/api/?background=random&name=${reply.user}`}
							/>
						</Avatar>
						<div className="flex flex-col">
							<div className="font-bold text-md">{reply.user}</div>
							<div className="italic text-muted-foreground text-sm">
								{reply.date}
							</div>
						</div>
					</div>
					{reply.user === user?.username && (
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="ghost"
									className="p-0">
									<MoreVertical className="text-muted-foreground" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuItem onClick={deleteReply}>
									<Trash2 className="mr-2 h-4 w-4" />
									<span>Delete</span>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					)}
				</div>
			</CardHeader>
			<CardContent>{reply.reply}</CardContent>
		</Card>
	);
}

export default ReplyCard;
