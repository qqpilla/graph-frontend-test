export type DragParams = {
  nodeId: number,
  startNodePos: {x: number, y: number},
  startCursorPos: {x: number, y: number}
}

export type PositionsMap = Map<number, { x: number; y: number }>