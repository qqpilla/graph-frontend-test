import { useCallback } from "react"

export function useGraphSvgStyler(
    graphSvgRef: React.RefObject<SVGSVGElement>
): [
    () => void,
    () => void
] {
    const setCursorGrabbing = useCallback(() => {
        if (graphSvgRef.current) {
            graphSvgRef.current.classList.add("cursor_grabbing")
        }
    }, [])

    const removeCursorGrabbing = useCallback(() => {
        if (graphSvgRef.current) {
            graphSvgRef.current.classList.remove("cursor_grabbing")
        }
    }, [])

    return [setCursorGrabbing, removeCursorGrabbing]
}