import { Node } from "../../../shared/graph/interfaces"
import { nodeWidth, nodeHeight } from "../model/svgParams"

type SvgNodesParams = {
    nodesPositions: Map<number, { x: number; y: number }>
    graphColumns: Node[][]
}

export function SvgNodes({ nodesPositions, graphColumns }: SvgNodesParams) {
    return graphColumns.map((column, cInd) => (
        <g key={cInd}>
            {column.map((node) => {
                const { x, y } = nodesPositions.get(node.id) || { x: 0, y: 0 }

                return (
                    <g key={node.id} id={`node${node.id.toString()}`}>
                        <rect className="node"
                            x={x}
                            y={y}
                            height={nodeHeight}
                            width={nodeWidth}
                        ></rect>
                        <text className="node-text"
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
