import {
	HomeDom,
	ShapeDetectionDom,
	HybridWindowDom,
} from "../components/home.js";
import {
	HybridWindowStatus,
	ImgsStatus,
	ImagesMatchingStatus,
} from "../utils/variables.js";
import { addToImgsListContainer, collectSsdData } from "../utils/helpers.js";
import {
	addCmlCurve,
	addEqHistogram,
	addHistogram,
	addDistriubtionGraph,
} from "../utils/graphs.js";
import { ImagesMatchingDom } from "../components/images_matching.js";
import { ImageThresholdingDom } from "../components/image_thresholding.js";
import { FaceDetectionRecognitionDom } from "../components/face_detection_recognition.js";

// Ping function
export function sendPing() {
	fetch("/ping", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ sid: sessionStorage.getItem("sid") }), // send sid in body
	}).catch((err) => {
		console.log("Ping failed:", err);
	});
}

export function sendHybridImgs() {
	HomeDom.loader.classList.add("active");
	HomeDom.proccessWindow.classList.add("dec");
	HomeDom.proccessWindow.classList.remove("act");
	fetch(`${window.origin}/receive_hybrid`, {
		method: "POST",
		credentials: "include",
		body: JSON.stringify({
			...HybridWindowStatus.imgsObj,
			sid: sessionStorage.getItem("sid"),
		}),
		cache: "no-cache",
		headers: new Headers({
			"content-type": "application/json",
		}),
	}).then((response) => {
		if (response.status !== 200) {
			console.log(`Response status was not 200: ${response.status}`);
			return;
		}
		response.json().then((data) => {
			document.querySelector(".img.rslt-img img").src = "";
			console.log(data["Message"]);
			console.log(data["img"]);
			console.log(document.querySelector(".img.rslt-img img"));
			document.querySelector(".img.rslt-img img").src = data["img"];
			HomeDom.loader.classList.remove("active");
			HomeDom.proccessWindow.classList.remove("dec");
			HomeDom.proccessWindow.classList.add("act");
			HybridWindowDom.hybridControlBtns[1].classList.add("process");
			HybridWindowDom.rsllImgContainer.classList.remove("inactive");
			document.querySelector(".img.rslt-img img").classList.add("active");
		});
	});
}

export function sendImg() {
	HomeDom.loader.classList.add("active");
	HomeDom.proccessWindow.classList.add("dec");
	HomeDom.proccessWindow.classList.remove("act");
	fetch(`${window.origin}/receive_img`, {
		method: "POST",
		credentials: "include",
		body: JSON.stringify({
			...ImgsStatus.imgData,
			sid: sessionStorage.getItem("sid"),
		}),
		cache: "no-cache",
		headers: new Headers({
			"content-type": "application/json",
		}),
	}).then((response) => {
		if (response.status !== 200) {
			console.log(`Response status was not 200: ${response.status}`);
			return;
		}
		response.json().then((data) => {
			console.log(data["Message"]);
			HomeDom.loader.classList.remove("active");
			HomeDom.proccessWindow.classList.remove("dec");
			HomeDom.proccessWindow.classList.add("act");
			HomeDom.wrkSpcImg.src = data["img"];
			ImgsStatus.editImgOriginal = HomeDom.wrkSpcImg.src;
			addToImgsListContainer(data["img"]);
			HomeDom.viewBtns.forEach((ele) =>
				ele.classList.contains("active") ? ele.classList.remove("active") : "",
			);
			HomeDom.viewBtns[1].classList.add("active");
			HomeDom.proccessWindow.classList.add("process");
			HomeDom.editPanel.classList.remove("inactive");
			HomeDom.viewImage.classList.add("inactive");
		});
	});
}

export function applyFilter(filter) {
	HomeDom.loader.classList.add("active");
	HomeDom.proccessWindow.classList.add("dec");
	HomeDom.proccessWindow.classList.remove("act");
	fetch(`${window.origin}/apply_filter`, {
		method: "POST",
		credentials: "include",
		body: JSON.stringify({ ...filter, sid: sessionStorage.getItem("sid") }),
		cache: "no-cache",
		headers: new Headers({
			"content-type": "application/json",
		}),
	}).then((response) => {
		if (response.status !== 200) {
			console.log(`Response status was not 200: ${response.status}`);
			return;
		}
		response.json().then((data) => {
			console.log(data["Message"]);
			HomeDom.wrkSpcImg.src = data["img"];
			addToImgsListContainer(data["img"]);
			HomeDom.loader.classList.remove("active");
			HomeDom.proccessWindow.classList.remove("dec");
			HomeDom.proccessWindow.classList.add("act");
		});
	});
}

