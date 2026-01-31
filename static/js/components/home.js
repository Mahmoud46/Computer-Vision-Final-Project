export const HomeDom = {
	menuBtn: document.querySelector(".toggle-menu"),
	mainConatiner: document.querySelector(".container"),
	tryNowBtn: document
		.querySelector(".container")
		.querySelector(".hero .button"),
	descriptionContainer: document.querySelector(".description-container"),
	closeDescriptionContainerBtn: document
		.querySelector(".description-container")
		.querySelector(".close"),
	proccessWindow: document.querySelector(".process-image-container"),
	viewImage: document.querySelector(".view-image-container .img-view"),
	editPanel: document.querySelector(".img-edit-panel"),
	loader: document.querySelector(".loader-rgn"),
	analyticWindow: document.querySelector(".analytics"),
	clsBtnAnalyticsWindow: document
		.querySelector(".analytics")
		.querySelector("span.cls"),
	graphs_menu: document.querySelector(".graphs-menu"),
	eqCmlWindow: document.querySelector(".cml-eq-diagrams"),
	imgsListBtn: document.querySelector(".dwn-list-btns"),
	imgsListContainer: document.querySelector(".imgs-list-con"),
	errorWindow: document.querySelector(".error-window"),
	viewImg: document.querySelector(".img-view img"),
	upldImgBtn: document.querySelector(".img-view span.add"),
	upldImg: document.querySelector(".img-view input"),
	rmvImgBtn: document
		.querySelector(".view-image-container .img-view")
		.querySelector(".remove"),
	wrkSpcImg: document.querySelector(".img-edit-panel .work-space-img img"),
	panelElments: document.querySelectorAll(".panel .main p"),
	desBtns: document.querySelectorAll(".description-container .buttons .btn"),
	viewBtns: document
		.querySelector(".process-image-container")
		.querySelectorAll(".nav-edit-view p"),
};

// hough and snake
export const ShapeDetectionDom = {
	newDes: document.querySelector(".snake-cont-det .description"),
	snakeHoughWindo: document.querySelector(".snake-cont-det"),
	bkBtn: document.querySelector(".snake-cont-det").querySelector(".bk"),
	clsBtn: document.querySelector(".snake-cont-det").querySelector(".cls"),
	imgTestChoose: document.querySelector(".image-test"),
	tryBtn: document.querySelector(".image-test").querySelector(".try-btn"),
	actBtns: document
		.querySelector(".snake-cont-det .description")
		.querySelectorAll(".act-btns p"),
	showBtn: document.querySelector(".new_features"),
	imgsHaughList: document.querySelectorAll(".imgs-container-test p"),
	startProBtn: document.querySelector(".try-btn p"),
	snkCont: document.querySelector(".hf-cont"),
	hfBtns: document.querySelectorAll(".opt-d p"),
	hfContSetWinf: document.querySelector(".hf-cont-setting"),
	hfClsBtn: document.querySelector(".cls-hf-st-btn"),
	appHoughBtn: document.querySelector(".stt p"),
	activeDwnBtn: document.querySelector(".dd .dwn-img"),
};

//  graphs Menu
export const GraphMenuDom = {
	grphsBtn: HomeDom.analyticWindow.querySelector(".grph_btn"),
	graphMenuList: HomeDom.graphs_menu.querySelectorAll("p"),
};

// hybrid
export const HybridWindowDom = {
	hybridWindow: document.querySelector(".hybrid-imgs-container"),
	hybridControlBtns: document
		.querySelector(".hybrid-imgs-container")
		.querySelectorAll(".control-btns p"),
	upldImgsBtns: document
		.querySelector(".hybrid-imgs-container")
		.querySelectorAll(".img span.add"),
	upldImg1: document.getElementById("img-one"),
	upldImg2: document.getElementById("img-two"),
	img1: document
		.querySelector(".hybrid-imgs-container")
		.querySelector(".img.img-1 .img-container img"),
	img2: document
		.querySelector(".hybrid-imgs-container")
		.querySelector(".img.img-2 .img-container img"),
	rmvBtns: document
		.querySelector(".hybrid-imgs-container")
		.querySelectorAll(".img .remove"),
	rsllImgContainer: document
		.querySelector(".hybrid-imgs-container")
		.querySelector(".img.rslt-img"),
};
