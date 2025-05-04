import { Node, Edge } from "../../../shared/graph/interfaces"
import { useGraphContext } from "../../../shared/graph"
import { useMemo, useState, useEffect, useCallback, useRef } from "react"
import { getGraphColumnsSorted } from "./getGraphColumns"
import { getNodesPositions } from "./getNodesPositions"
import { calcViewSize, calcGraphWidth } from "./calcViewSize"

export function useCurrentGraph(): [Node[][], Edge[]] {
    const { currentGraph } = useGraphContext()

    const graphColumns = useMemo(
        () => (currentGraph ? getGraphColumnsSorted(currentGraph) : []),
        [currentGraph]
    )

    return [graphColumns, currentGraph?.edges || []]
}

type PositionsMap = Map<number, {x: number, y: number}>

export function useNodesPositions(graphColumns: Node[][], viewWidth: number): [
    PositionsMap,
    (nodeId: number, newPos: { x: number, y: number }) => void
] {
    const [nodesPositions, setNodesPositions] = useState<PositionsMap>(new Map())

    useEffect(() => {
        const positions = getNodesPositions(graphColumns)
        const graphWidth = calcGraphWidth(graphColumns.length)

        // Центрируем граф по горизонтали
        if (graphWidth < viewWidth) {
            const offset = viewWidth / 2 - graphWidth / 2
            positions.forEach((pos, key) => {
                positions.set(key, { x: pos.x + offset, y: pos.y })
            })
        }

        setNodesPositions(positions)
    }, [graphColumns])

    const setNodePosition = useCallback(
        (nodeId: number, newPos: { x: number; y: number }) => {
            setNodesPositions((prevPositions) => {
                const newPositions = new Map(prevPositions)
                newPositions.set(nodeId, newPos)
                return newPositions
            })
        },
        []
    )

    return [nodesPositions, setNodePosition]
}

export function useCalcViewSize(graphColumns: Node[][]): {
    viewX: number
    viewY: number
} {
    const containerSize = useRef<{ x: number; y: number } | null>(null)

    useEffect(() => {
        const graphContainer = document.getElementById("graph-container")
        if (graphContainer) {
            containerSize.current = {
                x: graphContainer.clientWidth,
                y: graphContainer.clientHeight
            }
        }
    }, [])

    const {viewX, viewY} = useMemo(() => calcViewSize(graphColumns), [graphColumns])
  
    if (containerSize.current) {
        return {
            viewX: Math.max(containerSize.current.x, viewX),
            viewY: Math.max(containerSize.current.y, viewY)
        }
    }

    return { viewX, viewY }
}
