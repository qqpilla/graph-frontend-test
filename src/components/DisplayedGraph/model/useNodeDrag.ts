import { MouseEvent, useCallback, useRef } from "react"

export type dragParams = {
    nodeId: number,
    startNodePos: {x: number, y: number},
    startCursorPos: {x: number, y: number}
}

export function useNodeDrag(
    graphSvgRef: React.RefObject<SVGSVGElement>,
    setNodePosition: (nodeId: number, newPos: { x: number, y: number }) => void
): [
    ({ nodeId, startNodePos, startCursorPos }: dragParams) => void, 
    () => void, 
    (event: MouseEvent<SVGSVGElement>) => void
] {
    const dragParams = useRef<dragParams | null>(null)

    const startNodeDrag = useCallback(
        ({ nodeId, startNodePos, startCursorPos }: dragParams) => {
            dragParams.current = { nodeId, startNodePos, startCursorPos }
            graphSvgRef.current?.classList.add("cursor_grabbing")
        },
        []
    )

    const stopNodeDrag = useCallback(() => {
        if (dragParams.current !== null) {
            dragParams.current = null
            graphSvgRef.current?.classList.remove("cursor_grabbing")
        }
    }, [])

    const handleMouseMove = useCallback((event: MouseEvent<SVGSVGElement>) => {
        if (dragParams.current !== null) {
            event.preventDefault()

            const deltaX = event.clientX - dragParams.current.startCursorPos.x
            const deltaY = event.clientY - dragParams.current.startCursorPos.y

            const newPos = {
                x: dragParams.current.startNodePos.x + deltaX,
                y: dragParams.current.startNodePos.y + deltaY,
            }

            setNodePosition(
                dragParams.current.nodeId,
                newPos
            )
        }
    }, [setNodePosition])

    return [startNodeDrag, stopNodeDrag, handleMouseMove]
}
