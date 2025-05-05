import { Node, Edge } from "../../../../shared/graph/interfaces"
import { useGraphContext } from "../../../../shared/graph"
import { getGraphColumnsSorted } from "../helpers"
import { useMemo } from "react"

export function useCurrentGraph(): [Node[][], Edge[]] {
    const { currentGraph } = useGraphContext()

    const graphColumns = useMemo(
        () => (currentGraph ? getGraphColumnsSorted(currentGraph) : []),
        [currentGraph]
    )

    return [graphColumns, currentGraph?.edges || []]
}