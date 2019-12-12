export const isDisabled = (wells, logs, formations) => {
  return wells.length === 0 || logs.length === 0 || formations.length === 0
}
export const hasData = (wells, logs, formations) => {
  return wells.length > 0 && logs.length > 0 && formations.length > 0
}
