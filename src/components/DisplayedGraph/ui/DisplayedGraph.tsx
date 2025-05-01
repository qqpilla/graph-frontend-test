import { useGraphContext } from "../../../shared/graph"
import { getGraphColumnsSorted } from "../model/getGraphColumns"
import { getNodesPositions } from "../model/getNodesPositions"
import { calcViewSize } from "../model/calcViewSize"
import { SvgNodes } from "./SvgNodes"
import { SvgEdges } from "./SvgEdges"

export function DisplayedGraph() {
    const { currentGraph } = useGraphContext()

    if (!currentGraph) {
        return (
            <div className="graph-container">
                <h2>Граф не выбран</h2>
            </div>
        ) 
    }

    const graphColumns = getGraphColumnsSorted(currentGraph)
    const nodesPositions = getNodesPositions(graphColumns)
    const { viewX, viewY } = calcViewSize(graphColumns)

    return (
        <div className="graph-container">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox={`0 0 ${viewX} ${viewY}`}
                width={`${viewX}px`}
            >
                <SvgEdges nodesPositions={nodesPositions} graphEdges={currentGraph.edges} />
                <SvgNodes nodesPositions={nodesPositions} graphColumns={graphColumns} />
            </svg>
        </div>
    )
}
