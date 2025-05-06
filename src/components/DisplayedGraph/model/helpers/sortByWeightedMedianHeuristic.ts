import { Edge, Node } from "../../../../shared/graph/interfaces"

// Алгоритм описан в статье:
// IEEE TRANSACTIONS ON SOFTWARE ENGINEERING, VOL. 19, NO. 3, MARCH 1993
// "A Technique for Drawing Directed Graphs"
// Emden R. Gansner, Eleftherios Koutsofios, Stephen C. North, and Kiem-Phong Vo
export function sortByWeightedMedianHeuristic(
    graphColumns: Node[][],
    graphEdges: Edge[],
    numIterations: number = 1,
): Node[][] {
    // Сортировка узлов в столбце с индексом cInd таким образом,
    // чтобы они были как можно ближе к своим медианам из соседнего столбца
    const columnPass = (cInd: number, prevCInd: number) => {
        const medians: Map<number, number> = new Map()

        graphColumns[cInd].forEach((node) => {
            const nodeMedian = calculateMedianPosition(
                node.id,
                graphColumns[prevCInd],
                graphEdges
            )
            medians.set(node.id, nodeMedian)
        })

        graphColumns[cInd].sort(
            (nodeA, nodeB) => medians.get(nodeA.id)! - medians.get(nodeB.id)!
        )
    }

    let bestOrder = structuredClone(graphColumns)
    // Считаем изначальное количество пересечений рёбер в графе
    let bestCountIntersections = 0
    for (let cInd = 0; cInd < bestOrder.length - 1; cInd++) {
        bestCountIntersections += countEdgeIntersectionsOnColumns(
            bestOrder[cInd], bestOrder[cInd + 1], graphEdges
        )
    }
    
    const trySwitchingAndSaveBest = () => {
        // Считаем количество пересечений после очередного прохода алгоритма
        // и если оно уменьшилось, то сохраняем результат
        let countIntersections = trySwitchingNodes(graphColumns, graphEdges)
        if (countIntersections < bestCountIntersections) {
            bestOrder = structuredClone(graphColumns)
            bestCountIntersections = countIntersections
        }        
    }

    for (let iteration = 0; iteration < numIterations; iteration++) {        
        // Прямой проход
        for (let cInd = 1; cInd < graphColumns.length; cInd++) {
            columnPass(cInd, cInd - 1)
        }
        trySwitchingAndSaveBest()

        // Обратный проход
        for (let cInd = graphColumns.length - 2; cInd >= 0; cInd--) {
            columnPass(cInd, cInd + 1)
        }
        trySwitchingAndSaveBest()
    }

    return graphColumns
}

// Поиск медианы для узла с id === nodeId по соседнему столбцу neighbours
function calculateMedianPosition(
    nodeId: number,
    neighbours: Node[],
    graphEdges: Edge[]
): number {
    // Индексы (позиции) узлов, связанных с текущим узлом, в соседнем столбце
    const adjPositions: number[] = []
    neighbours.forEach((neighbour, ind) => {
        if (graphEdges.some((edge) =>
            (edge.fromId === neighbour.id && edge.toId === nodeId) ||
            (edge.toId === neighbour.id && edge.fromId === nodeId)
        )) {
            adjPositions.push(ind)
        }
    })

    const posLength = adjPositions.length
    const medianInd = Math.floor(posLength / 2)

    if (posLength === 0) {
        return -1
    }

    if (posLength % 2 === 1) {
        return adjPositions[medianInd]
    }

    if (posLength === 2) {
        return (adjPositions[0] + adjPositions[1]) / 2
    }

    let firstMedian = adjPositions[medianInd - 1]
    let secondMedian = adjPositions[medianInd]

    let upperDistance = firstMedian - adjPositions[0]
    let lowerDistance = adjPositions[posLength - 1] - secondMedian

    return (
        (firstMedian * lowerDistance + secondMedian * upperDistance) /
        (lowerDistance + upperDistance)
    )
}