export function receiveRGBGrayDataDistGraph(data) {
	HomeDom.loader.classList.add("active");
	HomeDom.proccessWindow.classList.add("dec");
	HomeDom.proccessWindow.classList.remove("act");
	fetch(`${window.origin}/receive_rgb`, {
		method: "POST",
		credentials: "include",
		body: JSON.stringify(data),
		cache: "no-cache",
		headers: new Headers({
			"content-type": "application/json",
		}),
	}).then((response) => {
		if (response.status !== 200) {
			console.log(`Response status was not 200: ${response.status}`);
			return;
		}
		response.json().then((data) => {
			console.log(data["Message"]);
			console.log(data["values"]);
			HomeDom.loader.classList.remove("active");
			addDistriubtionGraph(data["values"][0], data["values"][1]);
			HomeDom.analyticWindow
				.querySelector(".histo")
				.classList.contains("inactive")
				? ""
				: HomeDom.analyticWindow
						.querySelector(".histo")
						.classList.add("inactive");
			HomeDom.analyticWindow
				.querySelector(".dis_graph")
				.classList.contains("inactive")
				? HomeDom.analyticWindow
						.querySelector(".dis_graph")
						.classList.remove("inactive")
				: "";
			HomeDom.analyticWindow.classList.remove("inactive");
			HomeDom.proccessWindow.classList.remove("active");
			HomeDom.proccessWindow.classList.remove("dec");
			HomeDom.proccessWindow.classList.add("act");
		});
	});
}

export function receiveHistogram(histo) {
	HomeDom.loader.classList.add("active");
	HomeDom.proccessWindow.classList.add("dec");
	HomeDom.proccessWindow.classList.remove("act");
	fetch(`${window.origin}/receive_histogram`, {
		method: "POST",
		credentials: "include",
		body: JSON.stringify(histo),
		cache: "no-cache",
		headers: new Headers({
			"content-type": "application/json",
		}),
	}).then((response) => {
		if (response.status !== 200) {
			console.log(`Response status was not 200: ${response.status}`);
			return;
		}
		response.json().then((data) => {
			console.log(data["Message"]);
			console.log(data["values"]);
			HomeDom.loader.classList.remove("active");
			addHistogram(data["values"][0], data["values"][1]);
			HomeDom.analyticWindow
				.querySelector(".dis_graph")
				.classList.contains("inactive")
				? ""
				: HomeDom.analyticWindow
						.querySelector(".dis_graph")
						.classList.add("inactive");
			HomeDom.analyticWindow
				.querySelector(".histo")
				.classList.contains("inactive")
				? HomeDom.analyticWindow
						.querySelector(".histo")
						.classList.remove("inactive")
				: "";
			HomeDom.analyticWindow.classList.remove("inactive");
			HomeDom.proccessWindow.classList.remove("active");
			HomeDom.proccessWindow.classList.remove("dec");
			HomeDom.proccessWindow.classList.add("act");
		});
	});
}

export function receiveEqHistogram(histo) {
	HomeDom.loader.classList.add("active");
	HomeDom.proccessWindow.classList.add("dec");
	HomeDom.proccessWindow.classList.remove("act");
	fetch(`${window.origin}/receive_rgb`, {
		method: "POST",
		credentials: "include",
		body: JSON.stringify(histo),
		cache: "no-cache",
		headers: new Headers({
			"content-type": "application/json",
		}),
	}).then((response) => {
		if (response.status !== 200) {
			console.log(`Response status was not 200: ${response.status}`);
			return;
		}
		response.json().then((data) => {
			console.log(data["Message"]);
			console.log(data["values"]);
			HomeDom.loader.classList.remove("active");
			addEqHistogram(data["values"][0], data["values"][1]);
			HomeDom.eqCmlWindow.querySelector(".eq").classList.contains("inactive")
				? HomeDom.eqCmlWindow.querySelector(".eq").classList.remove("inactive")
				: "";
			HomeDom.eqCmlWindow.querySelector(".cml").classList.contains("inactive")
				? ""
				: HomeDom.eqCmlWindow.querySelector(".cml").classList.add("inactive");
			HomeDom.eqCmlWindow.classList.contains("inactive")
				? HomeDom.eqCmlWindow.classList.remove("inactive")
				: "";
			HomeDom.proccessWindow.classList.remove("active");
			HomeDom.proccessWindow.classList.remove("dec");
			HomeDom.proccessWindow.classList.add("act");
		});
	});
}

