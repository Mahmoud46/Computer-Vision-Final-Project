import { HomeDom } from "../components/home.js";
import { ImageThresholdingDom } from "../components/image_thresholding.js";
import { ImageThresholdingStatus } from "../utils/variables.js";
import { OptionsListDom } from "../components/lists.js";
import { sendThresholdingData } from "../services/api.js";
import { ts4DownloadElement } from "../utils/helpers.js";

export default function imageThresholdingEvents() {
	ImageThresholdingDom.ts4DxClsBtn.addEventListener("click", (_) => {
		ImageThresholdingDom.ts4DxWindow.classList.remove("active");
		HomeDom.mainConatiner.classList.remove("inactive");
	});

	ImageThresholdingDom.ts4TryBtn.addEventListener("click", (_) => {
		ImageThresholdingDom.ts4DxWindow.classList.add("active");
		HomeDom.mainConatiner.classList.add("inactive");
	});

	ImageThresholdingDom.ts4UpldImgBtn.addEventListener("click", (_) =>
		ImageThresholdingDom.ts4InpImage.click()
	);

	ImageThresholdingDom.ts4InpImage.addEventListener("input", (_) => {
		let file = ImageThresholdingDom.ts4InpImage.files[0];
		if (file) {
			let reader = new FileReader();
			reader.onload = (_) => {
				let result = reader.result;
				console.log(result);
				ImageThresholdingDom.ts4UplImage.classList.add("active");
				ImageThresholdingDom.ts4UplImage.src = result;
				ImageThresholdingStatus.ts4Data.orImg = result;
				ImageThresholdingDom.ts4RmvImgBtn.classList.add("active");
				ImageThresholdingDom.ts4UpldImgBtn.classList.remove("active");
				ImageThresholdingDom.ts4DwnldImgBtn.classList.add("active");
				console.log(ImageThresholdingStatus.ts4Data);
				ImageThresholdingStatus.ts4Data.thType = "";
				sendThresholdingData(ImageThresholdingStatus.ts4Data);
				ImageThresholdingDom.ts4Panel.classList.add("active");
			};
			ImageThresholdingDom.ts4RmvImgBtn.addEventListener("click", (_) => {
				ImageThresholdingDom.ts4UplImage.classList.remove("active");
				ImageThresholdingDom.ts4OpWindow.classList.contains("sp")
					? ImageThresholdingDom.ts4OpWindow.classList.remove("sp")
					: "";
				ImageThresholdingDom.ts4UplImage.src = "";
				ImageThresholdingDom.ts4InpImage.value = "";
				ImageThresholdingDom.ts4MainPanelElemnts.forEach((ele) =>
					ele.classList.contains("active")
						? ele.classList.remove("active")
						: null
				);
				ImageThresholdingDom.ts4RmvImgBtn.classList.remove("active");
				ImageThresholdingDom.ts4UpldImgBtn.classList.add("active");
				ImageThresholdingDom.ts4DwnldImgBtn.classList.remove("active");
				ImageThresholdingDom.ts4Panel.classList.remove("active");
				ImageThresholdingDom.ts4PanelMoreVar.innerHTML = "";
			});
			reader.readAsDataURL(file);
		}
	});

	ImageThresholdingDom.ts4MainPanelElemnts.forEach((ele) => {
		ele.addEventListener("click", (_) => {
			ImageThresholdingDom.ts4MainPanelElemnts.forEach((ele) =>
				ele.classList.contains("active") ? ele.classList.remove("active") : null
			);
			ele.classList.add("active");
			ImageThresholdingStatus.ts4Data.thType = ele.getAttribute("value");
			console.log(ImageThresholdingStatus.ts4Data);
			if (
				ele.getAttribute("value") == "local_thresholding" ||
				ele.getAttribute("value") == "region_growing" ||
				ele.getAttribute("value") == "agglomerative_clustring" ||
				ele.getAttribute("value") == "k_mean_segmentation"
			) {
				if (ele.getAttribute("value") == "local_thresholding") {
					ImageThresholdingStatus.ts4Data.lclBlockSize = 11;
					ImageThresholdingStatus.ts4Data.lclThresholdWeight = 2;
				} else if (ele.getAttribute("value") == "region_growing") {
					ImageThresholdingStatus.ts4Data.lclBlockSize = 50;
					ImageThresholdingStatus.ts4Data.lclThresholdWeight = 60;
				} else if (ele.getAttribute("value") == "agglomerative_clustring") {
					ImageThresholdingStatus.ts4Data.lclBlockSize = 4;
					ImageThresholdingStatus.ts4Data.lclThresholdWeight = 20;
				} else if (ele.getAttribute("value") == "k_mean_segmentation") {
					ImageThresholdingStatus.ts4Data.lclBlockSize = 3;
					ImageThresholdingStatus.ts4Data.lclThresholdWeight = 20;
				}
				OptionsListDom.ts4VarThrData.forEach((e) => {
					switch (ele.getAttribute("value")) {
						case "local_thresholding":
							if (e.type == "local_thresholding")
								ImageThresholdingDom.ts4PanelMoreVar.innerHTML = e.body;
							break;
						case "region_growing":
							if (e.type == "region_growing")
								ImageThresholdingDom.ts4PanelMoreVar.innerHTML = e.body;
							break;
						case "agglomerative_clustring":
							if (e.type == "agglomerative_clustring")
								ImageThresholdingDom.ts4PanelMoreVar.innerHTML = e.body;
							break;
						case "k_mean_segmentation":
							if (e.type == "k_mean_segmentation")
								ImageThresholdingDom.ts4PanelMoreVar.innerHTML = e.body;
							break;
						default:
							break;
					}
				});
				document
					.querySelector(".ts4-thr-lcl-submit-btn")
					.addEventListener("click", (_) => {
						ImageThresholdingStatus.ts4Data.lclBlockSize =
							document.getElementById("ts4-blk-sz").value;
						ImageThresholdingStatus.ts4Data.lclThresholdWeight =
							document.getElementById("ts4-thr-weight").value;
						sendThresholdingData(ImageThresholdingStatus.ts4Data);
					});
				ImageThresholdingDom.ts4OpWindow.classList.contains("sp")
					? ImageThresholdingDom.ts4OpWindow.classList.remove("sp")
					: "";
				sendThresholdingData(ImageThresholdingStatus.ts4Data);
			} else if (
				ele.getAttribute("value") == "optimal_thresholding" ||
				ele.getAttribute("value") == "otsu_thresholding" ||
				ele.getAttribute("value") == "mean_shift_segmentation" ||
				ele.getAttribute("value") == "rgb_luv" ||
				ele.getAttribute("value") == "spectral_thresholding_mod"
			) {
				ImageThresholdingDom.ts4PanelMoreVar.innerHTML = "";
				sendThresholdingData(ImageThresholdingStatus.ts4Data);
			} else if (ele.getAttribute("value") == "spectral_thresholding") {
				ImageThresholdingDom.ts4OpWindow.classList.contains("sp")
					? ImageThresholdingDom.ts4OpWindow.classList.remove("sp")
					: "";
				OptionsListDom.ts4VarThrData.forEach((e) => {
					if (e.type == "spectral_thresholding") {
						ImageThresholdingDom.ts4PanelMoreVar.innerHTML = e.body;
						let thrSpModes =
								ImageThresholdingDom.ts4PanelMoreVar.querySelectorAll("p"),
							thrSpModesContVar =
								ImageThresholdingDom.ts4PanelMoreVar.querySelector(
									".thr-sp-mode-var"
								);
						thrSpModes.forEach((el) => {
							el.addEventListener("click", (_) => {
								thrSpModesContVar.innerHTML = "";
								ImageThresholdingDom.ts4PanelMoreVar
									.querySelector("p.active")
									?.classList.remove("active");
								el.classList.add("active");
								OptionsListDom.sp4ModeData.forEach((v) => {
									if (el.getAttribute("value") == v.type) {
										thrSpModesContVar.innerHTML = v.body;
										ImageThresholdingDom.ts4OpWindow.classList.contains("sp")
											? ""
											: ImageThresholdingDom.ts4OpWindow.classList.add("sp");
										document
											.querySelector(".ts4-thr-lcl-submit-btn")
											.addEventListener("click", (_) => {
												ImageThresholdingStatus.ts4Data.threshold =
													document.getElementById("ts4-sp-thr")?.value;
												ImageThresholdingStatus.ts4Data.reduction =
													document.getElementById("ts4-sp-red")?.value;
												ImageThresholdingStatus.ts4Data.mode =
													el.getAttribute("value");
												sendThresholdingData(ImageThresholdingStatus.ts4Data);
											});
									}
								});
							});
						});
					}
				});
			} else {
				ImageThresholdingDom.ts4PanelMoreVar.innerHTML = "";
				ImageThresholdingDom.ts4OpWindow.classList.contains("sp")
					? ImageThresholdingDom.ts4OpWindow.classList.remove("sp")
					: "";
			}
		});
	});

	ImageThresholdingDom.ts4OpWindowOpnBtn.addEventListener("click", (_) => {
		ImageThresholdingDom.ts4DxWindow.classList.remove("active");
		ImageThresholdingDom.ts4OpWindow.classList.add("active");
	});

	ImageThresholdingDom.ts4OpWindowClsBtn.addEventListener("click", (_) => {
		ImageThresholdingDom.ts4DxWindow.classList.add("active");
		ImageThresholdingDom.ts4OpWindow.classList.remove("active");
		ImageThresholdingDom.ts4PanelMoreVar.innerHTML = "";
	});
	ImageThresholdingDom.ts4DwnldImgBtn.addEventListener("click", (_) =>
		ts4DownloadElement(
			ImageThresholdingDom.ts4UplImage.src,
			ImageThresholdingDom.ts4UplImage.src.split("/")[
				ImageThresholdingDom.ts4UplImage.src.split("/").length - 1
			]
		)
	);
}
