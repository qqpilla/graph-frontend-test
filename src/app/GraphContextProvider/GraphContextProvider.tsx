import { ReactNode, useState } from "react"
import { Graph, GraphContext } from "../../shared/graph"

type GraphContextProviderParams = {
    children: ReactNode
}

export function GraphContextProvider({ children }: GraphContextProviderParams) {
    const [graph, setGraph] = useState<Graph | null>(null)

    return (
        <GraphContext.Provider
            value={{
                currentGraph: graph,
                setCurrentGraph: setGraph,
            }}
        >
            {children}
        </GraphContext.Provider>
    )
}
