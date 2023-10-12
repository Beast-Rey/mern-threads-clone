import { useState } from "react";
import useShowToast from "./UseShowToast";

const usePreviewImg = () => {
	const [imageUrl, setImageUrl] = useState<any>(null);
	const showToast = useShowToast();
	const handleImageChange = (e:any) => {
		const file = e.target.files[0];
		if (file && file.type.startsWith("image/")) {
			const reader = new FileReader();

			reader.onloadend = () => {
				setImageUrl(reader.result);
			};

			reader.readAsDataURL(file);
		} else {
			showToast("Invalid file type", " Please select an image file", "error");
			setImageUrl(null);
		}
	};
	return { handleImageChange, imageUrl, setImageUrl };
};

export default usePreviewImg;