const dir = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
];

function walk(
    maze: string[],
    end: Point,
    seen: boolean[][],
    path: Point[],
    curr: Point,
    wall: string,
) {
    if (
        curr.x < 0 ||
        curr.x >= maze[0].length ||
        curr.y < 0 ||
        curr.y >= maze.length
    ) {
        return false;
    }

    if (maze[curr.y][curr.x] === wall) {
        return false;
    }

    if (seen[curr.y][curr.x]) {
        return false;
    }

    if (curr.x === end.x && curr.y === end.y) {
        path.push(curr);
        return true;
    }

    path.push(curr);
    seen[curr.y][curr.x] = true;
    for (let i = 0; i < dir.length; ++i) {
        const [x, y] = dir[i];
        if (
            walk(maze, end, seen, path, { x: curr.x + x, y: curr.y + y }, wall)
        ) {
            return true;
        }
    }

    path.pop();

    return false;
}

export default function solve(
    maze: string[],
    wall: string,
    start: Point,
    end: Point,
): Point[] {
    const path: Point[] = [];
    const seen: boolean[][] = [];

    for (let i = 0; i < maze.length; ++i) {
        seen.push(new Array(maze[0].length).fill(false));
    }

    walk(maze, end, seen, path, start, wall);

    return path;
}
