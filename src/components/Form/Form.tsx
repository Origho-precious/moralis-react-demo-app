import { useState } from "react";
import { useMoralis } from "react-moralis";

interface FormProps {
	type: "login" | "signup";
}

const Form: React.FC<FormProps> = ({ type }) => {
	const { isAuthenticating, signup, login } = useMoralis();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(false);

	const submitHandler = async (e: any) => {
		e.preventDefault();

		if (password.length < 8) {
			return setError(true);
		}

		if (type === "signup") {
			return await signup(username, password, email);
		}

		return await login(username, password);
	};

	const disableBtn = () => {
		if (type === "signup") {
			return !email || !username || !password ? true : false;
		}

		return !username || !password ? true : false;
	};

	return (
		<form className="w-80 mx-auto" onSubmit={submitHandler}>
			<h3 className="mb-8 text-center">
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
						error && setError(false);
						setPassword(e.target.value);
					}}
					placeholder="********"
					className="block border h-10 w-full rounded-md px-3 text-sm outline-slate-300"
				/>
				{error && (
					<small className="text-red-500">
						Password must contain 8 characters or more!
					</small>
				)}
			</div>
			<button
				type="submit"
				disabled={disableBtn() || isAuthenticating}
				className="outline-none bg-black text-white w-full h-12 rounded-md mt-10 font-sans hover:opacity-80 duration-700 disabled:opacity-70"
			>
				Submit
			</button>
		</form>
	);
};

export default Form;
