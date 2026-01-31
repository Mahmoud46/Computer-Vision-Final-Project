import { HybridWindowStatus, ImgsStatus } from "../utils/variables.js";
import {
	activeCombineClearBtns,
	addToOptions,
	clearActive,
	downloadElement,
	clearImgsListContainer,
	addToSettings,
	addToHfAcImgsList,
} from "../utils/helpers.js";
import {
	sendHybridImgs,
	sendImg,
	applyFilter,
	receiveRGBGrayDataDistGraph,
	receiveRGBGrayDataHisto,
	applyActiveContour,
	applyHough,
} from "../services/api.js";
import {
	HomeDom,
	ShapeDetectionDom,
	GraphMenuDom,
	HybridWindowDom,
} from "../components/home.js";

export default function homeEvents() {
	HomeDom.errorWindow
		.querySelector(".error-cls")
		.addEventListener("click", (_) =>
			HomeDom.errorWindow.classList.remove("active"),
		);
	// show images container

	HomeDom.imgsListBtn.addEventListener("click", (_) => {
		let btnSpan = HomeDom.imgsListBtn.querySelector("span");
		if (btnSpan.classList.contains("active")) {
			btnSpan.classList.remove("active");
			HomeDom.proccessWindow.classList.remove("list-img");
			HomeDom.imgsListContainer.classList.remove("active");
		} else {
			HomeDom.proccessWindow.classList.add("list-img");
			btnSpan.classList.add("active");
			HomeDom.imgsListContainer.classList.add("active");
			let imgsTags = HomeDom.imgsListContainer.querySelectorAll("p img");
			imgsTags.forEach((ele) => {
				ele.addEventListener("click", (_) => {
					HomeDom.wrkSpcImg.src = ele.src;
					HomeDom.imgsListContainer
						.querySelector("p.active")
						.classList.remove("active");
					ele.parentElement.classList.add("active");
				});
			});
		}
	});

	HomeDom.clsBtnAnalyticsWindow.addEventListener("click", (_) => {
		HomeDom.analyticWindow.classList.contains("inactive")
			? ""
			: HomeDom.analyticWindow.classList.add("inactive");
		HomeDom.proccessWindow.classList.add("active");
		document.querySelector(".graphs-menu").classList.remove("active");
		HomeDom.analyticWindow
			.querySelector(".grph_btn")
			.classList.remove("active");
		document.querySelector(".graphs-menu p.active").classList.remove("active");
		document.querySelectorAll(".graphs-menu p")[0].classList.add("active");
	});

	HomeDom.tryNowBtn.addEventListener("click", (_) => {
		HomeDom.mainConatiner.classList.add("inactive");
		HomeDom.descriptionContainer.classList.add("active");
	});

	HomeDom.closeDescriptionContainerBtn.addEventListener("click", (_) => {
		HomeDom.mainConatiner.classList.remove("inactive");
		HomeDom.descriptionContainer.classList.remove("active");
	});

	HomeDom.desBtns[0].addEventListener("click", (_) => {
		HomeDom.descriptionContainer.classList.remove("active");
		HomeDom.proccessWindow.classList.add("active");
		HomeDom.proccessWindow
			.querySelector(".logo-cancel span")
			.addEventListener("click", (_) => {
				HomeDom.proccessWindow.classList.remove("active");
				HomeDom.descriptionContainer.classList.add("active");
			});
		HomeDom.viewBtns =
			HomeDom.proccessWindow.querySelectorAll(".nav-edit-view p");
		HomeDom.viewBtns[0].addEventListener("click", (_) => {
			HomeDom.viewBtns.forEach((ele) =>
				ele.classList.contains("active") ? ele.classList.remove("active") : "",
			);
			HomeDom.viewBtns[0].classList.add("active");
			HomeDom.proccessWindow.classList.contains("process")
				? HomeDom.proccessWindow.classList.remove("process")
				: HomeDom.proccessWindow.classList.add("");
			HomeDom.editPanel.classList.add("inactive");
			HomeDom.viewImage.classList.remove("inactive");
			clearActive();
			clearImgsListContainer();
		});
		HomeDom.viewBtns[1].addEventListener("click", (_) => {
			sendImg();
		});
	});

	HomeDom.upldImgBtn.addEventListener("click", (_) => HomeDom.upldImg.click());

	HomeDom.upldImg.addEventListener("input", (_) => {
		let file = HomeDom.upldImg.files[0];
		if (file) {
			let reader = new FileReader();
			reader.onload = (_) => {
				let result = reader.result;
				console.log(result);
				HomeDom.viewImg.classList.add("active");
				HomeDom.viewImg.src = result;
				ImgsStatus.imgData.img = result;
				HomeDom.rmvImgBtn.classList.add("active");
				HomeDom.viewBtns[1].classList.remove("disabled");
			};
			HomeDom.rmvImgBtn.addEventListener("click", (_) => {
				HomeDom.viewImg.classList.remove("active");
				HomeDom.viewImg.src = "";
				HomeDom.wrkSpcImg.src = HomeDom.viewImg.src;
				HomeDom.upldImg.value = "";
				HomeDom.rmvImgBtn.classList.remove("active");
				HomeDom.viewBtns[1].classList.add("disabled");
			});
			reader.readAsDataURL(file);
		}
	});

	HomeDom.panelElments.forEach((ele) => {
		ele.addEventListener("click", (_) => {
			document
				.querySelector(".panel .main p.active")
				?.classList.remove("active");
			ele.classList.add("active");
			addToOptions(ele.getAttribute("value"));
			if (
				ele.getAttribute("value") == "normalizer" ||
				ele.getAttribute("value") == "equalizer" ||
				ele.getAttribute("value") == "convert_to_grayscale"
			) {
				let filter = {};
				filter.value = ele.getAttribute("value");
				filter.img = HomeDom.wrkSpcImg.src;
				applyFilter(filter);
			}
		});
	});

	HomeDom.desBtns[1].addEventListener("click", (_) => {
		HybridWindowDom.hybridWindow.classList.add("active");
		HomeDom.descriptionContainer.classList.remove("active");
		HybridWindowDom.hybridWindow
			.querySelector(".logo-cancel span")
			.addEventListener("click", (_) => {
				HybridWindowDom.hybridWindow.classList.remove("active");
				HomeDom.descriptionContainer.classList.add("active");
			});
	});

	HybridWindowDom.upldImgsBtns[0].addEventListener("click", (_) =>
		HybridWindowDom.upldImg1.click(),
	);

	HybridWindowDom.upldImgsBtns[1].addEventListener("click", (_) =>
		HybridWindowDom.upldImg2.click(),
	);

	HybridWindowDom.upldImg1.addEventListener("input", (_) => {
		let file = HybridWindowDom.upldImg1.files[0];
		if (file) {
			let reader = new FileReader();
			reader.onload = (_) => {
				let result = reader.result;
				console.log(result);
				HybridWindowDom.img1.classList.add("active");
				HybridWindowDom.img1.src = result;
				HybridWindowStatus.imgsObj.img1 = result;
				HybridWindowStatus.img1Stat = true;
				activeCombineClearBtns();
				HybridWindowDom.rmvBtns[0].classList.add("active");
				HybridWindowDom.rsllImgContainer.classList.contains("inactive")
					? ""
					: HybridWindowDom.rsllImgContainer.classList.add("inactive");
			};
			HybridWindowDom.rmvBtns[0].addEventListener("click", (_) => {
				HybridWindowDom.img1.src = "";
				HybridWindowStatus.img1Stat = false;
				HybridWindowDom.upldImg1.value = "";
				HybridWindowDom.rmvBtns[0].classList.remove("active");
				HybridWindowDom.img1.classList.remove("active");
				HybridWindowDom.rsllImgContainer.classList.contains("inactive")
					? ""
					: HybridWindowDom.rsllImgContainer.classList.add("inactive");
				HybridWindowDom.hybridControlBtns[1].classList.contains("process")
					? HybridWindowDom.hybridControlBtns[1].classList.remove("process")
					: "";
				activeCombineClearBtns();
			});
			reader.readAsDataURL(file);
		}
	});

	HybridWindowDom.upldImg2.addEventListener("input", (_) => {
		let file = HybridWindowDom.upldImg2.files[0];
		if (file) {
			let reader = new FileReader();
			reader.onload = (_) => {
				let result = reader.result;
				console.log(result);
				HybridWindowDom.img2.classList.add("active");
				HybridWindowDom.img2.src = result;
				HybridWindowStatus.imgsObj.img2 = result;
				HybridWindowStatus.img2Stat = true;
				activeCombineClearBtns();
				HybridWindowDom.rmvBtns[1].classList.add("active");
				HybridWindowDom.rsllImgContainer.classList.contains("inactive")
					? ""
					: HybridWindowDom.rsllImgContainer.classList.add("inactive");
			};
			HybridWindowDom.rmvBtns[1].addEventListener("click", (_) => {
				HybridWindowDom.img2.src = "";
				HybridWindowStatus.img2Stat = false;
				HybridWindowDom.upldImg2.value = "";
				HybridWindowDom.rmvBtns[1].classList.remove("active");
				HybridWindowDom.img2.classList.remove("active");
				HybridWindowDom.rsllImgContainer.classList.contains("inactive")
					? ""
					: HybridWindowDom.rsllImgContainer.classList.add("inactive");
				HybridWindowDom.hybridControlBtns[1].classList.contains("process")
					? HybridWindowDom.hybridControlBtns[1].classList.remove("process")
					: "";
				activeCombineClearBtns();
			});
			reader.readAsDataURL(file);
		}
	});

	HybridWindowDom.hybridControlBtns[0].addEventListener("click", (_) => {
		HybridWindowDom.img1.src = "";
		HybridWindowDom.img2.src = "";
		HybridWindowDom.upldImg1.value = "";
		HybridWindowDom.upldImg2.value = "";
		HybridWindowDom.img1.classList.remove("active");
		HybridWindowDom.img2.classList.remove("active");
		HybridWindowDom.rmvBtns[0].classList.contains("active")
			? HybridWindowDom.rmvBtns[0].classList.remove("active")
			: "";
		HybridWindowDom.rmvBtns[1].classList.contains("active")
			? HybridWindowDom.rmvBtns[1].classList.remove("active")
			: "";
		HybridWindowDom.rsllImgContainer.classList.contains("inactive")
			? ""
			: HybridWindowDom.rsllImgContainer.classList.add("inactive");
		HybridWindowDom.hybridControlBtns[1].classList.contains("process")
			? HybridWindowDom.hybridControlBtns[1].classList.remove("process")
			: "";
		((HybridWindowStatus.img1Stat = false),
			(HybridWindowStatus.img2Stat = false));
		activeCombineClearBtns();
	});

	HybridWindowDom.hybridControlBtns[1].addEventListener("click", (_) => {
		sendHybridImgs();
	});

	document.querySelectorAll(".dwn").forEach((ele) => {
		ele.addEventListener("click", (_) => {
			downloadElement(
				ele.parentElement.querySelector("img").src,
				ele.parentElement.querySelector("img").src.split("/").pop(),
			);
		});
	});

	GraphMenuDom.grphsBtn.addEventListener("click", (_) => {
		HomeDom.graphs_menu.classList.toggle("active");
		GraphMenuDom.grphsBtn.classList.toggle("active");
	});

	GraphMenuDom.graphMenuList.forEach((ele) => {
		ele.addEventListener("click", (_) => {
			HomeDom.graphs_menu.querySelector("p.active").classList.remove("active");
			ele.classList.add("active");
			let data = {};
			data.img = HomeDom.wrkSpcImg.src;
			data.value = ele.getAttribute("value");
			if (
				HomeDom.analyticWindow
					.querySelector(".dis_graph")
					.classList.contains("inactive")
			)
				receiveRGBGrayDataHisto(data);
			else if (
				HomeDom.analyticWindow
					.querySelector(".histo")
					.classList.contains("inactive")
			)
				receiveRGBGrayDataDistGraph(data);
		});
	});

	ShapeDetectionDom.actBtns.forEach((ele) => {
		ele.addEventListener("click", (_) => {
			ImgsStatus.imgObj.value = ele.getAttribute("value");
			addToHfAcImgsList(ele.getAttribute("value"));
			ShapeDetectionDom.imgTestChoose.querySelector(".t").innerText =
				`Choose an image as a test sample to try ${ele.innerHTML
					.split(" ")
					.slice(1, ele.innerHTML.split(" ").length)
					.join(" ")}`;
			ShapeDetectionDom.tryBtn.querySelector("p").innerText =
				`Try ${ele.innerHTML
					.split(" ")
					.slice(1, ele.innerHTML.split(" ").length)
					.join(" ")}`;
			ShapeDetectionDom.newDes.classList.remove("active");
			ShapeDetectionDom.snakeHoughWindo.classList.add("imgs-choose");
			ShapeDetectionDom.imgTestChoose.classList.add("active");
			ShapeDetectionDom.bkBtn.classList.add("active");
		});
	});

	ShapeDetectionDom.showBtn.addEventListener("click", (_) => {
		ShapeDetectionDom.snakeHoughWindo.classList.add("active");
		HomeDom.mainConatiner.classList.add("inactive");
	});

	ShapeDetectionDom.hfBtns.forEach((ele) => {
		ele.addEventListener("click", (_) => {
			addToSettings(ele.getAttribute("value"));
			document.querySelector(".opt-d p.active")?.classList.remove("active");
			ele.classList.add("active");
			document.querySelector(".stt p").classList.remove("inactive");
			ImgsStatus.imgObj.type = ele.getAttribute("value");
		});
	});

	ShapeDetectionDom.bkBtn.addEventListener("click", (_) => {
		ShapeDetectionDom.bkBtn.classList.remove("active");
		ShapeDetectionDom.newDes.classList.add("active");
		ShapeDetectionDom.snakeHoughWindo.classList.remove("imgs-choose");
		ShapeDetectionDom.imgTestChoose.classList.remove("active");
		ShapeDetectionDom.startProBtn.classList.contains("active")
			? ShapeDetectionDom.startProBtn.classList.remove("active")
			: "";
		document
			.querySelector(".imgs-container-test p.active")
			?.classList.remove("active");
	});

	ShapeDetectionDom.hfClsBtn.addEventListener("click", (_) => {
		ShapeDetectionDom.hfContSetWinf.classList.remove("active");
		ShapeDetectionDom.snakeHoughWindo.classList.add("active");
		document.querySelector(".stt p").classList.contains("inactive")
			? ""
			: document.querySelector(".stt p").classList.add("inactive");
		ShapeDetectionDom.hfBtns.forEach((ele) => {
			ele.classList.contains("active") ? ele.classList.remove("active") : "";
		});
		document.querySelector(".list-set").innerHTML = "";
	});

	ShapeDetectionDom.clsBtn.addEventListener("click", (_) => {
		ShapeDetectionDom.bkBtn.click();
		ShapeDetectionDom.snakeHoughWindo.classList.remove("active");
		HomeDom.mainConatiner.classList.remove("inactive");
	});

	ShapeDetectionDom.snkCont
		.querySelector(".cls-hf-btn")
		.addEventListener("click", (_) => {
			ShapeDetectionDom.clsBtn.click();
			ShapeDetectionDom.snkCont.classList.remove("active");
		});

	ShapeDetectionDom.snkCont
		.querySelector(".bk-hf-btn")
		.addEventListener("click", (_) => {
			ShapeDetectionDom.snakeHoughWindo.classList.add("active");
			ShapeDetectionDom.snkCont.classList.remove("active");
		});

	ShapeDetectionDom.startProBtn.addEventListener("click", (_) => {
		if (ImgsStatus.imgObj.value == "active_contour_model") {
			applyActiveContour(ImgsStatus.imgObj);
		} else if (ImgsStatus.imgObj.value == "hough_transform") {
			ShapeDetectionDom.hfContSetWinf.classList.add("active");
			document.querySelector(".img-prev img").src = ImgsStatus.imgObj.img;
			ShapeDetectionDom.snakeHoughWindo.classList.remove("active");
		}
	});

	ShapeDetectionDom.appHoughBtn.addEventListener("click", (_) => {
		let varRang = document.querySelectorAll(".list-set input");
		varRang.forEach(
			(ele) => (ImgsStatus.imgObj[ele.getAttribute("cl")] = ele.value),
		);
		console.log(ImgsStatus.imgObj);
		applyHough(ImgsStatus.imgObj);
	});

	ShapeDetectionDom.activeDwnBtn.addEventListener("click", (_) => {
		let link = document.createElement("a");
		link.href = document.querySelector(".img-info-cont .img-cont img").src;
		link.download = document
			.querySelector(".img-info-cont .img-cont img")
			.src.split("//")[1];
		link.click();
	});
}
