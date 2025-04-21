import { Node } from "../../../shared/graph/interfaces"
import { nodeWidth, nodeHeight, nodesGap, containerMargin } from "./svgParams"

export function getNodesPositions(graphColumns: Node[][]) {
    const nodesPositions: Map<number, { x: number; y: number }> = new Map()

    graphColumns.forEach((column, cInd) => {
        column.forEach((node, nInd) => {
            const posX = cInd * (nodeWidth + nodesGap) + containerMargin
            const posY = nInd * (nodeHeight + nodesGap) + containerMargin

            nodesPositions.set(node.id, { x: posX, y: posY })
        })
    })

    return nodesPositions
}
