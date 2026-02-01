function formatDate(raw: string): Post['date'] {
  // 1. 直接通过 raw 字符串创建日期对象，它会保留 MD 中写的时分
  // 如果 raw 是 "2026-01-01 21:59"，new Date() 会按本地时间解析
  const date = new Date(raw)

  // 2. 检查日期是否有效
  if (isNaN(date.getTime())) {
    return { time: 0, string: '无效日期', year: '', monthDay: '' }
  }

  // 3. 这里的 string 需要包含时分：2026-01-01 21:59
  const pad = (n: number) => String(n).padStart(2, '0')
  const formattedString = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`

  return {
    time: +date,
    string: formattedString, // 这里的 string 现在有了具体时间
    year: String(date.getFullYear()),
    monthDay: `${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
  }
}
