import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface GameSlice {
    gameType: string | null;
    score: number | null;
}

const initialState: GameSlice = {
    gameType: null,
    score: null,
};

const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        setDifficultyLavel: (state, action: PayloadAction<{gameType: string}>) => {
            state.gameType = action.payload.gameType;
            console.log('====================================');
            console.log(action.payload);
            console.log('====================================');
        },
        setGameScore: (state, action: PayloadAction<{score: number}>) => {
            state.score = action.payload.score
        }
    },
});

export const {setDifficultyLavel, setGameScore} = gameSlice.actions;
export default gameSlice.reducer;