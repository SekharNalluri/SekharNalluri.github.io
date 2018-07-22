

function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    renderSquare(i, j) {
        return (
            <Square
                value={this.props.squares[i][j]}
                onClick={() => this.props.onClick(i, j)}
            />
        );
    }

    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0, 0)}
                    {this.renderSquare(0, 1)}
                    {this.renderSquare(0, 2)}
                    {this.renderSquare(0, 3)}
                    {this.renderSquare(0, 4)}
                    {this.renderSquare(0, 5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(1, 0)}
                    {this.renderSquare(1, 1)}
                    {this.renderSquare(1, 2)}
                    {this.renderSquare(1, 3)}
                    {this.renderSquare(1, 4)}
                    {this.renderSquare(1, 5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(2, 0)}
                    {this.renderSquare(2, 1)}
                    {this.renderSquare(2, 2)}
                    {this.renderSquare(2, 3)}
                    {this.renderSquare(2, 4)}
                    {this.renderSquare(2, 5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3, 0)}
                    {this.renderSquare(3, 1)}
                    {this.renderSquare(3, 2)}
                    {this.renderSquare(3, 3)}
                    {this.renderSquare(3, 4)}
                    {this.renderSquare(3, 5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(4, 0)}
                    {this.renderSquare(4, 1)}
                    {this.renderSquare(4, 2)}
                    {this.renderSquare(4, 3)}
                    {this.renderSquare(4, 4)}
                    {this.renderSquare(4, 5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(5, 0)}
                    {this.renderSquare(5, 1)}
                    {this.renderSquare(5, 2)}
                    {this.renderSquare(5, 3)}
                    {this.renderSquare(5, 4)}
                    {this.renderSquare(5, 5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6, 0)}
                    {this.renderSquare(6, 1)}
                    {this.renderSquare(6, 2)}
                    {this.renderSquare(6, 3)}
                    {this.renderSquare(6, 4)}
                    {this.renderSquare(6, 5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(7, 0)}
                    {this.renderSquare(7, 1)}
                    {this.renderSquare(7, 2)}
                    {this.renderSquare(7, 3)}
                    {this.renderSquare(7, 4)}
                    {this.renderSquare(7, 5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(8, 0)}
                    {this.renderSquare(8, 1)}
                    {this.renderSquare(8, 2)}
                    {this.renderSquare(8, 3)}
                    {this.renderSquare(8, 4)}
                    {this.renderSquare(8, 5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(9, 0)}
                    {this.renderSquare(9, 1)}
                    {this.renderSquare(9, 2)}
                    {this.renderSquare(9, 3)}
                    {this.renderSquare(9, 4)}
                    {this.renderSquare(9, 5)}
                </div>

            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(10).fill().map(() => []),
            xIsNext: true
        };
    }

    componentDidUpdate() {

        let squares = checkExplosion(this.state.squares);

        if (squares) {
            this.setState({ ...this.state, squares: squares });
        } else {
            let status = checkforWinner(this.state.squares);
            if (status) {
                if(!(this.state.status && this.state.status === status))
                this.setState({ ...this.state, status: status });
            }
        }


    }

    handleClick(i, j) {
        console.log(i + "-" + j);
        const squares = this.state.squares.slice();
        const currentplayer = this.state.xIsNext ? 'X' : 'O';
        //check owner and return if not owner
        if (squares[i][j] && squares[i][j].split("-")[0] !== currentplayer) {
            return;
        }

        if (checkforWinner(squares)) {
            return;
        }


        //Move queued
        if (squares[i][j]) {
            let strArr = squares[i][j].split("-");
            squares[i][j] = strArr[0] + "-" + (Number(strArr[1]) + 1);
        } else {
            squares[i][j] = currentplayer + "-" + "1";
        }

        //Check for explosion and verify winner is handled in componentDidUpdate




        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
        });
    }

    render() {

        const current = this.state.squares;

        let status = this.state.status? this.state.status : 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');


        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current}
                        onClick={(i, j) => this.handleClick(i, j)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);


function checkExplosion(square) {


    let squares = square.slice();

    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 6; j++) {
            if (squares[i][j]) {

                let value = Number(squares[i][j].split("-")[1]);
                let owner = squares[i][j].split("-")[0];
                //coners egdes and rest in order
                if ((i == 0 || i == 9) && (j == 0 || j == 5)) {
                    if (value >= 2) {
                        changeExlodedStates(squares, i, j);
                        return squares;
                    }
                } else if ((i == 0 || i == 9) || (j == 0 || j == 5)) {
                    if (value >= 3) {
                        changeExlodedStates(squares, i, j);
                        return squares;
                    }
                } else {
                    if (value >= 4) {
                        changeExlodedStates(squares, i, j);
                        return squares;
                    }
                }
            }
        }
    }
    return null;
}



function checkforWinner(square) {

    let squares = square.slice();
    let count = 0, xCount = 0, oCount = 0;

    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 6; j++) {
            if (squares[i][j]) {
                count = count + 1;
                if (squares[i][j].split("-")[0] == "X")
                    xCount = xCount + 1;
                else
                    oCount = oCount + 1;
            }
        }
    }

    console.log(count);
    if (xCount == 0 && count >= 2)
        return "O is Winner"
    if (oCount == 0 && count >= 2)
        return "X is Winner"

    return null;

}


function changeExlodedStates(squares, i, j) {

    let value = Number(squares[i][j].split("-")[1]);
    let owner = squares[i][j].split("-")[0];

    squares[i][j] = null;

    if (j + 1 < 6) {

        if (squares[i][j + 1])
            squares[i][j + 1] = owner + "-" + (Number(squares[i][j + 1].split("-")[1]) + 1);
        else
            squares[i][j + 1] = owner + "-" + 1;
    }

    if (j - 1 > -1) {
        if (squares[i][j - 1])
            squares[i][j - 1] = owner + "-" + (Number(squares[i][j - 1].split("-")[1]) + 1);
        else
            squares[i][j - 1] = owner + "-" + 1;
    }

    if (i - 1 > -1) {
        if (squares[i - 1][j])
            squares[i - 1][j] = owner + "-" + (Number(squares[i - 1][j].split("-")[1]) + 1);
        else
            squares[i - 1][j] = owner + "-" + 1;

    }

    if (i + 1 < 10) {
        if (squares[i + 1][j])
            squares[i + 1][j] = owner + "-" + (Number(squares[i + 1][j].split("-")[1]) + 1);
        else
            squares[i + 1][j] = owner + "-" + 1;
    }
}