// Попытка улучшить результат путём переставления соседних узлов во всех столбцах.
// Возвращает общее количество пересечений рёбер во всём графе
function trySwitchingNodes(graphColumns: Node[][], graphEdges: Edge[]): number {
    const maxIterationsWithoutImprovement = 5
    let iterationsWithoutImprovement = 0
    let hasImproved = true
    let hasSwitchedWithNoResult: boolean

    // Общее количество пересечений в графе
    let intersectionsCount = 0

    const countIntersectionsWithOther = (columnInd: number, withPrev: boolean) => {
        if (withPrev && columnInd > 0) {
            return countEdgeIntersectionsOnColumns(
                graphColumns[columnInd - 1], graphColumns[columnInd], graphEdges
            )
        }
        
        if (!withPrev && columnInd < graphColumns.length - 1) {
            return countEdgeIntersectionsOnColumns(
                graphColumns[columnInd], graphColumns[columnInd + 1], graphEdges
            )
        }

        return 0
    }

    // Пока перестановки дают улучшения или пока перестановок без улучшений было не больше заданного числа
    // (перестановки без улучшений могут в итоге помочь выйти из локального оптимума и прийти в глобальный)
    // (это сложнее, но в идеале нужно допускать не только перестановки без улучшений, но и некоторое
    // количество перестановок, приводящих к ухудшению - так вероятность выйти из локального оптимума выше)
    while (hasImproved || iterationsWithoutImprovement < maxIterationsWithoutImprovement) {
        hasImproved = false
        hasSwitchedWithNoResult = false
        intersectionsCount = 0

        graphColumns.forEach((column, cInd) => {
            // Количество пересечений между column и graphColumns[cInd - 1]
            let intersectionsWithPrevCount = 0 

            for (let nInd = 0; nInd < column.length - 1; nInd++) {
                const currentNode = column[nInd]
                const nextNode = column[nInd + 1]

                // Считаем количество пересечений с соседними стобцами
                const intersectionsWithPrevCN = countIntersectionsWithOther(cInd, true)
                const intersectionsWithNextCN = countIntersectionsWithOther(cInd, false)
                const intersectionsCN = intersectionsWithPrevCN + intersectionsWithNextCN 

                // Переставляем местами узлы
                column[nInd] = nextNode
                column[nInd + 1] = currentNode

                // Снова считаем количество пересечений
                const intersectionsWithPrevNC = countIntersectionsWithOther(cInd, true)
                const intersectionsWithNextNC = countIntersectionsWithOther(cInd, false)
                const intersectionsNC = intersectionsWithPrevNC + intersectionsWithNextNC 

                if (intersectionsNC < intersectionsCN) {
                    hasImproved = true
                    iterationsWithoutImprovement = 0
                    intersectionsWithPrevCount = intersectionsWithPrevNC
                } else if (intersectionsNC === intersectionsCN) {
                    hasSwitchedWithNoResult = true
                    intersectionsWithPrevCount = intersectionsWithPrevNC
                } else {
                    column[nInd] = currentNode
                    column[nInd + 1] = nextNode
                    intersectionsWithPrevCount = intersectionsWithPrevCN
                }
            }

            intersectionsCount += intersectionsWithPrevCount
        })

        if (!hasImproved) {
            if (hasSwitchedWithNoResult) {
                iterationsWithoutImprovement++
            } else {
                // Не случилось ни одной перестановки, т.к. они все
                // увеличивали количество пересечений рёбер
                break
            }
        }
    }

    return intersectionsCount
}

const countEdgeIntersectionsOnColumns = (
    columnFrom: Node[],
    columnTo: Node[],
    graphEdges: Edge[]
): number => {
    // Все рёбра, идущие из columnFrom в columnTo
    const edges = graphEdges.filter((edge) =>
        columnFrom.some((node) => node.id === edge.fromId)
    )
    
    let intersectionsCount = 0

    // Можно оптимизировать, применив Sweep Line Algorithm
    for (let i = 0; i < edges.length - 1; i++) {
        for (let j = i + 1; j < edges.length; j++) {
            const edgeA = edges[i]
            const edgeB = edges[j]

            // Индексы (позиции) концов рёбер в столбцах
            const edgeANodeFromPosition = columnFrom.findIndex((node) => node.id === edgeA.fromId)
            const edgeANodeToPosition = columnTo.findIndex((node) => node.id === edgeA.toId)
            const edgeBNodeFromPosition = columnFrom.findIndex((node) => node.id === edgeB.fromId)
            const edgeBNodeToPosition = columnTo.findIndex((node) => node.id === edgeB.toId)

            if (edgeANodeFromPosition < edgeBNodeFromPosition &&
                edgeANodeToPosition > edgeBNodeToPosition ||
                edgeANodeFromPosition > edgeBNodeFromPosition &&
                edgeANodeToPosition < edgeBNodeToPosition
            ) {
                intersectionsCount++
            }
        }
    }

    return intersectionsCount
}
