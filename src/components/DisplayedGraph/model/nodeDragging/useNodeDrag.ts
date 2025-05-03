import { MouseEvent, useCallback, useRef } from "react"
import { useGraphSvgStyler } from "./useGraphSvgStyler"

export type dragParams = {
    nodeId: number,
    startNodePos: {x: number, y: number},
    startCursorPos: {x: number, y: number}
}

export function useNodeDrag(
    graphSvgRef: React.RefObject<SVGSVGElement>
): [
    ({ nodeId, startNodePos, startCursorPos }: dragParams) => void, 
    () => void, 
    (event: MouseEvent<SVGSVGElement>) => void
] {
    const dragParams = useRef<dragParams | null>(null)
    const [setCursorGrabbing, removeCursorGrabbing] = useGraphSvgStyler(graphSvgRef)

    const startNodeDrag = useCallback(
        ({ nodeId, startNodePos, startCursorPos }: dragParams) => {
            dragParams.current = { nodeId, startNodePos, startCursorPos }
            setCursorGrabbing()
        },
        [setCursorGrabbing]
    )

    const stopNodeDrag = useCallback(() => {
        if (dragParams.current !== null) {
            dragParams.current = null
            removeCursorGrabbing()
        }
    }, [removeCursorGrabbing])

    const handleMouseMove = useCallback((event: MouseEvent<SVGSVGElement>) => {
        if (dragParams.current !== null) {
            event.preventDefault()
            console.log(`Mouse moved to: ${event.clientX} ${event.clientY}`)
        }
    }, [])

    return [startNodeDrag, stopNodeDrag, handleMouseMove]
}
