// formatCurrency.js
export function formatCurrency(amount) {
  if (typeof amount !== 'number') {
    throw new Error('Input must be a number')
  }

  return `${amount.toLocaleString('vi-VN')} VND`
}

export function encodeToURL(str) {
  return encodeURIComponent(str)
}

export function truncateText(text, maxLength) {
  if (typeof text !== 'string') {
    throw new Error('Input must be a string')
  }
  if (text.length <= maxLength) {
    return text
  }
  return text.slice(0, maxLength) + '...'
}
