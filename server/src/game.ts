import { placePiece } from "./data/boards/boards";
import { iBoard, Mark, Status } from "./data/boards/types";
import { iUser } from "./data/users/types";

/*
*    To win, a user should have all their pieces either on the same
*    row or on the same column.
*    Another way to win (diagonally) is to have all the pieces on
*    cells with equal row index ([0,0], [1,1], [2,2]), or to have
*    pieces on the following cells: [2,0], [1,1], [0,2].
*/
function checkWon (
    moves: (iUser | null)[][],
    rowNum: number,
    columnNum: number)
: boolean {
    /*
    *   Notice that were checking that one of the values is
    *   not null, otherwise we might get a false positive
    */

    // Same row
    if (moves[rowNum][0] !== null &&
        moves[rowNum][0]?.mark === moves[rowNum][1]?.mark &&
        moves[rowNum][0]?.mark === moves[rowNum][2]?.mark) {
        return true;
    }

    // Same column
    if (moves[0][columnNum] !== null &&
        moves[0][columnNum]?.mark === moves[1][columnNum]?.mark &&
        moves[0][columnNum]?.mark === moves[2][columnNum]?.mark) {
        return true;
    }

    // First diagonal (equal indexes)
    if (moves[0][0] !== null &&
        moves[0][0]?.mark === moves[1][1]?.mark &&
        moves[0][0]?.mark === moves[2][2]?.mark) {
        return true;
    }

    // Second diagonal ([2,0], [1,1], [0,2] pattern)
    if (moves[0][2] !== null &&
        moves[0][2]?.mark === moves[1][1]?.mark &&
        moves[0][2]?.mark === moves[2][0]?.mark) {
        return true;
    }

    return false;
}

export function makeMove (
    boardId: string,
    user: iUser,
    rowNum: number,
    columnNum: number)
: iBoard {
    // Accessing data layer
    const board = placePiece(boardId, user, rowNum, columnNum);

    const hasWon = checkWon(board.moves, rowNum, columnNum);

    if (hasWon) {
        if (user.mark === Mark.X) {
            board.status = Status.xWON;
        } else {
            board.status = Status.oWON;
        }

        board.winner = user.mark;
        return board;
    }

    /*
    *   If no one has won and 9 moves has already been made,
    *   declare a tie
    */
    if (board.countMoves === 9) {
        board.status = Status.TIE;
    }

    return board;
}
