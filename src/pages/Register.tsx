import FormAuth, { formSchema } from "@/components/FormAuth";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import useAuth from "@/lib/hooks/useAuth";
import axios from "axios";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as z from "zod";

function Register() {
	const navigate = useNavigate();
	const [errorMsg, setErrorMsg] = useState("");
	const { onLogin } = useAuth();

	const onSubmit = (data: z.infer<typeof formSchema>) => {
		axios
			.post(
				`http://hyeumine.com/forumCreateUser.php`,
				{
					username: data.username,
					password: data.password,
				},
				{
					headers: {
						"Content-Type": "application/x-www-form-urlencoded",
					},
				}
			)
			.then(response => {
				if (
					!(
						response.status === 200 &&
						response.statusText === "OK"
					)
				) {
					throw new Error("Network response was not ok");
				}
				onLogin(response.data.username, response.data.id);
				navigate("/");
			})
			.catch(error => {
				setErrorMsg("There was a problem with the fetch operation:', " + error);
			});
	};

	return (
		<div className="flex justify-center item-center mt-24">
			<Card className="container max-w-[700px]">
				<CardHeader>
					<CardTitle className="flex justify-between">
						Create an account
						<Button
							variant="link"
							asChild>
							<Link to="/login">
								Already have an account <ChevronRight className="h-4 w-4" />
							</Link>
						</Button>
					</CardTitle>
					<CardDescription>Sign up</CardDescription>
				</CardHeader>
				<CardContent>
					{errorMsg && (
						<blockquote className="mt-6 border-l-2 pl-6 italic text-red-500">
							{errorMsg}
						</blockquote>
					)}
					<FormAuth
						label="Login"
						onSubmit={onSubmit}
					/>
				</CardContent>
			</Card>
		</div>
	);
}

export default Register;
