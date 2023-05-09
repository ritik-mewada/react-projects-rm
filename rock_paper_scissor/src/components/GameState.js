import React from "react";

const stateMessages = {
    win: "You won!",
    lose: "You lost!",
    draw: "You draw!",
};

const GameState = ({ state, userChoice, computerChoice, clicked }) => {
    return (
        <div onClick={clicked} className={`game-state ${state}`}>
            <div>
                <div className="game-state-content">
                    <p>{userChoice}</p>
                    <p>{stateMessages[state]}</p>
                    <p>{computerChoice}</p>
                </div>
            </div>
        </div>
    );
};

export default GameState;