export function receiveDistData(dist) {
	HomeDom.loader.classList.add("active");
	HomeDom.proccessWindow.classList.add("dec");
	HomeDom.proccessWindow.classList.remove("act");
	fetch(`${window.origin}/receive_distribution_curve`, {
		method: "POST",
		credentials: "include",
		body: JSON.stringify(dist),
		cache: "no-cache",
		headers: new Headers({
			"content-type": "application/json",
		}),
	}).then((response) => {
		if (response.status !== 200) {
			console.log(`Response status was not 200: ${response.status}`);
			return;
		}
		response.json().then((data) => {
			console.log(data["Message"]);
			console.log(data["values"]);
			HomeDom.loader.classList.remove("active");
			addDistriubtionGraph(data["values"][0], data["values"][1]);
			HomeDom.analyticWindow
				.querySelector(".histo")
				.classList.contains("inactive")
				? ""
				: HomeDom.analyticWindow
						.querySelector(".histo")
						.classList.add("inactive");
			HomeDom.analyticWindow
				.querySelector(".dis_graph")
				.classList.contains("inactive")
				? HomeDom.analyticWindow
						.querySelector(".dis_graph")
						.classList.remove("inactive")
				: "";
			HomeDom.analyticWindow.classList.remove("inactive");
			HomeDom.proccessWindow.classList.remove("active");
			HomeDom.proccessWindow.classList.remove("dec");
			HomeDom.proccessWindow.classList.add("act");
		});
	});
}

export function receiveRGBGrayDataHisto(data) {
	HomeDom.loader.classList.add("active");
	HomeDom.proccessWindow.classList.remove("dec");
	HomeDom.proccessWindow.classList.add("act");
	fetch(`${window.origin}/receive_rgb`, {
		method: "POST",
		credentials: "include",
		body: JSON.stringify(data),
		cache: "no-cache",
		headers: new Headers({
			"content-type": "application/json",
		}),
	}).then((response) => {
		if (response.status !== 200) {
			console.log(`Response status was not 200: ${response.status}`);
			return;
		}
		response.json().then((data) => {
			console.log(data["Message"]);
			console.log(data["values"]);
			HomeDom.loader.classList.remove("active");
			addHistogram(data["values"][0], data["values"][1]);
			console.log(data["values"][0]);
			HomeDom.analyticWindow
				.querySelector(".dis_graph")
				.classList.contains("inactive")
				? ""
				: HomeDom.analyticWindow
						.querySelector(".dis_graph")
						.classList.add("inactive");
			HomeDom.analyticWindow
				.querySelector(".histo")
				.classList.contains("inactive")
				? HomeDom.analyticWindow
						.querySelector(".histo")
						.classList.remove("inactive")
				: "";
			HomeDom.proccessWindow.classList.remove("dec");
			HomeDom.proccessWindow.classList.add("act");
			HomeDom.analyticWindow.classList.remove("inactive");
			HomeDom.proccessWindow.classList.remove("active");
		});
	});
}

export function receiveCmlCurve(dist) {
	HomeDom.loader.classList.add("active");
	HomeDom.proccessWindow.classList.add("dec");
	HomeDom.proccessWindow.classList.remove("act");
	fetch(`${window.origin}/receive_cml_curve`, {
		method: "POST",
		credentials: "include",
		body: JSON.stringify(dist),
		cache: "no-cache",
		headers: new Headers({
			"content-type": "application/json",
		}),
	}).then((response) => {
		if (response.status !== 200) {
			console.log(`Response status was not 200: ${response.status}`);
			return;
		}
		response.json().then((data) => {
			console.log(data["Message"]);
			console.log(data["values"]);
			addCmlCurve(data["values"][0], data["values"][1]);
			HomeDom.loader.classList.remove("active");
			HomeDom.proccessWindow.classList.remove("dec");
			HomeDom.proccessWindow.classList.add("act");
			HomeDom.eqCmlWindow.classList.contains("inactive")
				? HomeDom.eqCmlWindow.classList.remove("inactive")
				: "";
			HomeDom.proccessWindow.classList.remove("active");
			HomeDom.eqCmlWindow.querySelector(".cml").classList.contains("inactive")
				? HomeDom.eqCmlWindow.querySelector(".cml").classList.remove("inactive")
				: "";
			HomeDom.eqCmlWindow.querySelector(".eq").classList.contains("inactive")
				? ""
				: HomeDom.eqCmlWindow.querySelector(".eq").classList.add("inactive");
		});
	});
}

