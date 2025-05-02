import {
    useCurrentGraph,
    useNodesPositions,
    useCalcViewSize,
} from "../model/displayedGraphHooks"
import { SvgNodes } from "./SvgNodes"
import { SvgEdges } from "./SvgEdges"

export function DisplayedGraph() {
    const [graphColumns, graphEdges] = useCurrentGraph()
    const [nodesPositions, setNodesPositions] = useNodesPositions(graphColumns)
    const { viewX, viewY } = useCalcViewSize(graphColumns)

    return (
        <div className="graph-container">
            {graphColumns.length ? (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox={`0 0 ${viewX} ${viewY}`}
                    width={`${viewX}px`}
                >
                    <SvgEdges
                        nodesPositions={nodesPositions}
                        graphEdges={graphEdges}
                    />
                    <SvgNodes
                        nodesPositions={nodesPositions}
                        graphColumns={graphColumns}
                    />
                </svg>
            ) : (
                <h2>Граф не выбран</h2>
            )}
        </div>
    )
}
