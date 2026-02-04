export const OptionsListDom = {
	optionsList: [
		{
			value: "add_noise",
			options: [
				'<p value="uniform_noise"><span class="material-symbols-outlined">view_compact</span><span>Uniform Noise</span></p>',
				'<p value="gaussian_noise"><span class="material-symbols-outlined">filter_hdr</span><span>Gaussian Noise</span></p>',
				'<p value="salt_Papper_noise"><span class="material-symbols-outlined">grain</span><span>Salt & Papper Noise</span></p>',
			],
		},
		{
			value: "filter_noise",
			options: [
				'<p value="average_filter"><span class="material-symbols-outlined">leak_add</span><span>Average Filter</span></p>',
				'<p value="gaussian_filter"><span class="material-symbols-outlined">gradient</span><span>Gaussian Filter</span></p>',
				'<p value="median_filter"><span class="material-symbols-outlined">hdr_weak</span><span>Median Filter</span></p>',
			],
		},
		{
			value: "edge_detection",
			options: [
				'<p value="sobel_filter"><span class="material-symbols-outlined">filter_1</span></span><span>Sobel Filter</span></p>',
				'<p value="roberts_filter"><span class="material-symbols-outlined">filter_2</span><span>Roberts Filter</span></p>',
				'<p value="prewitt_filter"><span class="material-symbols-outlined">filter_3</span></span><span>Prewitt Filter</span></p>',
				'<p value="canny_filter"><span class="material-symbols-outlined">filter_4</span><span>Canny Filter</span></p>',
			],
		},
		{
			value: "analytics",
			options: [
				'<p value="show_histogram"><span class="material-symbols-outlined">leaderboard</span><span>Show Histogram</span></p>',
				'<p value="show_distribution_curve"><span class="material-symbols-outlined">waterfall_chart</span><span>Show Distribution Curve</span></p>',
			],
		},
		{
			value: "equalizer",
			options: [
				'<p value="show_equalizes_histogram"><span class="material-symbols-outlined">full_stacked_bar_chart</span><span>Show Equalizes Histogram</span></p>',
				'<p value="show_cumulative_curve"><span class="material-symbols-outlined">process_chart</span><span>Show Cumulative Curve</span></p>',
			],
		},
		{
			value: "normalizer",
			options: [
				'<p value="show_cumulative_curve"><span class="material-symbols-outlined">process_chart</span><span>Show Cumulative Curve</span></p>',
			],
		},
		{
			value: "thresholding",
			options: [
				'<p value="local_thresholding"><span class="material-symbols-outlined">local_florist</span></span><span>Local Thresholding</span></p>',
				'<p value="gloabal_thresholding"><span class="material-symbols-outlined">wallpaper</span><span>Gloabal Thresholding</span></p>',
			],
		},
		{
			value: "crnr_detection",
			options: [
				'<p value="harris_corner"><span class="material-symbols-outlined">radar</span></span><span>Harris Corner</span></p>',
			],
		},
		{ value: "transformation", options: [] },
		{
			value: "filtering",
			options: [
				'<p value="low_pass_filter"><span class="material-symbols-outlined">filter_drama</span></span><span>Low Pass Filter</span></p>',
				'<p value="high_pass_filter"><span class="material-symbols-outlined">filter_vintage</span><span>High Pass Filter</span></p>',
			],
		},
	],
	hfAcImgs: [
		{
			value: "active_contour_model",
			imgs: [
				'<p><img src="./static/db/images/BdTLBJzC0mwnf62cGHEVS.jpg" alt=""></p>',
				'<p><img src="./static/db/images/gIioxNIGtOkNTGgxOevLU.jpg" alt=""></p>',
				'<p><img src="./static/db/images/Kjd_CZKwFrB10lp1UNWgs.jpg" alt=""></p>',
			],
		},
		{
			value: "hough_transform",
			imgs: [
				'<p><img src="./static/db/images/3c6k7CSVjpkT-DlPSfvE7.jpg" alt=""></p>',
				'<p><img src="./static/db/images/7rsnVDobis18oIm4GCeih.png" alt=""></p>',
				'<p><img src="./static/db/images/AG-K1XrMUCS6kCT2nSwaf.png" alt=""></p>',
				'<p><img src="./static/db/images/cATgJXlAsoGlejt0HJs-f.jpg" alt=""></p>',
				'<p><img src="./static/db/images/foVM38jEGnxeMWbQUTEcb.png" alt=""></p>',
				'<p><img src="./static/db/images/hiH42Qnuy3LBqfTqavPI4.jpg" alt=""></p>',
				'<p><img src="./static/db/images/KE07slJAyejubQsGxTn2I.jpg" alt=""></p>',
				'<p><img src="./static/db/images/VWvk4saigMcsfF-4yO7xy.png" alt=""></p>',
			],
		},
	],
	hfOpt: [
		{
			value: "detect_line",
			options: [
				'<div class="op"><label for="thresld">Threshold</label><input cl="threshold" type="range" name="" id="thresld" min="5" max="100" value="15"><span class="num">15</span></div>',
			],
		},
		{
			value: "detect_circle",
			options: [
				'<div class="op"><label for="thresld">Threshold</label><input cl="threshold" type="range" name="" id="thresld" min="5" max="100" value="15"><span class="num">15</span></div>',
				'<div class="op"><label for="thresld">Max Radius</label><input cl="xradiaus" type="range" name="" id="thresld" min="0" max="200" value="150"><span class="num">15</span></div>',
				'<div class="op"><label for="thresld">Min Radius</label><input cl="yradius" type="range" name="" id="thresld" min="0" max="200" value="100"><span class="num">15</span></div>',
			],
		},
		{
			value: "detect_ellipse",
			options: [
				'<div class="op" style="display:none"><label for="thresld">Threshold</label><input cl="threshold" type="range" name="" id="thresld" min="5" max="100" value="15"><span class="num" hidden>15</span></div>',
			],
		},
	],
	ts4VarThrData: [
		{
			type: "local_thresholding",
			body: `
                    <h3><span class="material-symbols-outlined">inbox_customize</span><span>More Options</span></h3>
                    <div class="var-panel">
                        <div class="ts4-in">
                            <label for="ts4-blk-sz">Block Size</label>
                            <input type="number" id="ts4-blk-sz" value="11">
                        </div>
                        <div class="ts4-in">
                            <label for="ts4-thr-weight">Threshold Weight</label>
                            <input type="number" id="ts4-thr-weight" value="2">
                        </div>
                    </div>
                    <p class="ts4-thr-lcl-submit-btn"><span>Submit</span></p>
`,
		},
		{
			type: "region_growing",
			body: `
                    <h3><span class="material-symbols-outlined">inbox_customize</span><span>More Options</span></h3>
                    <div class="var-panel">
                        <div class="ts4-in">
                            <label for="ts4-blk-sz">SeedX</label>
                            <input type="number" id="ts4-blk-sz" value="50">
                        </div>
                        <div class="ts4-in">
                            <label for="ts4-thr-weight">SeedY</label>
                            <input type="number" id="ts4-thr-weight" value="60">
                        </div>
                    </div>
                    <p class="ts4-thr-lcl-submit-btn"><span>Submit</span></p>
`,
		},
		{
			type: "agglomerative_clustering",
			body: `
                    <h3><span class="material-symbols-outlined">inbox_customize</span><span>More Options</span></h3>
                    <div class="var-panel">
                        <div class="ts4-in">
                            <label for="ts4-blk-sz">N Clusters</label>
                            <input type="number" id="ts4-blk-sz" value="4">
                        </div>
                        <div class="ts4-in">
                            <label for="ts4-thr-weight">K Initial</label>
                            <input type="number" id="ts4-thr-weight" value="20">
                        </div>
                    </div>
                    <p class="ts4-thr-lcl-submit-btn"><span>Submit</span></p>
`,
		},
		{
			type: "k_mean_segmentation",
			body: `
                    <h3><span class="material-symbols-outlined">inbox_customize</span><span>More Options</span></h3>
                    <div class="var-panel">
                        <div class="ts4-in">
                            <label for="ts4-blk-sz">K</label>
                            <input type="number" id="ts4-blk-sz" value="3">
                        </div>
                        <div class="ts4-in">
                            <label for="ts4-thr-weight">Max Iterations</label>
                            <input type="number" id="ts4-thr-weight" value="20">
                        </div>
                    </div>
                    <p class="ts4-thr-lcl-submit-btn"><span>Submit</span></p>
`,
		},
		{
			type: "spectral_thresholding_mod",
			body: `
            <h3><span class="material-symbols-outlined">inbox_customize</span><span>More Options</span></h3>
            <div class="thr-types-opt">
                <p value="hard_thresholding">
                    <span class="material-symbols-outlined">contrast_rtl_off</span>
                    <span>Hard Thresholding</span>
                </p>
                <p value="soft_thresholding">
                    <span class="material-symbols-outlined">low_density</span>
                    <span>Soft Thresholding</span>
                </p>
                <p value="garrote_thresholding">
                    <span class="material-symbols-outlined">line_weight</span>
                    <span>Garrote Thresholding</span>
                </p>
                </div>
                <div class="thr-sp-mode-var" style="display:flex; flex-direction:column;"></div>
`,
		},
	],
	sp4ModeData: [
		{
			type: "hard_thresholding",
			body: `
            <div class="var-panel">
            <div class="ts4-in" style="width:100%">
                <label for="ts4-sp-thr">Threshold</label>
                <input type="number" id="ts4-sp-thr" value="100">
            </div>
        </div>
        <p class="ts4-thr-lcl-submit-btn"><span>Submit</span></p>
    `,
		},
		{
			type: "soft_thresholding",
			body: `
            <div class="var-panel">
                <div class="ts4-in">
                    <label for="ts4-sp-thr">Threshold</label>
                    <input type="number" id="ts4-sp-thr" value="100">
                </div>
                <div class="ts4-in">
                    <label for="ts4-sp-red">Reduction Ratio</label>
                    <input type="number" id="ts4-sp-red" value="0.1">
                </div>
            </div>
            <p class="ts4-thr-lcl-submit-btn"><span>Submit</span></p>
    `,
		},
		{
			type: "garrote_thresholding",
			body: `
            <div class="var-panel">
                <div class="ts4-in">
                    <label for="ts4-sp-thr">Threshold</label>
                    <input type="number" id="ts4-sp-thr" value="100">
                </div>
                <div class="ts4-in">
                    <label for="ts4-sp-red">Reduction Ratio</label>
                    <input type="number" id="ts4-sp-red" value="0.1">
                </div>
            </div>
            <p class="ts4-thr-lcl-submit-btn"><span>Submit</span></p>
    `,
		},
	],
};
