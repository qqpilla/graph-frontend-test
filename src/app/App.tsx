import { GraphContextProvider } from "./GraphContextProvider"
import { GraphList } from "../components/GraphList"
import "./App.css"

export const App = () => {
    return (
        <GraphContextProvider>
            <GraphList />
        </GraphContextProvider>
    )
}
