import { Loader2 } from "lucide-react";
import React from "react";

const Loader = () => {
	return (
		<div className="h-screen flex items-center justify-center bg-white">
			<Loader2
				className="animate-spin"
				size={48}
			/>
		</div>
	);
};

export default Loader;
