interface IRule {
	(
		grid: number[][],
		row: number,
		col: number,
		env: { row: number; col: number }
	): boolean;
}

interface IAction {
	(grid: number[][], row: number, col: number): void;
}
export class Rule {
	private rule: IRule;
	private action: IAction;
	constructor(rule: IRule, action: IAction) {
		this.rule = rule;
		this.action = action;
	}

	judge(
		grid: number[][],
		row: number,
		col: number,
		env: { row: number; col: number }
	) {
		return this.rule(grid, row, col, env);
	}

	applyAction(grid: number[][], row: number, col: number) {
		this.action(grid, row, col);
	}
}
