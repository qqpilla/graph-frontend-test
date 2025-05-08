import { Graph, Node } from "../../../../shared/graph/interfaces"
import { sortByWeightedMedianHeuristic } from "./sortByWeightedMedianHeuristic"

export function getGraphColumnsSorted(graph: Graph) {
    return sortByWeightedMedianHeuristic(
        getGraphColumns(graph),
        graph.edges,
    )
}

export function getGraphColumns(graph: Graph) {
    const nodes = graph.nodes.toSorted((nodeA, nodeB) => nodeA.id - nodeB.id)
    const edges = graph.edges

    const columns: Node[][] = []
    let remainingNodesCount = nodes.length

    // Первый столбец графа
    columns.push(
        nodes.filter((node) => !edges.some((edge) => edge.toId === node.id))
    )
    remainingNodesCount -= columns[0].length

    // Остальные столбцы
    let fromColumnInd = 0
    while (remainingNodesCount > 0) {
        const nextColumn: Node[] = []

        columns[fromColumnInd].forEach((fromNode) => {
            const toNodes = nodes.filter((node) =>
                !nextColumn.includes(node) &&
                edges.some(
                    (edge) => edge.fromId === fromNode.id && edge.toId === node.id
                )
            )

            nextColumn.push(...toNodes)
            remainingNodesCount -= toNodes.length
        })

        fromColumnInd++
        columns.push(nextColumn)
    }

    return columns
}
