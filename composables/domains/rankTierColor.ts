/**
 * tierの並び順(index)と総数からグラデーションカラーを自動算出する。
 * 先頭(index 0)ほど赤系、末尾に近づくほど青系になるよう色相を補間する。
 */
export const getTierColor = (index: number, total: number): string => {
  if (total <= 1) return 'hsl(0, 70%, 55%)'
  const hue = Math.round((index / (total - 1)) * 240)
  return `hsl(${hue}, 70%, 55%)`
}
