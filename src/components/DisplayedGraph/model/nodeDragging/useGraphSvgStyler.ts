import { useRef, useCallback } from "react"

export function useGraphSvgStyler(): [
    React.RefObject<SVGSVGElement>,
    () => void,
    () => void
] {
    const graphSvgRef = useRef<SVGSVGElement>(null)

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

    return [graphSvgRef, setCursorGrabbing, removeCursorGrabbing]
}