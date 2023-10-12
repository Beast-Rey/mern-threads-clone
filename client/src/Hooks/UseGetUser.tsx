import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UseShowToast from "./UseShowToast";


const useGetUser = () => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const { username } = useParams();
	const showToast = UseShowToast();

	useEffect(() => {
		const getUser = async () => {
			try {
				const res = await fetch(`/api/user/profile/${username}`);
				const data = await res.json();
				if (data.error) {
					showToast("Error", data.error, "error");
					return;
				}
				if (data.isFrozen) {
					setUser(null);
					return;
				}
				setUser(data.data);
			} catch (error:any) {
				showToast("Error", error.message, "error");
			} finally {
				setLoading(false);
			}
		};
		getUser();
	}, [username, showToast]);

	return { loading, user };
};

export default useGetUser;