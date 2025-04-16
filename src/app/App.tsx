import { GraphContextProvider } from "./GraphContextProvider"
import { GraphList } from "../components/GraphList"
import { DisplayedGraph } from "../components/DisplayedGraph"
import "./App.css"

export const App = () => {
    return (
        <GraphContextProvider>
            <GraphList />
            <DisplayedGraph />
        </GraphContextProvider>
    )
}
