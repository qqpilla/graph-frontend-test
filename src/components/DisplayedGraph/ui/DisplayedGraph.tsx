import {
    useCurrentGraph,
    useNodesPositions,
    useCalcViewSize,
} from "../model/displayedGraphHooks"
import { useGraphSvgStyler } from "../model/nodeDragging/useGraphSvgStyler"
import { SvgNodes } from "./SvgNodes"
import { SvgEdges } from "./SvgEdges"

export function DisplayedGraph() {
    const [graphColumns, graphEdges] = useCurrentGraph()
    const [nodesPositions, setNodesPositions] = useNodesPositions(graphColumns)
    const { viewX, viewY } = useCalcViewSize(graphColumns)
    const [graphSvgRef, setCursorGrabbing, removeCursorGrabbing] = useGraphSvgStyler()

    return (
        <div className="graph-container">
            {graphColumns.length ? (
                <svg
                    ref={graphSvgRef}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox={`0 0 ${viewX} ${viewY}`}
                    width={`${viewX}px`}
                    onMouseUp={removeCursorGrabbing}
                    onMouseLeave={removeCursorGrabbing}
                >
                    <SvgEdges
                        nodesPositions={nodesPositions}
                        graphEdges={graphEdges}
                    />
                    <SvgNodes
                        nodesPositions={nodesPositions}
                        graphColumns={graphColumns}
                        setCursorGrabbing={setCursorGrabbing}
                    />
                </svg>
            ) : (
                <h2>Граф не выбран</h2>
            )}
        </div>
    )
}
