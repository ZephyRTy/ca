export function mod(n: number, m: number) {
	return ((n % m) + m) % m;
}
const toBit = (n: number) => {
	return n > 0 ? 1 : 0;
};
export function neighborhood(
	grid: number[][],
	row: number,
	col: number,
	env: { row: number; col: number }
) {
	return (
		toBit(grid[row][mod(col + 1, env.col)]) +
		toBit(grid[row][mod(col - 1, env.col)]) +
		toBit(grid[mod(row + 1, env.row)][col]) +
		toBit(grid[mod(row - 1, env.row)][col]) +
		toBit(grid[mod(row + 1, env.row)][mod(col + 1, env.col)]) +
		toBit(grid[mod(row + 1, env.row)][mod(col - 1, env.col)]) +
		toBit(grid[mod(row - 1, env.row)][mod(col + 1, env.col)]) +
		toBit(grid[mod(row - 1, env.row)][mod(col - 1, env.col)])
	);
}
export function neighborhoodWithWall(
	grid: number[][],
	row: number,
	col: number,
	env: { row: number; col: number }
) {
	return (
		toBit(grid[row][col + 1]) +
		toBit(grid[row][col - 1]) +
		toBit(grid[row + 1][col]) +
		toBit(grid[row - 1][col]) +
		toBit(grid[row + 1][col + 1]) +
		toBit(grid[row + 1][col - 1]) +
		toBit(grid[row - 1][col + 1]) +
		toBit(grid[row - 1][col - 1])
	);
}
