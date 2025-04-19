import { Graph, Node } from "../../../shared/graph/interfaces"

export function getGraphColumns(graph: Graph) {
    const columns: Node[][] = []
    let remainingNodesCount = graph.nodes.length

    // Первый столбец графа
    columns.push(
        graph.nodes.filter((node) => !graph.edges.some((edge) => edge.toId === node.id))
    )
    remainingNodesCount -= columns[0].length

    // Остальные столбцы
    let fromColumnInd = 0
    while (remainingNodesCount > 0) {
        const nextColumn: Node[] = []

        columns[fromColumnInd].forEach((fromNode) => {
            const toNodes = graph.nodes.filter((node) =>
                !nextColumn.includes(node) &&
                graph.edges.some(
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
