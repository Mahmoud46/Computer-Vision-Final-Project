export function addCmlCurve(x, y) {
	const config = { responsive: true };
	let trace1 = {
			type: "scatter",
			mode: "lines",
			x: x,
			y: y,
			line: { color: "#24b5ff" },
		},
		new_data = [trace1],
		new_layout = {
			paper_bgcolor: "#00010000",
			plot_bgcolor: "#00010000",
			showlegend: false,
			margin: {
				l: 30,
				r: 30,
				b: 30,
				t: 30,
				pad: 1,
			},
			xaxis: {
				range: ["2016-07-01", "2017-02-01"],
				type: "data",
				title: "Values",
				showgrid: false,
			},
			yaxis: {
				autorange: true,
				type: "linear",
				title: "Number of Pixels",
				showgrid: false,
			},
			height: 400,
			width: 750,
			font: { color: "#24b5ff", size: "7" },
		};
	Plotly.newPlot("cml-curve", new_data, new_layout, config);
}

export function addEqHistogram(x, y) {
	const config = { responsive: true };
	let barChartTrace1 = {
			x: x,
			y: y,
			type: "bar",
			marker: {
				color: "#24b5ff",
			},
		},
		barChartData = [barChartTrace1],
		layout = {
			barmode: "stack",
			paper_bgcolor: "#00010000",
			plot_bgcolor: "#00010000",
			showlegend: false,
			margin: {
				l: 30,
				r: 30,
				b: 30,
				t: 30,
				pad: 1,
			},
			font: { color: "#24b5ff" },
			xaxis: {
				type: "data",
				title: "Values",
				showgrid: false,
			},
			yaxis: {
				autorange: true,
				type: "linear",
				title: "Number of Pixels",
				showgrid: false,
			},
			height: 400,
			width: 750,
			font: { color: "#24b5ff", size: "7" },
		};
	Plotly.newPlot("eq-histogram", barChartData, layout, config);
}

export function addHistogram(x, y) {
	const config = { responsive: true };
	let barChartTrace1 = {
			x: x,
			y: y,
			type: "bar",
			marker: {
				color: "#24b5ff",
			},
		},
		barChartData = [barChartTrace1],
		layout = {
			barmode: "stack",
			paper_bgcolor: "#00010000",
			plot_bgcolor: "#00010000",
			showlegend: false,
			margin: {
				l: 30,
				r: 30,
				b: 30,
				t: 30,
				pad: 1,
			},
			font: { color: "#24b5ff" },
			xaxis: {
				type: "data",
				title: "Values",
				showgrid: false,
			},
			yaxis: {
				autorange: true,
				type: "linear",
				title: "Number of Pixels",
				showgrid: false,
			},
			height: 400,
			width: 750,
			font: { color: "#24b5ff", size: "7" },
		};
	Plotly.newPlot("histogram", barChartData, layout, config);
}

export function addDistriubtionGraph(x, y) {
	const config = { responsive: true };
	let trace1 = {
			type: "scatter",
			mode: "lines",
			x: x,
			y: y,
			line: { color: "#24b5ff" },
		},
		new_data = [trace1],
		new_layout = {
			paper_bgcolor: "#00010000",
			plot_bgcolor: "#00010000",
			showlegend: false,
			margin: {
				l: 30,
				r: 30,
				b: 30,
				t: 30,
				pad: 1,
			},
			xaxis: {
				range: ["2016-07-01", "2017-02-01"],
				type: "data",
				title: "Values",
				showgrid: false,
			},
			yaxis: {
				autorange: true,
				type: "linear",
				title: "Number of Pixels",
				showgrid: false,
			},
			height: 400,
			width: 750,
			font: { color: "#24b5ff", size: "7" },
		};
	Plotly.newPlot("distrobution_graph", new_data, new_layout, config);
}
