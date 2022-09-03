import './node.css';

const Node = ({isStart, isEnd, isVisited, visited, visitedShortest, col, row, isWall, onMouseDown, onMouseUp, onMouseEnter}) => {
    const extraClass = isStart ? 'startNode' : isEnd ? 'endNode': visited ? 'isVisited' : visitedShortest ? 'shortest' : isWall ? 'node-wall' :'';
    return (
        <div 
            id={`node-${row}-${col}`}
            className={`node ${extraClass}`}
            onMouseDown={() => onMouseDown(row, col)}
            onMouseUp={() => onMouseUp()}
            onMouseEnter={() => onMouseEnter(row, col)}
            >
            
        </div>
    )
}

export default Node;