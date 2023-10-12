import { useState } from "react";

import { useRecoilValue } from "recoil";
import UserAtom from "../Atom/UserAtom";
import UseShowToast from "./UseShowToast";

const UseFollowUnFollow = (user:any) => {
	const currentUser = useRecoilValue(UserAtom);
	const [following, setFollowing] = useState(user.followers?.includes(currentUser?._id));
	const [updating, setUpdating] = useState(false);
	const showToast = UseShowToast();

	const handleFollowUnfollow = async () => {
		if (!currentUser) {
			showToast("Error", "Please login to follow", "error");
			return;
		}
		if (updating) return;

		setUpdating(true);
		try {
			const res = await fetch(`/api/user/follow/${user._id}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
			});
			const data = await res.json();
			if (data.error) {
				showToast("Error", data.error, "error");
				return;
			}

			if (following) {
				showToast("Success", `Unfollowed ${user.name}`, "success");
				user.followers.pop();
			} else {
				showToast("Success", `Followed ${user.name}`, "success");
				user.followers.push(currentUser?._id); 
			}
			setFollowing(!following);
		} catch (error:any) {
			showToast("Error", error.message, "error");
		} finally {
			setUpdating(false);
		}
	};

	return { handleFollowUnfollow, updating, following };
};

export default UseFollowUnFollow;