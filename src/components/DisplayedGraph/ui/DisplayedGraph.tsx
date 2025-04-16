import { useGraphContext } from "../../../shared/graph"

export function DisplayedGraph() {
    const { currentGraph } = useGraphContext()

    return currentGraph ? (
        <h2>Выбран граф №{currentGraph.id}</h2>
    ) : (
        <h2>Граф не выбран</h2>
    )
}
