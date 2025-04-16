import { createContext, useContext } from "react"
import { Graph } from "./Graph"

type GraphContextType = {
    currentGraph: Graph | null
    setCurrentGraph: (graph: Graph) => void
}

export const GraphContext = createContext<GraphContextType>({
    currentGraph: null,
    setCurrentGraph: (graph: Graph) => {},
})

export function useGraphContext() {
    return useContext(GraphContext)
}
