import { v4 as uuid } from "uuid";
import { removeFromObject } from "../../utils/object";
import { iUser } from "../users/types";
import { BoardsList, iBoard, Status, Mark } from "./types";
import { findUserById } from "../users/users";
import { initMoves } from "./utils";

interface NewBoardDetails {
    boardId: string
    board: iBoard
}

export const boards: BoardsList = {};

export function createBoard (name: string, userId: string): NewBoardDetails {
    const user = findUserById(userId);

    if (user) {
        // Default user mark is assigned to the board creator
        user.mark = Mark.X;

        const board: iBoard = {
            owner: user,
            name,
            moves: initMoves(),
            countMoves: 0,
            turn: Mark.X
        };

        const boardId = uuid();
        boards[boardId] = board;

        return {
            boardId,
            board
        };
    }

    throw new Error(`No user was found with id: ${userId}`);
}

export function findBoardById (id: string): iBoard | undefined {
    return boards[id];
}

export function joinBoard (userId: string, boardId: string): iBoard {
    const user = findUserById(userId);

    if (user) {
        const board = findBoardById(boardId);

        // We set the joining user as a guest and assign them with an "O" mark
        if (board) {
            board.guest = {
                id: userId,
                mark: Mark.O
            };
            board.status = Status.Playing;

            return board;
        }

        throw new Error(`No board with id: ${boardId} was found`);
    }

    throw new Error(`No user with id: ${userId} was found`);
}

export function placePiece (boardId: string, user: iUser, rowNum: number, columnNum: number): iBoard {
    const board = findBoardById(boardId);

    if (board) {
        // We should check that a move hasn't already been made for this cell
        if (!board.moves[rowNum][columnNum]) {
            // Switching turns
            if (user.mark === Mark.X) {
                board.turn = Mark.O;
            } else {
                board.turn = Mark.X;
            }

            /* Incrementing moves - counting moves is important for us
                so we know when there is a tie */
            board.countMoves++;

            // Place the user piece on the board
            board.moves[rowNum][columnNum] = user;

            return board;
        }

        return board;
    }

    throw new Error(`No board with id: ${boardId} was found`);
}

export function deleteBoard (id: string): BoardsList {
    const filteredBoards = removeFromObject(boards, id);

    return filteredBoards as BoardsList;
}
