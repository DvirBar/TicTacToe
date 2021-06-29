export function initMoves (): null[][] {
    const moves = [];
    for (let i = 0; i <= 2; i++) {
        const columns = [];
        for (let j = 0; j <= 2; j++) {
            columns.push(null);
        }

        moves.push(columns);
    }

    return moves;
}
