import { Node } from "../../../shared/graph/interfaces"
import { nodeWidth, nodeHeight } from "../model/const/svgParams"
import type { DragParams, PositionsMap } from "../model/const/types";

type SvgNodesParams = {
    nodesPositions: PositionsMap
    graphColumns: Node[][]
    startNodeDrag: ({ nodeId, startNodePos, startCursorPos }: DragParams) => void
}

export function SvgNodes({
    nodesPositions,
    graphColumns,
    startNodeDrag
}: SvgNodesParams) {
    return graphColumns.map((column, cInd) => (
        <g key={cInd}>
            {column.map((node) => {
                const { x, y } = nodesPositions.get(node.id) || { x: 0, y: 0 }

                return (
                    <g key={node.id} id={`node${node.id.toString()}`}>
                        <rect
                            className="node-rect"
                            x={x}
                            y={y}
                            height={nodeHeight}
                            width={nodeWidth}
                            onMouseDown={(event) => {
                                event.preventDefault()
                                startNodeDrag({
                                    nodeId: node.id,
                                    startNodePos: { x, y },
                                    startCursorPos: {
                                        x: event.clientX,
                                        y: event.clientY,
                                    },
                                })
                            }}
                        ></rect>
                        <text
                            className="node-text"
                            x={x + nodeWidth / 2}
                            y={y + nodeHeight / 2}
                        >
                            {node.name}
                        </text>
                    </g>
                )
            })}
        </g>
    ))
}

