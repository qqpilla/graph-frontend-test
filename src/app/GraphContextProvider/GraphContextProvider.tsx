import { ReactNode, useState } from "react"
import { GraphContext } from "../../shared/graph"
import { Graph } from "../../shared/graph/interfaces"

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
