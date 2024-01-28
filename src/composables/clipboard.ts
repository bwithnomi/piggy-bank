export const copyToClipboard = (text: any) => {
  navigator.clipboard.writeText(text)
}

export default copyToClipboard;