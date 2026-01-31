import { FaceDetectionRecognitionDom } from "../components/face_detection_recognition.js";
import { HomeDom } from "../components/home.js";
import { FaceDetectionRecognitionStatus } from "../utils/variables.js";
import {
	sendDataToFaceRecognition,
	sendFaceDetection,
} from "../services/api.js";

export default function faceDetectionRecognitionEvents() {
	FaceDetectionRecognitionDom.ts5OpenDexWindowBtn.addEventListener(
		"click",
		(_) => {
			HomeDom.mainConatiner.classList.add("inactive");
			FaceDetectionRecognitionDom.ts5DexWindow.classList.add("active");
		},
	);

	FaceDetectionRecognitionDom.tdUldImgBtn.addEventListener("click", (_) =>
		FaceDetectionRecognitionDom.tdInpImgFile.click(),
	);

	FaceDetectionRecognitionDom.ts5DexWindowClsBtn.addEventListener(
		"click",
		(_) => {
			HomeDom.mainConatiner.classList.remove("inactive");
			FaceDetectionRecognitionDom.ts5DexWindow.classList.remove("active");
		},
	);

	FaceDetectionRecognitionDom.ts5OpenOperWindowBtn.addEventListener(
		"click",
		(_) => {
			FaceDetectionRecognitionDom.ts5DexWindow.classList.remove("active");
			FaceDetectionRecognitionDom.faceRecBtns.classList.add("active");
			FaceDetectionRecognitionDom.faceRecBtns
				.querySelectorAll("p")
				.forEach((ele) => {
					if (ele.classList.contains("active")) {
						if (ele.getAttribute("value") == "tf-face-recognition")
							FaceDetectionRecognitionDom.ts5OperWindow.classList.add("active");
						else
							FaceDetectionRecognitionDom.faceDecWind.classList.add("active");
					}
				});
		},
	);

	FaceDetectionRecognitionDom.faceRecBtns
		.querySelectorAll("p")
		.forEach((ele) => {
			ele.addEventListener("click", (_) => {
				FaceDetectionRecognitionDom.faceRecBtns
					.querySelector("p.active")
					.classList.remove("active");
				ele.classList.add("active");
				if (ele.classList.contains("active")) {
					if (ele.getAttribute("value") == "tf-face-recognition") {
						FaceDetectionRecognitionDom.ts5OperWindow.classList.add("active");
						FaceDetectionRecognitionDom.faceDecWind.classList.contains("active")
							? FaceDetectionRecognitionDom.faceDecWind.classList.remove(
									"active",
								)
							: "";
					} else {
						FaceDetectionRecognitionDom.faceDecWind.classList.add("active");
						FaceDetectionRecognitionDom.ts5OperWindow.classList.contains(
							"active",
						)
							? FaceDetectionRecognitionDom.ts5OperWindow.classList.remove(
									"active",
								)
							: "";
					}
				}
			});
		});

	FaceDetectionRecognitionDom.ts5ClsOperWindowBtn.addEventListener(
		"click",
		(_) => {
			HomeDom.mainConatiner.classList.remove("inactive");
			FaceDetectionRecognitionDom.ts5OperWindow.classList.remove("active");
			FaceDetectionRecognitionDom.faceRecBtns.classList.remove("active");
		},
	);

	FaceDetectionRecognitionDom.tfClsSubWindow.addEventListener("click", (_) => {
		FaceDetectionRecognitionDom.tfPrecSubmitWindow.classList.remove("active");
		FaceDetectionRecognitionDom.tfShowSubWindow.classList.add("active");
	});

	FaceDetectionRecognitionDom.ts5UpldBtn.addEventListener("click", (_) =>
		FaceDetectionRecognitionDom.t5WrkSpaceImgInp.click(),
	);

	FaceDetectionRecognitionDom.t5WrkSpaceImgInp.addEventListener(
		"input",
		(_) => {
			FaceDetectionRecognitionDom.ts5OperWindow.classList.contains("in-op")
				? ""
				: FaceDetectionRecognitionDom.ts5OperWindow.classList.add("in-op");
			FaceDetectionRecognitionDom.t5ResWrkSpace.classList.contains("in-op")
				? ""
				: FaceDetectionRecognitionDom.t5ResWrkSpace.classList.add("in-op");
			let file = FaceDetectionRecognitionDom.t5WrkSpaceImgInp.files[0];
			if (file) {
				let reader = new FileReader();
				console.log(file.name);
				reader.onload = (_) => {
					let result = reader.result;
					FaceDetectionRecognitionDom.t5WrkSpaceImg.classList.add("active");
					FaceDetectionRecognitionDom.t5WrkSpaceImg.src = result;
					FaceDetectionRecognitionStatus.t5Data.img = result;
					FaceDetectionRecognitionStatus.t5Data.name = file.name;
					FaceDetectionRecognitionDom.t5ImgRemoveBtn.classList.add("active");
					FaceDetectionRecognitionDom.prcSubmitWindow.classList.add("active");
					FaceDetectionRecognitionDom.t5ShowSubWindowBtn.classList.add(
						"active",
					);
				};
				FaceDetectionRecognitionDom.t5ImgRemoveBtn.addEventListener(
					"click",
					(_) => {
						FaceDetectionRecognitionDom.t5WrkSpaceImg.classList.remove(
							"active",
						);
						FaceDetectionRecognitionDom.t5ImgRemoveBtn.classList.remove(
							"active",
						);
						FaceDetectionRecognitionStatus.t5Data.img = "";
						FaceDetectionRecognitionDom.t5WrkSpaceImg.src = "";
						FaceDetectionRecognitionDom.t5WrkSpaceImgInp.value = "";
						FaceDetectionRecognitionDom.ts5OperWindow.classList.contains(
							"in-op",
						)
							? ""
							: FaceDetectionRecognitionDom.ts5OperWindow.classList.add(
									"in-op",
								);
						FaceDetectionRecognitionDom.t5ResWrkSpace.classList.contains(
							"in-op",
						)
							? ""
							: FaceDetectionRecognitionDom.t5ResWrkSpace.classList.add(
									"in-op",
								);
						FaceDetectionRecognitionDom.t5ShowSubWindowBtn.classList.remove(
							"active",
						);
					},
				);
				reader.readAsDataURL(file);
			}
		},
	);

	FaceDetectionRecognitionDom.tdInpImgFile.addEventListener("input", (_) => {
		FaceDetectionRecognitionDom.faceDecWind.classList.contains("in-op")
			? ""
			: FaceDetectionRecognitionDom.faceDecWind.classList.add("in-op");
		FaceDetectionRecognitionDom.tdResWrkSpace.classList.contains("in-op")
			? ""
			: FaceDetectionRecognitionDom.tdResWrkSpace.classList.add("in-op");
		let file = FaceDetectionRecognitionDom.tdInpImgFile.files[0];
		if (file) {
			let reader = new FileReader();
			console.log(file.name);
			reader.onload = (_) => {
				let result = reader.result;
				FaceDetectionRecognitionDom.tdUpldImg.classList.add("active");
				FaceDetectionRecognitionDom.tdUpldImg.src = result;
				FaceDetectionRecognitionStatus.tfData.img = result;
				FaceDetectionRecognitionStatus.tfData.name = file.name;
				FaceDetectionRecognitionDom.tdRmvImgBtn.classList.add("active");
				FaceDetectionRecognitionDom.tfPrecSubmitWindow.classList.add("active");
				FaceDetectionRecognitionDom.tfShowSubWindow.classList.add("active");
			};
			FaceDetectionRecognitionDom.tdRmvImgBtn.addEventListener("click", (_) => {
				FaceDetectionRecognitionDom.tdUpldImg.classList.remove("active");
				FaceDetectionRecognitionDom.tdRmvImgBtn.classList.remove("active");
				FaceDetectionRecognitionStatus.tfData.img = "";
				FaceDetectionRecognitionDom.tdUpldImg.src = "";
				FaceDetectionRecognitionDom.tdInpImgFile.value = "";
				FaceDetectionRecognitionDom.faceDecWind.classList.contains("in-op")
					? ""
					: FaceDetectionRecognitionDom.faceDecWind.classList.add("in-op");
				FaceDetectionRecognitionDom.tdResWrkSpace.classList.contains("in-op")
					? ""
					: FaceDetectionRecognitionDom.tdResWrkSpace.classList.add("in-op");
				FaceDetectionRecognitionDom.tfPrecSubmitWindow.classList.remove(
					"active",
				);
				FaceDetectionRecognitionDom.tfShowSubWindow.classList.remove("active");
			});
			reader.readAsDataURL(file);
		}
	});

	FaceDetectionRecognitionDom.tfShowSubWindow.addEventListener("click", (_) => {
		FaceDetectionRecognitionDom.tfPrecSubmitWindow.classList.add("active");
	});

	FaceDetectionRecognitionDom.prcSubmitWindow
		.querySelector(".prc-ts5-cls")
		.addEventListener("click", (_) => {
			FaceDetectionRecognitionDom.prcSubmitWindow.classList.remove("active");
			FaceDetectionRecognitionDom.t5ShowSubWindowBtn.classList.add("active");
		});

	FaceDetectionRecognitionDom.prcSubmitWindow
		.querySelector(".ts5-str")
		.addEventListener("click", (_) => {
			FaceDetectionRecognitionDom.prcSubmitWindow.classList.remove("active");
			FaceDetectionRecognitionDom.t5ShowSubWindowBtn.classList.remove("active");

			sendDataToFaceRecognition(FaceDetectionRecognitionStatus.t5Data);
		});

	FaceDetectionRecognitionDom.t5ShowSubWindowBtn.addEventListener(
		"click",
		(_) => {
			FaceDetectionRecognitionDom.t5ShowSubWindowBtn.classList.remove("active");
			FaceDetectionRecognitionDom.prcSubmitWindow.classList.add("active");
		},
	);

	FaceDetectionRecognitionDom.unknownFaceErrorWindow
		.querySelector(".unf-cls")
		.addEventListener("click", (_) => {
			FaceDetectionRecognitionDom.unknownFaceErrorWindow.classList.remove(
				"active",
			);
			FaceDetectionRecognitionDom.t5ShowSubWindowBtn.classList.add("active");
		});

	FaceDetectionRecognitionDom.tdClsOpBtn.addEventListener("click", (_) => {
		HomeDom.mainConatiner.classList.remove("inactive");
		FaceDetectionRecognitionDom.faceDecWind.classList.remove("active");
		FaceDetectionRecognitionDom.faceRecBtns.classList.remove("active");
	});
	FaceDetectionRecognitionDom.tdSubmitBtn.addEventListener("click", (_) => {
		console.log(FaceDetectionRecognitionStatus.tfData);
		sendFaceDetection(FaceDetectionRecognitionStatus.tfData);
	});
}