export function applyActiveContour(data) {
	HomeDom.loader.classList.add("active");
	document.querySelector(".hf-cont").classList.add("handle");
	document.querySelector(".snake-cont-det").classList.add("hndl");
	ShapeDetectionDom.startProBtn.style.pointerEvents = "none";
	fetch(`${window.origin}/active_contour`, {
		method: "POST",
		credentials: "include",
		body: JSON.stringify({ ...data, sid: sessionStorage.getItem("sid") }),
		cache: "no-cache",
		headers: new Headers({
			"content-type": "application/json",
		}),
	}).then((response) => {
		if (response.status !== 200) {
			console.log(`Response status was not 200: ${response.status}`);
			return;
		}
		response.json().then((data) => {
			console.log(data["Message"]);
			document.querySelector(".img-info-cont .img-cont img").src = data["img"];
			HomeDom.loader.classList.remove("active");
			ShapeDetectionDom.snakeHoughWindo.classList.remove("active");
			document.querySelector(".hf-cont").classList.remove("handle");
			document.querySelector(".snake-cont-det").classList.remove("hndl");
			ShapeDetectionDom.startProBtn.style.pointerEvents = "auto";
			ShapeDetectionDom.snkCont.classList.add("active");
		});
	});
}

export function applyHough(data) {
	ShapeDetectionDom.hfContSetWinf.classList.add("handle");
	HomeDom.loader.classList.add("active");
	fetch(`${window.origin}/hough_transform`, {
		method: "POST",
		credentials: "include",
		body: JSON.stringify({ ...data, sid: sessionStorage.getItem("sid") }),
		cache: "no-cache",
		headers: new Headers({
			"content-type": "application/json",
		}),
	}).then((response) => {
		if (response.status !== 200) {
			console.log(`Response status was not 200: ${response.status}`);
			return;
		}
		response.json().then((data) => {
			console.log(data["Message"]);
			document.querySelector(".img-prev img").src = data["img"];
			ShapeDetectionDom.hfContSetWinf.classList.remove("handle");
			HomeDom.loader.classList.remove("active");
		});
	});
}

export function sendData() {
	collectSsdData();
	console.log(ImagesMatchingStatus.ssdData);
	ImagesMatchingDom.operatingWindow.classList.add("handle");
	HomeDom.loader.classList.add("active");
	ImagesMatchingDom.processBtn.style = " pointer-events: none";
	ImagesMatchingDom.subWindowOpenBtn.style = " pointer-events: none";
	fetch(`${window.origin}/ssd_ncc_receive`, {
		method: "POST",
		credentials: "include",
		body: JSON.stringify({
			...ImagesMatchingStatus.ssdData,
			sid: sessionStorage.getItem("sid"),
		}),
		cache: "no-cache",
		headers: new Headers({
			"content-type": "application/json",
		}),
	}).then((response) => {
		if (response.status !== 200) {
			console.log(`Response status was not 200: ${response.status}`);
			return;
		}
		response.json().then((data) => {
			console.log(data["Message"]);
			console.log(data["img"]);
			console.log(data["mode"]);
			ImagesMatchingDom.ssdRsltImage.src = data["img"];
			ImagesMatchingDom.ssdModeParInfo[0].innerText = data["mode"];
			ImagesMatchingDom.ssdModeParInfo[1].innerHTML = `${data["mode_time"]} <i>sec</i>`;
			ImagesMatchingDom.siftModeParInfo[1].innerHTML = `${data["sift_time"]} <i>sec</i>`;
			HomeDom.loader.classList.remove("active");
			ImagesMatchingDom.operatingWindow.classList.remove("handle");
			ImagesMatchingDom.processBtn.style = " pointer-events: auto";
			ImagesMatchingDom.subWindowOpenBtn.style = " pointer-events: auto";
			ImagesMatchingDom.ssdRsltWindow.classList.add("active");
			ImagesMatchingDom.operatingWindow.classList.remove("active");
		});
	});
}

