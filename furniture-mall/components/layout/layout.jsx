
const Layout = ({children }) => {
	
	return (
		<div className={`layout-elements flex flex-col min-h-screen`}>
			<h1>good</h1>
			<main
				className="relative flex-grow"
				style={{
					minHeight: "-webkit-fill-available",
					WebkitOverflowScrolling: "touch",
				}}
			>
				{children}
				
			</main>
		</div>
	);
};

export default Layout;
