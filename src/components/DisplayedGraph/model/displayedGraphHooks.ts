import { Node, Edge } from "../../../shared/graph/interfaces"
import { useGraphContext } from "../../../shared/graph"
import { useMemo, useState, useEffect } from "react"
import { getGraphColumnsSorted } from "./getGraphColumns"
import { getNodesPositions } from "./getNodesPositions"
import { calcViewSize } from "./calcViewSize"

export function useCurrentGraph(): [Node[][], Edge[]] {
    const { currentGraph } = useGraphContext()

    const graphColumns = useMemo(
        () => (currentGraph ? getGraphColumnsSorted(currentGraph) : []),
        [currentGraph]
    )

    return [graphColumns, currentGraph?.edges || []]
}

type PositionsMap = Map<number, {x: number, y: number}>

export function useNodesPositions(
    graphColumns: Node[][]
): [PositionsMap, React.Dispatch<React.SetStateAction<PositionsMap>>] {
    const [nodesPositions, setNodesPositions] = useState<PositionsMap>(new Map())

    useEffect(
        () => setNodesPositions(getNodesPositions(graphColumns)), 
        [graphColumns]
    )

    return [nodesPositions, setNodesPositions]
}

export function useCalcViewSize(graphColumns: Node[][]): {
    viewX: number
    viewY: number
} {
    return useMemo(() => calcViewSize(graphColumns), [graphColumns])
}
