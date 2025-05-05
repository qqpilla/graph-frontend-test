import { Edge } from "../../../shared/graph/interfaces"
import { PositionsMap } from "../model/const/types"
import { nodeWidth, nodeHeight } from "../model/const/svgParams"

type SvgEdgesParams = {
    nodesPositions: PositionsMap
    graphEdges: Edge[]
}

export function SvgEdges({ nodesPositions, graphEdges }: SvgEdgesParams) {
    return (
        <g>
            {graphEdges.map((edge) => {
                const fromCoords = nodesPositions.get(edge.fromId) || { x: 0, y: 0 }
                const toCoords = nodesPositions.get(edge.toId) || { x: 0, y: 0 }

                return (
                    <line className="edge"
                        key={`${edge.fromId}-${edge.toId}`}
                        x1={fromCoords.x + nodeWidth}
                        y1={fromCoords.y + nodeHeight / 2}
                        x2={toCoords.x}
                        y2={toCoords.y + nodeHeight / 2}
                    ></line>
                )
            })}
        </g>
    )
}
