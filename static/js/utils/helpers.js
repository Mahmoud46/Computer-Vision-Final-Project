import {
	HybridWindowStatus,
	ImgsStatus,
	ImagesMatchingStatus,
} from "../utils/variables.js";
import {
	applyFilter,
	receiveHistogram,
	receiveEqHistogram,
	receiveDistData,
	receiveCmlCurve,
} from "../services/api.js";
import { OptionsListDom } from "../components/lists.js";
import {
	HomeDom,
	ShapeDetectionDom,
	HybridWindowDom,
} from "../components/home.js";
import { ImagesMatchingDom } from "../components/images_matching.js";

export function activeCombineClearBtns() {
	HybridWindowStatus.img1Stat && HybridWindowStatus.img2Stat
		? HybridWindowDom.hybridControlBtns[1].classList.remove("inactive")
		: HybridWindowDom.hybridControlBtns[1].classList.contains("inactive")
			? ""
			: HybridWindowDom.hybridControlBtns[1].classList.add("inactive");
	HybridWindowStatus.img1Stat || HybridWindowStatus.img2Stat
		? HybridWindowDom.hybridControlBtns[0].classList.remove("inactive")
		: HybridWindowDom.hybridControlBtns[0].classList.contains("inactive")
			? ""
			: HybridWindowDom.hybridControlBtns[0].classList.add("inactive");
}

export function addToOptions(value) {
	OptionsListDom.optionsList.forEach((option) => {
		if (option.value == value) {
			let optionsContainer = document.querySelector(".main-options .options");
			optionsContainer.innerHTML = "";
			option.options.forEach((op) => {
				optionsContainer.innerHTML += op;
			});
			let panelMainOptions = document.querySelectorAll(
				".panel .main-options .options p",
			);
			panelMainOptions.forEach((ele) => {
				ele.addEventListener("click", (_) => {
					document
						.querySelector(".panel .main-options p.active")
						?.classList.remove("active");
					ele.classList.add("active");
					console.log(ele.getAttribute("value"));
					if (
						ele.getAttribute("value") == "gaussian_noise" ||
						ele.getAttribute("value") == "average_filter" ||
						ele.getAttribute("value") == "median_filter" ||
						ele.getAttribute("value") == "gaussian_filter" ||
						ele.getAttribute("value") == "uniform_noise" ||
						ele.getAttribute("value") == "salt_Papper_noise" ||
						ele.getAttribute("value") == "sobel_filter" ||
						ele.getAttribute("value") == "roberts_filter" ||
						ele.getAttribute("value") == "prewitt_filter" ||
						ele.getAttribute("value") == "canny_filter" ||
						ele.getAttribute("value") == "low_pass_filter" ||
						ele.getAttribute("value") == "high_pass_filter" ||
						ele.getAttribute("value") == "local_thresholding" ||
						ele.getAttribute("value") == "gloabal_thresholding" ||
						ele.getAttribute("value") == "harris_corner"
					) {
						let filter = {};
						filter.value = ele.getAttribute("value");
						filter.img = HomeDom.wrkSpcImg.src;
						applyFilter(filter);
					} else if (ele.getAttribute("value") == "show_histogram") {
						let histogramData = {};
						histogramData.img = HomeDom.wrkSpcImg.src;
						receiveHistogram(histogramData);
					} else if (ele.getAttribute("value") == "show_distribution_curve") {
						let distData = {};
						distData.img = HomeDom.wrkSpcImg.src;
						receiveDistData(distData);
					} else if (ele.getAttribute("value") == "show_equalizes_histogram") {
						let eqData = {};
						eqData.img = HomeDom.wrkSpcImg.src;
						eqData.value = "grayscale";
						receiveEqHistogram(eqData);
						HomeDom.eqCmlWindow
							.querySelector(".cls")
							.addEventListener("click", (_) => {
								HomeDom.eqCmlWindow.classList.add("inactive");
								HomeDom.proccessWindow.classList.add("active");
							});
					} else if (ele.getAttribute("value") == "show_cumulative_curve") {
						let cmlData = {};
						cmlData.img = HomeDom.wrkSpcImg.src;
						receiveCmlCurve(cmlData);
						HomeDom.eqCmlWindow
							.querySelector(".cls")
							.addEventListener("click", (_) => {
								HomeDom.eqCmlWindow.classList.add("inactive");
								HomeDom.proccessWindow.classList.add("active");
							});
					}
				});
			});
		}
	});
}

export function clearActive() {
	document
		.querySelector(".panel .main-options .options p.active")
		?.classList.remove("active");
	document.querySelector(".panel .main p.active")?.classList.remove("active");
	document.querySelector(".main-options .options").innerHTML = "";
}

