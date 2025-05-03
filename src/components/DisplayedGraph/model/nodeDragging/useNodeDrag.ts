import { MouseEvent, useCallback, useRef } from "react"
import { useGraphSvgStyler } from "./useGraphSvgStyler"

export function useNodeDrag(
    graphSvgRef: React.RefObject<SVGSVGElement>
): [
    (nodeId: number) => void, 
    () => void, 
    (event: MouseEvent<SVGSVGElement>) => void
] {
    const draggedNodeId = useRef<number | null>(null)
    const [setCursorGrabbing, removeCursorGrabbing] = useGraphSvgStyler(graphSvgRef)

    const startNodeDrag = useCallback((nodeId: number) => {
        draggedNodeId.current = nodeId
        setCursorGrabbing()
    }, [])

    const stopNodeDrag = useCallback(() => {
        if (draggedNodeId.current !== null) {
            draggedNodeId.current = null
            removeCursorGrabbing()
        }
    }, [])

    const handleMouseMove = useCallback((event: MouseEvent<SVGSVGElement>) => {
        if (draggedNodeId.current !== null) {
            event.preventDefault()
            console.log(`Mouse moved to: ${event.clientX} ${event.clientY}`)
        }
    }, [])

    return [startNodeDrag, stopNodeDrag, handleMouseMove]
}
