export function formatDateToLocalDate(date) {
  const dateLocal = date.toLocaleString()
  const [dayMonthYear, hours] = dateLocal.split(', ')
  const formatDayMonthYear = dayMonthYear.replaceAll('/', '-')
  return [formatDayMonthYear, hours].join('T')
}