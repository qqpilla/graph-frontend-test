import { useLoadGraphs } from "./useLoadGraphs"

export function GraphList() {
    const graphsIds = useLoadGraphs()

    return graphsIds.length ? (
        <select role="combobox">
            {graphsIds.map((id) => (
                <option key={id} value={id}>
                    Граф {id}
                </option>
            ))}
        </select>
    ) : (
        <div>Загружаем список графов...</div>
    )
}