export function downloadElement(fileUrl, fileName) {
	const downloadLink = document.createElement("a");
	downloadLink.href = fileUrl;
	downloadLink.download = fileName;
	downloadLink.click();
}

export function addToImgsListContainer(src) {
	HomeDom.imgsListContainer.innerHTML += `<p><img src="${src}" alt=""></p>`;
	let imgsTags = HomeDom.imgsListContainer.querySelectorAll("p img");
	imgsTags.forEach((ele) => {
		HomeDom.imgsListContainer
			.querySelector("p.active")
			?.classList.remove("active");
		ele.src == HomeDom.wrkSpcImg.src
			? ele.parentNode.classList.add("active")
			: "";
		ele.addEventListener("click", (_) => {
			HomeDom.wrkSpcImg.src = ele.src;
			HomeDom.imgsListContainer
				.querySelector("p.active")
				?.classList.remove("active");
			ele.parentElement.classList.add("active");
			resetPanel();
		});
	});
}

export function clearImgsListContainer() {
	HomeDom.imgsListContainer.innerHTML = "";
	if (HomeDom.imgsListContainer.classList.contains("active"))
		HomeDom.imgsListContainer.classList.remove("active");

	if (HomeDom.proccessWindow.classList.contains("list-img"))
		HomeDom.proccessWindow.classList.remove("list-img");

	if (HomeDom.imgsListBtn.classList.contains("active"))
		HomeDom.imgsListBtn.classList.remove("active");
}

export function resetPanel() {
	document.querySelector(".panel .main p.active")?.classList.remove("active");
	document.querySelector(".panel .main-options .options").innerHTML = "";
}

export function addToSettings(value) {
	let cont = document.querySelector(".list-set");
	cont.innerHTML = "";
	OptionsListDom.hfOpt.forEach((e) => {
		if (value == e.value) {
			e.options.forEach((op) => {
				cont.innerHTML += op;
				activeRangeInput();
			});
		}
	});
}

export function addToHfAcImgsList(value) {
	let imgsList = document.querySelector(".imgs-container-test");
	imgsList.innerHTML = "";
	OptionsListDom.hfAcImgs.forEach((ele) => {
		if (ele.value == value) {
			ele.imgs.forEach((img) => {
				imgsList.innerHTML += img;
			});
			((ShapeDetectionDom.imgsHaughList = document.querySelectorAll(
				".imgs-container-test p",
			)),
				ShapeDetectionDom.imgsHaughList.forEach((pic) => {
					pic.addEventListener("click", (_) => {
						pic.parentElement
							.querySelector("p.active")
							?.classList.remove("active");
						pic.classList.add("active");
						ShapeDetectionDom.startProBtn.classList.add("active");
						ImgsStatus.imgObj.img = pic.querySelector("img").src;
					});
				}));
		}
	});
}

export function activeRangeInput() {
	let rangeInputs = document.querySelectorAll('input[type="range"]');
	rangeInputs.forEach((input) => {
		input.addEventListener("input", (e) => {
			let target = e.target;
			if (e.target.type !== "range") target = document.getElementById("range");
			let min = target.min,
				max = target.max,
				val = target.value;
			target.style.backgroundSize =
				((val - min) * 100) / (max - min) + "% 100%";
			e.target.parentElement.querySelector("span").innerText = `${val}`;
		});
	});

	rangeInputs.forEach((input) => {
		let min = input.min,
			max = input.max,
			val = input.value;
		input.style.backgroundSize = ((val - min) * 100) / (max - min) + "% 100%";
		input.parentElement.querySelector("span").innerText = `${val}`;
	});
}

export function activateSubmitWindowAndSubBtn() {
	if (ImagesMatchingStatus.subIm1 && ImagesMatchingStatus.subIm2) {
		ImagesMatchingDom.subWindowOpenBtn.classList.add("active");
		ImagesMatchingDom.subWindow.classList.add("active");
	} else {
		ImagesMatchingDom.subWindowOpenBtn.classList.remove("active");
		ImagesMatchingDom.subWindow.classList.remove("active");
	}
}

export function collectSsdData() {
	ImagesMatchingDom.matchingMethods.forEach((ele) => {
		ele.classList.contains("active")
			? (ImagesMatchingStatus.ssdData.method = ele.getAttribute("value"))
			: null;
		ImagesMatchingStatus.ssdData.threshold = ImagesMatchingDom.thInput.value;
	});
}

export function ts4DownloadElement(fileUrl, fileName) {
	const downloadLink = document.createElement("a");
	downloadLink.href = fileUrl;
	downloadLink.download = fileName;
	downloadLink.click();
}
