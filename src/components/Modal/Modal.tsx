import { ReactNode } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

interface ModalProps {
	children: ReactNode | JSX.Element;
	onModalClose: () => void;
	showModal: boolean;
}

const Modal: React.FC<ModalProps> = ({ children, onModalClose, showModal }) => {
	return createPortal(
		<Wrapper
			style={{
				opacity: showModal ? 1 : 0,
				pointerEvents: showModal ? "all" : "none",
			}}
		>
			<div
				onClick={onModalClose}
				role="button"
				className="iu-modal-backdrop"
				style={{
					display: showModal ? "flex" : "none",
				}}
			/>
			<div className="iu-modal-content flex flex-col item-center rounded-md">
				<div role="button" onClick={onModalClose} className="iu-modal-close-btn font-bold right-3 top-3 bg-black text-white px-2 pb-0.5 rounded-full">x</div>
				{children}
			</div>
		</Wrapper>,
		document.getElementById("modal") as Element
	);
};

const Wrapper = styled.div`
	position: relative;
	width: 100vw;
	height: 100%;

	.iu-modal-backdrop {
		background: rgba(0, 0, 0, 0.7);
		z-index: 13000;
		backdrop-filter: blur(0px);
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.iu-modal-close-btn {
		z-index: 130001;
		position: absolute;
	}

	.iu-modal-content {
		position: fixed;
		z-index: 15000;
		left: 50%;
		top: 50%;
		padding: 2rem 0;
		height: max-content;
		width: 500px;
		overflow: hidden !important;
		background: #fff;
		transform: translate(-50%, -50%);

		&::-webkit-scrollbar {
			width: 0.2rem;
			height: 0rem;
			border-radius: 10px;
		}
	}

	.iu-preview:hover {
		color: #2eff7b;
	}
`;

export default Modal;
