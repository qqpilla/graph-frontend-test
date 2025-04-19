import { Node } from "../../../shared/graph/interfaces"

const nodeWidth = 140
const nodeHeight = 80
const nodesGap = 30
const containerMargin = 10 // Нужен для корректного отображения границ <rect>-элементов

export function SvgNodes({ graphColumns }: { graphColumns: Node[][] }) {
    return graphColumns.map((column, cInd) => {
        return (
            <g key={cInd}>
                {column.map((node, nInd) => {
                    const rectX = cInd * (nodeWidth + nodesGap) + containerMargin
                    const rectY = nInd * (nodeHeight + nodesGap) + containerMargin

                    return (
                        <g key={node.id} id={`node${node.id.toString()}`}>
                            <rect
                                x={rectX}
                                y={rectY}
                                height={nodeHeight}
                                width={nodeWidth}
                                stroke="black"
                                strokeWidth="2px"
                                fill="white"
                            ></rect>
                            <text
                                x={rectX + nodeWidth / 2}
                                y={rectY + nodeHeight / 2}
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
