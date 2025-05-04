import { Node } from "../../../shared/graph/interfaces"
import { nodeWidth, nodeHeight, nodesGap, containerMargin } from "./svgParams"

export function calcViewSize(graphColumns: Node[][]): {
    viewX: number
    viewY: number
} {
    let graphXSize = graphColumns.length
    let graphYSize = 0
    graphColumns.forEach((column) => {
        graphYSize = Math.max(graphYSize, column.length)
    })

    let viewX = graphXSize * nodeWidth + (graphXSize - 1) * nodesGap + containerMargin * 2
    let viewY =
        graphYSize * nodeHeight + (graphYSize - 1) * nodesGap + containerMargin * 2

    return { viewX, viewY }
}

export function calcGraphWidth(graphColumnsLength: number) {
    return (
        nodeWidth * graphColumnsLength +
        nodesGap * (graphColumnsLength - 1) +
        containerMargin * 2
    ) 
}