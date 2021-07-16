import './navbar-styles.css';

const Navbar = () => {
	const clickHandler = () => {};

	return (
		<div className="Navbar">
			<div className="navbar-wrapper">
				<h2 className="navbar-heading">Where in the world?</h2>
				<div className="dark-mode">
					<span>
						<i class="fas fa-moon fa-md"></i>
					</span>
					<p onClick={clickHandler}>Dark mode</p>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
