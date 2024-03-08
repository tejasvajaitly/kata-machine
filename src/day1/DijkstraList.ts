function hasUnvisited(seen: boolean[], dist: number[]): boolean {
    return seen.some((s, i) => !s && dist[i] < Infinity);
}

function getLowestUnvisited(seen: boolean[], dist: number[]): number {
    let idx = -1;
    let lowestDistance = Infinity;

    for (let i = 0; i < seen.length; ++i) {
        if (seen[i]) {
            continue;
        }

        if (dist[i] < lowestDistance) {
            lowestDistance = dist[i];
            idx = i;
        }
    }

    return idx;
}

export default function dijkstra_list(
    source: number,
    sink: number,
    arr: WeightedAdjacencyList,
): number[] {
    const seen = new Array(arr.length).fill(false);
    const dist = new Array(arr.length).fill(Infinity);
    const prev = new Array(arr.length).fill(-1);

    dist[source] = 0;

    while (hasUnvisited(seen, dist)) {
        const curr = getLowestUnvisited(seen, dist);

        seen[curr] = true;

        const adjs = arr[curr];

        for (let i = 0; i < adjs.length; ++i) {
            const edge = adjs[i];
            if (seen[edge.to]) {
                continue;
            }

            const newDistance = dist[curr] + edge.weight;
            if (newDistance < dist[edge.to]) {
                dist[edge.to] = newDistance;
                prev[edge.to] = curr;
            }
        }
    }

    const out: number[] = [];
    let curr = sink;

    while (prev[curr] !== -1) {
        out.push(curr);
        curr = prev[curr];
    }

    out.push(source);
    return out.reverse();
}
