import React, {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import Cookies from "js-cookie";

type User = {
	userId: string | null;
	username: string | null;
	isAuthenticated: boolean;
};

type AuthProviderProps = {
	children: ReactNode;
};

type AuthContextType = {
	user: User;
	onLogin: (username: string, userId: string) => void;
	onLogout: () => void;
	isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const defaultUserValue = {
	username: null,
	userId: null,
	isAuthenticated: false,
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [user, setUser] = useState<User>(defaultUserValue);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		const updateUser = () => {
			const storedUser = Cookies.get("user");
			if (storedUser) {
				const parsedUser: User = JSON.parse(storedUser);
				setUser(parsedUser);
			}
			setIsLoading(false);
		};

		setTimeout(updateUser, 3000);
	}, []);

	const onLogin = (username: string, userId: string) => {
		const newUser: User = { username, userId, isAuthenticated: true };
		setUser(newUser);
		Cookies.set("user", JSON.stringify(newUser), { expires: 7 });
	};

	const onLogout = () => {
		setUser(defaultUserValue);
		Cookies.remove("user");
	};

	const value: AuthContextType = { user, onLogin, onLogout, isLoading };
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default function useAuth(): AuthContextType {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
}
