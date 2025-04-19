import { Node } from "../../../shared/graph/interfaces"
import { SvgEdges } from "./SvgEdges"

const nodeWidth = 140
const nodeHeight = 70
const nodesGap = 40
const containerMargin = 10 // Нужен для корректного отображения границ <rect>-элементов

type graphColumnsParams = {
    graphColumns: Node[][]
}

export function SvgNodes({ graphColumns }: graphColumnsParams) {
    const nodesCenters: Map<number, { x: number; y: number }> = new Map()

    const nodes = graphColumns.map((column, cInd) => {
        return (
            <g key={cInd}>
                {column.map((node, nInd) => {
                    const rectX = cInd * (nodeWidth + nodesGap) + containerMargin
                    const rectY = nInd * (nodeHeight + nodesGap) + containerMargin
                    const rectCenterX = rectX + nodeWidth / 2
                    const rectCenterY = rectY + nodeHeight / 2

                    nodesCenters.set(node.id, { x: rectCenterX, y: rectCenterY })

                    return (
                        <g key={node.id} id={`node${node.id.toString()}`}>
                            <rect
                                x={rectX}
                                y={rectY}
                                height={nodeHeight}
                                width={nodeWidth}
                                stroke="black"
                                strokeWidth="2px"
                                rx="30px"
                                ry="50px"
                                fill="white"
                            ></rect>
                            <text
                                x={rectCenterX}
                                y={rectCenterY}
                                textAnchor="middle"
                                dominantBaseline="middle"
                            >
                                {node.name}
                            </text>
                        </g>
                    )
                })}
            </g>
        )
    })

    return (
        <>
            <SvgEdges nodesCenters={nodesCenters} />
            {nodes}
        </>
    )
}

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
    let viewY = graphYSize * nodeHeight + (graphYSize - 1) * nodesGap + containerMargin * 2

    return { viewX, viewY }
}
