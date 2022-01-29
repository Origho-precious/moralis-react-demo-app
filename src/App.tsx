import styled from "styled-components";
import { useMoralis } from "react-moralis";
import { useState } from "react";
import Form from "./components/Form/Form";
import Modal from "./components/Modal/Modal";

const App = () => {
	const { authenticate, isAuthenticated, user, logout, isAuthenticating } =
		useMoralis();
	const [showModal, setShowModal] = useState(false);

	console.log(user);

	return (
		<StyledDiv className="font-sans">
			<section>
				{isAuthenticating ? (
					<p>Loading...</p>
				) : isAuthenticated ? (
					<button type="button" onClick={async () => await logout()}>
						Logout
					</button>
				) : (
					<>
						<button type="button" onClick={async () => await authenticate()}>
							Connect to wallet
						</button>
						<button type="button" onClick={() => setShowModal(true)}>
							Auth with Email
						</button>
					</>
				)}
			</section>

			<h2 className="text-xl tracking-wider mb-12">React-Moralis Demo App</h2>
			{isAuthenticated ? (
				<div>
					<h3 className="text-lg font-bold mb-2">User Details</h3>
					<ul>
						{user?.attributes?.authData?.moralisEth ? (
							<>
								<li>
									Wallet Address: {user?.attributes?.authData?.moralisEth?.id}
								</li>
								<li>Username: {user?.attributes?.username}</li>
							</>
						) : (
							<>
								<li>Email Address: {user?.attributes?.email}</li>
								<li>Username: {user?.attributes?.username}</li>
							</>
						)}
					</ul>
				</div>
			) : (
				<p className="text-center">Login to see your details</p>
			)}

			<Modal showModal={showModal} onModalClose={() => setShowModal(false)}>
				<Form onModalClose={() => setShowModal(false)} />
			</Modal>
		</StyledDiv>
	);
};

const StyledDiv = styled.div`
	width: 90%;
	margin: 2rem auto;

	& h2 {
		text-align: center;
	}

	& section {
		display: flex;
		width: max-content;
		margin-left: auto;

		& button {
			display: block;
			border: none;
			outline: none;
			background: #000;
			color: #fff;
			height: 40px;
			width: max-content;
			padding: 0 1rem;
			border-radius: 5px;
			margin: 0 0.8rem;
			cursor: pointer;
		}
	}
`;

export default App;
