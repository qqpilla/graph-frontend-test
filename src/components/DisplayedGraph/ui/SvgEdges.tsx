import { useGraphContext } from "../../../shared/graph"

type SvgEdgesParams = {
    nodesCenters: Map<number, { x: number; y: number }>
}

export function SvgEdges({ nodesCenters }: SvgEdgesParams) {
    const { currentGraph } = useGraphContext()

    return currentGraph?.edges.map((edge) => {
        const fromCoords = nodesCenters.get(edge.fromId)
        const toCoords = nodesCenters.get(edge.toId)

        return (
            <line
                key={`${edge.fromId}-${edge.toId}`}
                x1={fromCoords?.x}
                y1={fromCoords?.y}
                x2={toCoords?.x}
                y2={toCoords?.y}
                stroke="black"
            ></line>
        )
    })
}
