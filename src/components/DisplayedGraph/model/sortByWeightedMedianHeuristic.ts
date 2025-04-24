import { Edge, Node } from "../../../shared/graph/interfaces"

type sortByWeightedMedianHeuristicParams = {
    graphColumns: Node[][]
    graphEdges: Edge[]
    numIterations?: number
}

// Алгоритм описан в статье:
// IEEE TRANSACTIONS ON SOFTWARE ENGINEERING, VOL. 19, NO. 3, MARCH 1993
// "A Technique for Drawing Directed Graphs"
// Emden R. Gansner, Eleftherios Koutsofios, Stephen C. North, and Kiem-Phong Vo
export function sortByWeightedMedianHeuristic({
    graphColumns,
    graphEdges,
    numIterations = 1,
}: sortByWeightedMedianHeuristicParams): Node[][] {

    const columnPass = (cInd: number, prevCInd: number) => {
        const medians: Map<number, number> = new Map()

        graphColumns[cInd].forEach((node) => {
            const nodeMedian = calculateMedianPosition(
                node.id,
                graphColumns[prevCInd],
                graphEdges
            )
            medians.set(node.id, nodeMedian)
        })

        graphColumns[cInd].sort(
            (nodeA, nodeB) => medians.get(nodeA.id)! - medians.get(nodeB.id)!
        )
    }

    for (let iteration = 0; iteration < numIterations; iteration++) {
        for (let cInd = 1; cInd < graphColumns.length; cInd++) {
            columnPass(cInd, cInd - 1)
        }
        for (let cInd = graphColumns.length - 2; cInd >= 0; cInd--) {
            columnPass(cInd, cInd + 1)
        }
    }

    return graphColumns
}

function calculateMedianPosition(
    nodeId: number,
    neighbours: Node[],
    graphEdges: Edge[]
): number {
    
    // Индексы (позиции) узлов в соседней колонке, связанных с текущим узлом
    const adjPositions: number[] = []
    neighbours.forEach((neighbour, ind) => {
        if (
            graphEdges.some(
                (edge) =>
                    (edge.fromId === neighbour.id && edge.toId === nodeId) ||
                    (edge.toId === neighbour.id && edge.fromId === nodeId)
            )
        ) {
            adjPositions.push(ind)
        }
    })

    const posLength = adjPositions.length
    const medianInd = Math.floor(posLength / 2)

    if (posLength === 0) {
        return 0
    }

    if (posLength % 2 === 1) {
        return adjPositions[medianInd]
    }

    if (posLength === 2) {
        return (adjPositions[0] + adjPositions[1]) / 2
    }

    let firstMedian = adjPositions[medianInd - 1]
    let secondMedian = adjPositions[medianInd]

    let upperDistance = firstMedian - adjPositions[0]
    let lowerDistance = adjPositions[posLength - 1] - secondMedian

    return (
        (firstMedian * lowerDistance + secondMedian * upperDistance) /
        (lowerDistance + upperDistance)
    )
}
