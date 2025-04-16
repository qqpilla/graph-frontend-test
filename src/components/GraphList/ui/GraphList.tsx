import { useLoadGraphs } from "../api/useLoadGraphs"
import { handleSelectChange } from "../api/selectHandler"
import { useGraphContext } from "../../../shared/graph"

export function GraphList() {
    const graphsIds = useLoadGraphs()
    const { setCurrentGraph } = useGraphContext()

    return graphsIds.length ? (
        <select
            role="combobox"
            defaultValue=""
            onChange={(event) => {
                handleSelectChange({ event, setCurrentGraph })
            }}
        >
            <option key="none" value="" disabled hidden>
                Выберите граф
            </option>
            {graphsIds.map((id) => (
                <option key={id} value={id}>
                    Граф №{id}
                </option>
            ))}
        </select>
    ) : (
        <div>Загружаем список графов...</div>
    )
}
