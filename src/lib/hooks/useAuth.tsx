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
};

type AuthProviderProps = {
	children: ReactNode;
};

type AuthContextType = {
	user: User | null;
	onLogin: (username: string, userId: string) => void;
	onLogout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		const storedUser = Cookies.get("user");
		if (storedUser) {
			const parsedUser: User = JSON.parse(storedUser);
			setUser(parsedUser);
		}
	}, []);

	const onLogin = (username: string, userId: string) => {
		const newUser: User = { username, userId };
		setUser(newUser);
		Cookies.set("user", JSON.stringify(newUser), { expires: 7 });
	};

	const onLogout = () => {
		setUser(null);
		Cookies.remove("user");
	};

	const value: AuthContextType = { user, onLogin, onLogout };
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default function useAuth(): AuthContextType {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
}
