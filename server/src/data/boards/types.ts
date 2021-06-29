import { iUser } from "../users/types";

export enum Mark {
    X = "X",
    O = "O",
}

export enum Status {
    xWON = "X won",
    oWON = "O won",
    TIE = "Tie",
    Playing = "Playing",
}

export interface iBoard {
    name: string;
    owner: iUser;
    guest?: iUser;
    moves: (iUser | null)[][];
    countMoves: number;
    status?: Status;
    turn: Mark;
    winner?: Mark;
}

export interface BoardsList {
    [boardId: string]: iBoard
}
