import { useEffect, useState } from "react"
import { makeGetRequest } from "../../../shared/api"

export function useLoadGraphs() {
    const [graphsIds, setGraphsIds] = useState<number[]>([])

    useEffect(() => {
        makeGetRequest({
            url: "/api/graphs",
            callback: (data: number[]) => {
                setGraphsIds(data)
            },
        })
    }, [])

    return graphsIds
}
