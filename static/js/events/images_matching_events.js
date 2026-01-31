import { HomeDom } from "../components/home.js";
import { ImagesMatchingDom } from "../components/images_matching.js";
import { ImagesMatchingStatus } from "../utils/variables.js";
import { sendData } from "../services/api.js";
import { activateSubmitWindowAndSubBtn } from "../utils/helpers.js";

export default function imagesMatchingEvents() {
	ImagesMatchingDom.matchingOpenBtn.addEventListener("click", (_) => {
		ImagesMatchingDom.ssdDexWindow.classList.add("active");
		HomeDom.mainConatiner.classList.add("inactive");
	});

	ImagesMatchingDom.ssdClsBtn.addEventListener("click", (_) => {
		ImagesMatchingDom.ssdDexWindow.classList.remove("active");
		HomeDom.mainConatiner.classList.remove("inactive");
	});

	ImagesMatchingDom.ssdTryNowBtn.addEventListener("click", (_) => {
		ImagesMatchingDom.operatingWindow.classList.add("active");
		ImagesMatchingDom.ssdDexWindow.classList.remove("active");
	});

	ImagesMatchingDom.opertingWindowClsBtn.addEventListener("click", (_) => {
		ImagesMatchingDom.operatingWindow.classList.contains("active")
			? ImagesMatchingDom.operatingWindow.classList.remove("active")
			: "";
		HomeDom.mainConatiner.classList.contains("inactive")
			? HomeDom.mainConatiner.classList.remove("inactive")
			: "";
		ImagesMatchingDom.subWindow.classList.contains("active")
			? ImagesMatchingDom.subWindow.classList.remove("active")
			: "";
		ImagesMatchingDom.ssdImg1.src = "";
		ImagesMatchingDom.ssdImg2.src = "";
		ImagesMatchingDom.ssdimgOneInput.value = "";
		ImagesMatchingDom.ssdimgTwoInput.value = "";
		ImagesMatchingDom.ssdImg1.classList.contains("active")
			? ImagesMatchingDom.ssdImg1.classList.remove("active")
			: "";
		ImagesMatchingDom.ssdImg2.classList.contains("active")
			? ImagesMatchingDom.ssdImg2.classList.remove("active")
			: "";
		ImagesMatchingStatus.subIm1 = false;
		ImagesMatchingStatus.subIm2 = false;
		activateSubmitWindowAndSubBtn();
		ImagesMatchingDom.ssdRmvImg1Btn.classList.contains("active")
			? ImagesMatchingDom.ssdRmvImg1Btn.classList.remove("active")
			: "";
		ImagesMatchingDom.ssdRmvImg2Btn.classList.contains("active")
			? ImagesMatchingDom.ssdRmvImg2Btn.classList.remove("active")
			: "";
		ImagesMatchingDom.thInput.value = "";
	});

	ImagesMatchingDom.subWindowOpenBtn.addEventListener("click", (_) =>
		ImagesMatchingDom.subWindow.classList.add("active")
	);

	ImagesMatchingDom.subWindowClsBtn.addEventListener("click", (_) =>
		ImagesMatchingDom.subWindow.classList.remove("active")
	);

	ImagesMatchingDom.thInput.addEventListener("input", (_) => {
		ImagesMatchingDom.thInput.value === ""
			? ImagesMatchingDom.processBtn.classList.contains("active")
				? ImagesMatchingDom.processBtn.classList.remove("active")
				: ""
			: ImagesMatchingDom.processBtn.classList.contains("active")
			? ""
			: ImagesMatchingDom.processBtn.classList.add("active");
	});

	ImagesMatchingDom.ssdAddImg1Btn.addEventListener("click", (_) =>
		ImagesMatchingDom.ssdimgOneInput.click()
	);
	ImagesMatchingDom.ssdAddImg2Btn.addEventListener("click", (_) =>
		ImagesMatchingDom.ssdimgTwoInput.click()
	);

	ImagesMatchingDom.matchingMethods.forEach((ele) => {
		ele.addEventListener("click", (_) => {
			ImagesMatchingDom.matchingMethods.forEach(
				(ele) =>
					ele.classList.contains("active") && ele.classList.remove("active")
			);
			ele.classList.add("active");
		});
	});

	ImagesMatchingDom.clsRsltWindowBtn.addEventListener("click", (_) => {
		ImagesMatchingDom.opertingWindowClsBtn.click();
		ImagesMatchingDom.ssdRsltWindow.classList.remove("active");
	});

	ImagesMatchingDom.ssdBackToOpWindowBtn.addEventListener("click", (_) => {
		ImagesMatchingDom.ssdRsltWindow.classList.remove("active");
		ImagesMatchingDom.operatingWindow.classList.add("active");
	});

	// Review Uploaded Images
	ImagesMatchingDom.ssdimgOneInput.addEventListener("input", (_) => {
		let file = ImagesMatchingDom.ssdimgOneInput.files[0];
		if (file) {
			let reader = new FileReader();
			reader.onload = (_) => {
				let result = reader.result;
				console.log(result);
				ImagesMatchingDom.ssdImg1.classList.add("active");
				ImagesMatchingDom.ssdImg1.src = result;
				ImagesMatchingStatus.subIm1 = true;
				ImagesMatchingStatus.ssdData.img1 = result;
				activateSubmitWindowAndSubBtn();
				ImagesMatchingDom.ssdRmvImg1Btn.classList.add("active");
			};
			ImagesMatchingDom.ssdRmvImg1Btn.addEventListener("click", (_) => {
				ImagesMatchingDom.ssdImg1.classList.remove("active");
				ImagesMatchingDom.ssdImg1.src = "";
				ImagesMatchingDom.ssdimgOneInput.value = "";
				ImagesMatchingStatus.subIm1 = false;
				activateSubmitWindowAndSubBtn();
				ImagesMatchingDom.ssdRmvImg1Btn.classList.remove("active");
			});
			reader.readAsDataURL(file);
		}
	});

	ImagesMatchingDom.ssdimgTwoInput.addEventListener("input", (_) => {
		let file = ImagesMatchingDom.ssdimgTwoInput.files[0];
		if (file) {
			let reader = new FileReader();
			reader.onload = (_) => {
				let result = reader.result;
				console.log(result);
				ImagesMatchingDom.ssdImg2.classList.add("active");
				ImagesMatchingDom.ssdImg2.src = result;
				ImagesMatchingStatus.subIm2 = true;
				ImagesMatchingStatus.ssdData.img2 = result;
				activateSubmitWindowAndSubBtn();
				ImagesMatchingDom.ssdRmvImg2Btn.classList.add("active");
			};
			ImagesMatchingDom.ssdRmvImg2Btn.addEventListener("click", (_) => {
				ImagesMatchingDom.ssdImg2.classList.remove("active");
				ImagesMatchingDom.ssdImg2.src = "";
				ImagesMatchingDom.ssdimgTwoInput.value = "";
				ImagesMatchingStatus.subIm2 = false;
				activateSubmitWindowAndSubBtn();
				ImagesMatchingDom.ssdRmvImg2Btn.classList.remove("active");
			});
			reader.readAsDataURL(file);
		}
	});

	// send data
	ImagesMatchingDom.processBtn.addEventListener("click", sendData);
}
