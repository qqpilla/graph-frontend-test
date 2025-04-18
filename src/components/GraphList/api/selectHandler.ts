import { ChangeEvent } from "react"
import { Graph } from "../../../shared/graph/interfaces"
import { makeGetRequest } from "../../../shared/api"

type handleSelectChangeParams = {
    event: ChangeEvent<HTMLSelectElement>
    setCurrentGraph: (graph: Graph) => void
}

export function handleSelectChange({ event, setCurrentGraph }: handleSelectChangeParams) {
    const graphId = parseInt(event.target.value)

    makeGetRequest({
        url: `/api/graphs/${graphId}`,
        callback: (data) => {
            setCurrentGraph({
                id: graphId,
                ...data,
            })
        },
    })
}
