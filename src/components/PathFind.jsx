import './pathfinding.css';
import Node from './Node/Node';
import {useState, useEffect} from 'react';
import Dijkstra, { getNodesInShortestPathOrder } from './algorithms/Dijkstra';

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;
// const isWall = false;

const getInitialGrid = () => {
    let nodes = [];
        for (let row = 0; row < 20; row++) {
            let r = [];
            for (let col = 0; col < 50; col++) {
                r.push(createNode(row, col));
            }
            nodes.push(r);
        }
    return nodes;
}

const createNode = (row, col) => {
    return {
        col, 
        row,
        isStart: row === START_NODE_ROW && col === START_NODE_COL,
        isEnd: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
        distance: Infinity,
        isVisited: false,
        visited: false,
        visitedShortest: false,
        isWall: false,
        previousNode: null
    }
}

const createNewGridWithWallToggled = (grid, row, col) => {
    const newGrid = grid.slice();
    // console.log(`row = ${row} and col = ${col}`);
    const node = newGrid[row][col];
    const newNode = {
        ...node,
        isWall: !node.isWall
    }
    newGrid[row][col] = newNode;
    return newGrid;
}

const PathFind = () => {
    const [state, setState] = useState({
        grid: [],
        mouseIsPressed: false
    });

    useEffect(() => {
        const grid = getInitialGrid();
        setState({grid: grid, mouseIsPressed: false});
        console.log(grid[10][15]);
    }, []);

    const animateDijkstra = (visitedNodesInOrder, nodesInShortestPathOrder) => {
        for (let i = 0; i <= visitedNodesInOrder.length; i++) {
            if (i === visitedNodesInOrder.length) {
                setTimeout(() => {
                    animateShortestPath(nodesInShortestPathOrder);
                }, 11 * i)
                return;
            }
            setTimeout(() => {
                const node = visitedNodesInOrder[i];
                const newGrid = state.grid.slice();
                const newNode = {
                    ...node,
                    visited: true
                }

                newGrid[node.row][node.col] = newNode;

                setState({grid: newGrid});
            }, 10 * i);
        }
    }

    const animateShortestPath = (nodesInShortestPathOrder) => {
        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
            setTimeout(() => {
                const node = nodesInShortestPathOrder[i];
                const newGrid = state.grid.slice();
                const newNode = {
                    ...node,
                    visitedShortest: true
                }

                newGrid[node.row][node.col] = newNode;

                setState({grid: newGrid});
            }, 11 * i);
        }
    }
    
    const visualizeDijkstra = () => {
        const startNode = state.grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = state.grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNodesInOrder = Dijkstra(state.grid, startNode, finishNode);
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
        console.log(nodesInShortestPathOrder);
        animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
    }

    const handleMouseDown = (row, col) => {
        // console.log(state.grid[row][col]);
        const newGrid = createNewGridWithWallToggled(state.grid, row, col);
        setState({grid: newGrid, mouseIsPressed: true});
    }
    const handleMouseUp = () => {
        setState({grid: state.grid, mouseIsPressed: false});
    }
    const handleMouseEnter = (row, col) => {
        if (!state.mouseIsPressed) return;
        const newGrid = createNewGridWithWallToggled(state.grid, row, col);
        setState({grid: newGrid, mouseIsPressed: state.mouseIsPressed});

      
    }

    const clearScreen = () => {
        const grid = getInitialGrid();
        setState({grid: grid, mouseIsPressed: false});
    }

    return (
        <>
        <buttton className='dbutton' onClick={visualizeDijkstra}>Visualize Dijkstra's Algorithm</buttton>
        <buttton className='dbutton' onClick={clearScreen}>Clear Screen</buttton>
        <div className='grid'>
            {state.grid.map((row, idx) => {
               return <div key={idx}>{
                   row.map((node, i) => 
                {
                    const {isStart, isEnd} = node;
                    return <Node 
                        key={i}
                        isStart={isStart}
                        isEnd={isEnd}
                        isVisited={node.isVisited}
                        visited={node.visited}
                        visitedShortest={node.visitedShortest}
                        mouseIsPressed={state.mouseIsPressed}
                        onMouseDown={() => handleMouseDown(node.row, node.col)}
                        onMouseEnter={() => handleMouseEnter(node.row, node.col)}
                        onMouseUp={() => handleMouseUp()}
                        isWall={node.isWall}
                    />
                }
                )
                }</div>
            })}
        </div>
    </>
    )
}

export default PathFind;