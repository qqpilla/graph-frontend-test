import { useGraphContext } from "../../../shared/graph"
import { calcViewSize, SvgNodes } from "./SvgNodes"

export function DisplayedGraph() {
    const { currentGraph } = useGraphContext()
    const { viewX, viewY } = calcViewSize(currentGraph)

    return currentGraph ? (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox={`0 0 ${viewX} ${viewY}`}
            width={`${viewX}px`}
        >
            <SvgNodes graph={currentGraph} />
        </svg>
    ) : (
        <h2>Граф не выбран</h2>
    )
}
