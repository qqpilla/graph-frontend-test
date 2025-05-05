import { Node } from "../../../../shared/graph/interfaces";
import { useRef, useEffect, useMemo } from "react";
import { calcViewSize } from "../helpers";

export function useCalcViewSize(graphColumns: Node[][]): {
    viewX: number
    viewY: number
} {
    const containerSize = useRef<{ x: number; y: number } | null>(null)

    useEffect(() => {
        const graphContainer = document.getElementById("graph-container")
        if (graphContainer) {
            containerSize.current = {
                x: graphContainer.clientWidth,
                y: graphContainer.clientHeight
            }
        }
    }, [])

    const { viewX, viewY } = useMemo(() => calcViewSize(graphColumns), [graphColumns])
  
    // Возвращаем большее из значений: либо размеры контейнера, либо размеры самого графа.
    // Это нужно для центрирования графа внутри контейнера или расширения контейнера при необходимости  
    if (containerSize.current) {
        return {
            viewX: Math.max(containerSize.current.x, viewX),
            viewY: Math.max(containerSize.current.y, viewY)
        }
    }

    return { viewX, viewY }
}