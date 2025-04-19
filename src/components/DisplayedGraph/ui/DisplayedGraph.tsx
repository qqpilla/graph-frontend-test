import { useGraphContext } from "../../../shared/graph"
import { getGraphColumns } from "../model/getGraphColumns"
import { calcViewSize, SvgNodes } from "./SvgNodes"

export function DisplayedGraph() {
    const { currentGraph } = useGraphContext()

    if (!currentGraph) {
        return <h2>Граф не выбран</h2>
    }

    const graphColumns = getGraphColumns(currentGraph)
    const { viewX, viewY } = calcViewSize(graphColumns)

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox={`0 0 ${viewX} ${viewY}`}
            width={`${viewX}px`}
        >
            <SvgNodes graphColumns={graphColumns} />
        </svg>
    )
}
