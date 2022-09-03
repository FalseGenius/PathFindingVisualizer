// const node = {
//     col, 
//     row,
//     isVisited,
//     distance
// };


function Dijkstra (grid, startNode, finishNode) {
    const visitedNodesInOrder = [];
    if (!startNode || !finishNode || startNode === finishNode) return false;
    startNode.distance = 0;
    let unVisitedNodes = getAllNodes(grid);
    while (unVisitedNodes.length > 0) {
        sortNodesByDistance(unVisitedNodes);
        const closestNode = unVisitedNodes.shift();
        if (closestNode.isWall) continue;
        if(closestNode.distance === Infinity) return visitedNodesInOrder;
        closestNode.isVisited = true;
        visitedNodesInOrder.push(closestNode);
        if (closestNode === finishNode) return visitedNodesInOrder;
        updateUnvisitedNeighbors(closestNode, grid);
    }

}


const getAllNodes = (grid) => {
    const nodes = [];
    for (const row of grid) {
        for (const node of row) {
            nodes.push(node);
        }
    }
    return nodes;
}

const sortNodesByDistance = (unVisitedNodes) => {
    return unVisitedNodes.sort((a, b) => a.distance-b.distance);
}

const updateUnvisitedNeighbors = (node, grid) => {
    // console.log(node.previousNode);
    const neighbors = getNeighbors(node, grid);
    for (const neighbor of neighbors) {
        neighbor.distance = node.distance+1;
        neighbor.previousNode = node;
    }
}

const getNeighbors = (node, grid) => {
    let neighbors = [];
    const {col, row} = node;
    if (row-1 >= 0) neighbors.push(grid[row-1][col]);
    if (row + 1 < grid.length) neighbors.push(grid[row+1][col]);
    if (col-1 >= 0) neighbors.push(grid[row][col-1]);
    if (col + 1 < grid[0].length) neighbors.push(grid[row][col+1]);
    return neighbors.filter(neighbor =>!neighbor.isVisited);
}

export function getNodesInShortestPathOrder(finishNode) {
    let nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    // console.log(currentNode);
    while (currentNode !== null) {
        nodesInShortestPathOrder.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    console.log(nodesInShortestPathOrder);
    return nodesInShortestPathOrder;
}

export default Dijkstra;