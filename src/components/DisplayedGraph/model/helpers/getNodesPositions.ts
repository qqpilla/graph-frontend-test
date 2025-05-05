import { Node } from "../../../../shared/graph/interfaces"
import { PositionsMap } from "../const/types";
import { 
    nodeWidth, 
    nodeHeight, 
    nodesGap, 
    containerMargin 
} from "../const/svgParams"

export function getNodesPositions(graphColumns: Node[][]) {
    const nodesPositions: PositionsMap = new Map()

    graphColumns.forEach((column, cInd) => {
        column.forEach((node, nInd) => {
            const posX = cInd * (nodeWidth + nodesGap) + containerMargin
            const posY = nInd * (nodeHeight + nodesGap) + containerMargin

            nodesPositions.set(node.id, { x: posX, y: posY })
        })
    })

    return nodesPositions
}
