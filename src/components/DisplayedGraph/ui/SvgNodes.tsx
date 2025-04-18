import { Graph } from "../../../shared/graph/interfaces"

const nodeWidth = 140
const nodeHeight = 80
const nodesGap = 30
const containerMargin = 10 // Нужен для корректного отображения границ <rect>-элементов

export function SvgNodes({ graph }: { graph: Graph | null }) {
    if (!graph) {
        return <></>
    }

    return graph.nodes.map((node, ind) => {
        const rectX = containerMargin + ind * (nodeWidth + nodesGap)
        const rectY = containerMargin

        return (
            <g id={ind.toString()}>
                <rect
                    key={ind}
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
    })
}

export function calcViewSize(graph: Graph | null): {
    viewX: number
    viewY: number
} {
    if (!graph) {
        return { viewX: 0, viewY: 0 }
    }

    let viewX =
        graph.nodes.length * nodeWidth +
        (graph.nodes.length - 1) * nodesGap +
        containerMargin * 2
    let viewY = nodeHeight + containerMargin * 2

    return { viewX, viewY }
}
