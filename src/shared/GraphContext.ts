import { createContext, useContext } from "react"
import { Graph } from "./interfaces"

type GraphContextType = {
    currentGraph: Graph | null
    setCurrentGraph: (graph: Graph) => void
}

export const GraphContext = createContext<GraphContextType | null>(null)

export function useGraphContext() {
    return useContext(GraphContext)
}
