import { Node } from "../../../../shared/graph/interfaces"
import { useState, useEffect, useCallback } from "react"
import { getNodesPositions, calcGraphWidth } from "../helpers"
import { PositionsMap } from "../const/types"

export function useCalcNodesPositions(graphColumns: Node[][], viewWidth: number): [
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