import { useState } from "react";
import { useMoralis } from "react-moralis";

interface FormProps {
	onModalClose: () => void;
}

const Form: React.FC<FormProps> = ({ onModalClose }) => {
	const { isAuthenticating, signup, login, authError, hasAuthError } =
		useMoralis();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [type, setType] = useState<"login" | "signup">("signup");

	const submitHandler = (e: any) => {
		e.preventDefault();

		try {
			if (password.length < 8) {
				return setError("Password must contain 8 characters or more!");
			}

			if (type === "signup") {
				signup(username, password, email);
				return !hasAuthError && onModalClose();
			}

			login(username, password);
			return !hasAuthError && onModalClose();
		} catch (error) {
			console.log(error);
		}
	};

	const disableBtn = () => {
		if (type === "signup") {
			return !email || !username || !password ? true : false;
		}

		return !username || !password ? true : false;
	};

	return (
		<form className="w-80 mx-auto" onSubmit={submitHandler}>
			<h3 className="mb-8 text-center text-xl uppercase tracking-wider">
				{type === "signup" ? "Create an Account" : "Welcome back!"}
			</h3>
			<div className="mb-5">
				<label htmlFor="username" className="block text-base mb-0.5">
					Username
				</label>
				<input
					id="username"
					type="text"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					placeholder="Enter a username"
					className="block border h-10 w-full rounded-md px-3 text-sm outline-slate-300"
				/>
			</div>
			{type === "signup" && (
				<div className="mb-5">
					<label htmlFor="email" className="block text-base mb-0.5">
						Email Address
					</label>
					<input
						id="email"
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Email Address"
						className="block border h-10 w-full rounded-md px-3 text-sm outline-slate-300"
					/>
				</div>
			)}
			<div>
				<label htmlFor="password" className="block text-base mb-0.5">
					Password
				</label>
				<input
					id="password"
					type="password"
					value={password}
					onChange={(e) => {
						error && setError("");
						setPassword(e.target.value);
					}}
					placeholder="********"
					className="block border h-10 w-full rounded-md px-3 text-sm outline-slate-300"
				/>
				{(error || hasAuthError) && (
					<small className="text-red-500">{error || authError?.message}</small>
				)}
			</div>
			<button
				type="submit"
				disabled={disableBtn() || isAuthenticating}
				className="outline-none bg-black text-white w-full h-12 rounded-md mt-10 font-sans hover:opacity-80 duration-700 disabled:opacity-70"
			>
				Submit
			</button>
			{type === "signup" ? (
				<p className="text-sm mt-4 text-center">
					Already have an account?{" "}
					<small
						role="button"
						onClick={() => {
							setEmail("");
							setPassword("");
							setUsername("");
							setType("login");
						}}
						className="text-sm font-bold underline"
					>
						Login
					</small>
				</p>
			) : (
				<p className="text-sm mt-4 text-center">
					Do not have an account?{" "}
					<small
						role="button"
						onClick={() => {
							setEmail("");
							setPassword("");
							setUsername("");
							setType("signup");
						}}
						className="text-sm font-bold underline"
					>
						Signup
					</small>
				</p>
			)}
		</form>
	);
};

export default Form;