export function sendThresholdingData(data) {
	console.log(data);
	HomeDom.loader.classList.add("active");
	ImageThresholdingDom.ts4Layout.classList.add("active");
	fetch(`${window.origin}/image_thresholding_segmentation`, {
		method: "POST",
		credentials: "include",
		body: JSON.stringify({ ...data, sid: sessionStorage.getItem("sid") }),
		cache: "no-cache",
		headers: new Headers({
			"content-type": "application/json",
		}),
	}).then((response) => {
		if (response.status !== 200) {
			console.log(`Response status was not 200: ${response.status}`);
			HomeDom.errorWindow.classList.add("active");
			HomeDom.loader.classList.remove("active");
			ImageThresholdingDom.ts4Layout.classList.remove("active");
			return;
		}
		response.json().then((data) => {
			console.log(data["Message"]);
			console.log(data["img"]);
			ImageThresholdingDom.ts4UplImage.src = data["img"];
			HomeDom.loader.classList.remove("active");
			ImageThresholdingDom.ts4Layout.classList.remove("active");
		});
	});
}

// Face detection and recognition
export function sendDataToFaceRecognition(data) {
	console.log(data);
	HomeDom.loader.classList.add("active");
	fetch(`${window.origin}/face_recognition`, {
		method: "POST",
		credentials: "include",
		body: JSON.stringify({ ...data, sid: sessionStorage.getItem("sid") }),
		cache: "no-cache",
		headers: new Headers({
			"content-type": "application/json",
		}),
	}).then((response) => {
		if (response.status !== 200) {
			console.log(`Response status was not 200: ${response.status}`);
			HomeDom.errorWindow.classList.add("active");
			HomeDom.loader.classList.remove("active");
			return;
		}
		response.json().then((data) => {
			console.log(data["Message"]);
			console.log(data["img"]);
			console.log(data["stat"]);
			console.log(data["prs_name"]);
			if (
				["Invalid image", "No face detected", "Unknown person"].includes(
					data["stat"],
				)
			) {
				FaceDetectionRecognitionDom.unknownFaceErrorWindow.classList.add(
					"active",
				);
			} else {
				FaceDetectionRecognitionDom.t5ResWrkSpace.querySelector("img").src =
					data["img"];
				FaceDetectionRecognitionDom.t5ResWrkSpace
					.querySelector("img")
					.classList.add("active");
				FaceDetectionRecognitionDom.ts5OperWindow.classList.remove("in-op");
				FaceDetectionRecognitionDom.t5ResWrkSpace.classList.remove("in-op");
				document.querySelector(".t5-name").innerText = data["prs_name"];
				let t5Stat = document.querySelector(".t5-stat");
				if (data["stat"] == "Known person") {
					t5Stat.innerText = "Known person";
					t5Stat.style.color = "rgb(9, 132, 9)";
				} else {
					t5Stat.innerText = "False matched";
					t5Stat.style.color = "rgb(137, 11, 11)";
				}
				// document.querySelector('.rm-img.roc-img img').src = data['roc'];
			}
			HomeDom.loader.classList.remove("active");
		});
	});
}

export function sendFaceDetection(data) {
	console.log(data);
	HomeDom.loader.classList.add("active");
	fetch(`${window.origin}/face_detection`, {
		method: "POST",
		credentials: "include",
		body: JSON.stringify({ ...data, sid: sessionStorage.getItem("sid") }),
		cache: "no-cache",
		headers: new Headers({
			"content-type": "application/json",
		}),
	}).then((response) => {
		if (response.status !== 200) {
			console.log(`Response status was not 200: ${response.status}`);
			HomeDom.errorWindow.classList.add("active");
			HomeDom.loader.classList.remove("active");
			return;
		}
		response.json().then((data) => {
			console.log(data["Message"]);
			console.log(data["img"]);
			FaceDetectionRecognitionDom.faceDecWind.classList.contains("in-op")
				? FaceDetectionRecognitionDom.faceDecWind.classList.remove("in-op")
				: "";
			FaceDetectionRecognitionDom.tdResWrkSpace.classList.contains("in-op")
				? FaceDetectionRecognitionDom.tdResWrkSpace.classList.remove("in-op")
				: "";
			FaceDetectionRecognitionDom.tfPrecSubmitWindow.classList.remove("active");
			HomeDom.loader.classList.remove("active");
			FaceDetectionRecognitionDom.tdResWrkSpace
				.querySelector("img")
				.classList.add("active");
			FaceDetectionRecognitionDom.tdResWrkSpace.querySelector("img").src =
				data["img"];
			FaceDetectionRecognitionDom.tfShowSubWindow.classList.remove("active");
		});
	});
}
