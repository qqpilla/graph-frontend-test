import {
    useCalcNodesPositions,
    useCurrentGraph,
    useCalcViewSize,
    useNodeDrag
} from "../model/graphSetupHooks"
import { SvgNodes } from "./SvgNodes"
import { SvgEdges } from "./SvgEdges"
import { useRef } from "react"

export function DisplayedGraph() {
    const [graphColumns, graphEdges] = useCurrentGraph()
    const { viewX, viewY } = useCalcViewSize(graphColumns)
    const [nodesPositions, setNodePosition] = useCalcNodesPositions(graphColumns, viewX)

    const graphSvgRef = useRef<SVGSVGElement>(null)
    const [startNodeDrag, stopNodeDrag, handleMouseMove] = useNodeDrag(graphSvgRef, setNodePosition)

    return (
        <div id="graph-container">
            {graphColumns.length ? (
                <svg
                    ref={graphSvgRef}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox={`0 0 ${viewX} ${viewY}`}
                    width={`${viewX}px`}
                    onMouseUp={stopNodeDrag}
                    onMouseLeave={stopNodeDrag}
                    onMouseMove={handleMouseMove}
                >
                    <SvgEdges 
                        nodesPositions={nodesPositions} 
                        graphEdges={graphEdges} 
                    />
                    <SvgNodes
                        nodesPositions={nodesPositions}
                        graphColumns={graphColumns}
                        startNodeDrag={startNodeDrag}
                    />
                </svg>
            ) : (
                <h2>Граф не выбран</h2>
            )}
        </div>
    )
}
