import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export const formSchema = z.object({
	username: z.string(),
	password: z.string(),
});

type Props = {
	label: string;
	onSubmit: (data: z.infer<typeof formSchema>) => void;
};

function FormAuth({ label, onSubmit }: Props) {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: "",
			password: "",
		},
	});

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-8">
				<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Username</FormLabel>
							<FormControl>
								<Input
									placeholder="jackass"
									{...field}
								/>
							</FormControl>
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input
									placeholder="******"
									{...field}
									type="password"
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<div className="flex justify-end">
					<Button
						type="submit"
						className="bg-rose-500">
						{label}
					</Button>
				</div>
			</form>
		</Form>
	);
}

export default FormAuth;
