import './index.css';
import { Rule } from './rules';
import { neighborhood } from './utils';
function fill(arr: number[], value: number) {
	for (let i = 0; i < arr.length; i++) {
		arr[i] = value;
	}
	return arr;
}
const randomColor = () => {
	const r = Math.floor(Math.random() * 255);
	const g = Math.floor(Math.random() * 255);
	const b = Math.floor(Math.random() * 255);
	return `rgb(${r}, ${g}, ${b})`;
};
let arr = [];
let tempArr = [];
for (let i = 0; i < 256; i++) {
	arr.push(randomColor());
}
const randomColorArray = (value: number, tick: number) => {
	tempArr.push(randomColor());
	if (tick % 256 === 0 && tick !== 0) {
		arr = tempArr;
		tempArr = [];
	}
	if (value < 0) {
		return 'white';
	}
	return arr[value];
};
const getColor = (value: number) => {
	if (value < -1) {
		return 'white';
	}
	switch (value) {
		case 1:
			return '#b5c1cf';
		case 2:
			return '#3a89b0';
		case 3:
			return '#7991d1';
		case 4:
			return '#17507d';
		case 5:
			return '#3c5e91';
		case 6:
			return '#88d5b9';
		default:
			return '#8c90b9';
	}
};
class cellularAutomata {
	private row: number;
	private col: number;
	private grid: number[][];
	private tempGrid: number[][];
	private rules: Rule[];
	private tick = 0;
	private id = null;
	private canvas: HTMLCanvasElement = document.querySelector('#canvas')!;
	private fps = 10;
	private size = 4;
	constructor(row: number, col: number, rules: Rule[]) {
		this.row = row;
		this.col = col;
		this.rules = rules;
		this.grid = fill(new Array(row), 0).map(() => fill(new Array(col), 0));
		this.canvas.width = col * this.size;
		this.canvas.height = row * this.size;
		this.tempGrid = fill(new Array(row), 0).map(() =>
			fill(new Array(col), 0)
		);
		this.init();
		//this.initCanvas();
		this.canvasPrint();
	}

	private canvasInit() {
		this.canvas.width = this.col * this.size;
		this.canvas.height = this.row * this.size;
	}
	init() {
		this.grid[this.row / 2][this.col / 2] = 1;
		this.grid[this.row / 2][this.col / 2 + 1] = 1;
		this.grid[this.row / 2][this.col / 2 - 1] = 1;
		this.grid[this.row / 2 + 1][this.col / 2] = 1;
		this.grid[this.row / 2 - 1][this.col / 2] = 1;

		const run = document.querySelector('#run')!;
		if (run) {
			run.addEventListener('click', () => {
				this.run();
			});
		}
		const stop = document.querySelector('#stop')!;
		if (stop) {
			stop.addEventListener('click', () => {
				this.stop();
			});
		}
		const next = document.querySelector('#next')!;
		if (next) {
			next.addEventListener('click', () => {
				this.next();
			});
		}
	}

	private update() {
		for (let i = 0; i < this.row; i++) {
			for (let j = 0; j < this.col; j++) {
				if (this.grid[i][j] !== 0) {
					this.grid[i][j] += 1;
				}
				this.tempGrid[i][j] = this.grid[i][j];
				for (let rule of this.rules) {
					if (
						rule.judge(this.grid, i, j, {
							row: this.row,
							col: this.col
						})
					) {
						rule.applyAction(this.tempGrid, i, j);
					}
				}
			}
		}
		let temp = this.grid;
		this.grid = this.tempGrid;
		this.tempGrid = temp;
	}

	private canvasPrint() {
		const context = this.canvas.getContext('2d')!;
		for (let i = 0; i < this.row; i++) {
			for (let j = 0; j < this.col; j++) {
				if (this.grid[i][j] !== 0) {
					context.fillStyle = randomColorArray(
						this.grid[i][j],
						this.tick
					);
					context.fillRect(
						j * this.size + 1,
						i * this.size + 1,

						this.size,
						this.size
					);
				} else {
					context.fillStyle = 'white';
					context.fillRect(
						j * this.size + 1,
						i * this.size + 1,

						this.size,
						this.size
					);
				}
			}
		}
	}

	run() {
		if (this.id) {
			return;
		}
		this.id = setInterval(() => {
			this.next();
		}, 1000 / this.fps);
	}

	stop() {
		if (!this.id) {
			return;
		}
		clearInterval(this.id);
		this.id = null;
	}
	next() {
		this.update();
		this.canvasPrint();
		++this.tick;
		document.querySelector('#tick')!.innerHTML = this.tick.toString();
	}
}
// 过于拥挤导致死亡
const rule1 = new Rule(
	(grid, row, col, env) => {
		if (grid[row][col] > 0 && grid[row][col] <= 5) {
			let sum = neighborhood(grid, row, col, env);
			if (sum >= 5 || sum <= 1) {
				return true;
			}
		}
		return false;
	},
	(grid, row, col) => {
		grid[row][col] = -1;
	}
);

const rule2 = new Rule(
	(grid, row, col, env) => {
		if (grid[row][col] === 0) {
			let n = neighborhood(grid, row, col, env);
			if (n === 3 || n === 2) {
				return true;
			}
		}
		return false;
	},
	(grid, row, col) => {
		grid[row][col] = 1;
	}
);
// 产生新元胞
const rule3 = new Rule(
	(grid, row, col, env) => {
		if (grid[row][col] === 0) {
			let sum = neighborhood(grid, row, col, env);
			if (sum >= 2 && sum <= 3) {
				let random = Math.floor(Math.random() * 100);
				if (random > 50) {
					return false;
				}

				return true;
			} else if (sum >= 4 && sum <= 6) {
				let random = Math.floor(Math.random() * 100);
				if (random > 15) {
					return false;
				}
				return true;
			}
		}
		return false;
	},
	(grid, row, col) => {
		grid[row][col] = 1;
	}
);

// 元胞达到寿命上限，死亡
const rule4 = new Rule(
	(grid, row, col, env) => {
		if (grid[row][col] >= 6) {
			return true;
		}
		return false;
	},
	(grid, row, col) => {
		grid[row][col] = -32;
	}
);

const rule5 = new Rule(
	(grid, row, col, env) => {
		if (row <= 1 || col <= 1) return false;
	},
	(grid, row, col) => {
		grid[row][col] = 0;
	}
);

const rule6 = new Rule(
	(grid, row, col, env) => {
		if (grid[row][col] > 0) {
			const n = env.col + env.row;
			let t = Math.abs(row - env.row) + Math.abs(col - env.col);
			const random = Math.floor(Math.random() * n);
			if (random < t - 250) {
				return true;
			}
		}
		return false;
	},
	(grid, row, col) => {
		grid[row][col] = 0;
	}
);
const ca = new cellularAutomata(200, 200, [rule1, rule2, rule4]);
