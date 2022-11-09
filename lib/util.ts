const formatDate = (
  dateTime: Date = new Date(),
  style: string = 'yyyy-MM-dd hh:mm:ss'
) => {
  let formatResult = style
    .replace('yyyy', dateTime.getFullYear().toString())
    .replace('MM', formatNumber(dateTime.getMonth() + 1))
    .replace('dd', formatNumber(dateTime.getDate()))
    .replace('hh', formatNumber(dateTime.getHours()))
    .replace('mm', formatNumber(dateTime.getMinutes()))
    .replace('ss', formatNumber(dateTime.getSeconds()))
  return formatResult
}

const formatNumber = (num: number) => {
  let numStr = num.toString()
  return numStr[1] ? numStr : '0' + numStr
}

export { formatDate, formatNumber }
