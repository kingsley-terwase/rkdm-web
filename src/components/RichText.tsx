import { useEffect, useRef } from 'react'
import { Box, Divider, IconButton, Paper } from '@mui/material'
import { ArrowUndoRegular, ImageRegular, LinkRegular, TextBoldRegular, TextBulletListLtrRegular, TextHeader2Regular, TextItalicRegular, TextUnderlineRegular } from '@fluentui/react-icons'
export default function RichText({ value, onChange }: { value: string; onChange: (h: string) => void }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => { if (ref.current && ref.current.innerHTML !== value) ref.current.innerHTML = value }, [value])
  const cmd = (c: string, v?: string) => { ref.current?.focus(); document.execCommand(c, false, v); onChange(ref.current!.innerHTML) }
  const tools: [string, JSX.Element, () => void][] = [
    ['Bold', <TextBoldRegular />, () => cmd('bold')], ['Italic', <TextItalicRegular />, () => cmd('italic')], ['Underline', <TextUnderlineRegular />, () => cmd('underline')],
    ['Heading', <TextHeader2Regular />, () => cmd('formatBlock', 'h2')], ['List', <TextBulletListLtrRegular />, () => cmd('insertUnorderedList')],
    ['Link', <LinkRegular />, () => { const u = prompt('Link URL'); if (u) cmd('createLink', u) }], ['Image', <ImageRegular />, () => { const u = prompt('Image URL'); if (u) cmd('insertImage', u) }],
    ['Undo', <ArrowUndoRegular />, () => cmd('undo')],
  ]
  return (
    <Paper variant="outlined" sx={{ overflow: 'hidden' }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', p: 0.5, bgcolor: 'action.hover' }}>{tools.map(([l, ic, fn]) => <IconButton key={l} aria-label={l} onMouseDown={e => e.preventDefault()} onClick={fn}>{ic}</IconButton>)}</Box>
      <Divider />
      <Box ref={ref} contentEditable suppressContentEditableWarning onInput={() => onChange(ref.current!.innerHTML)}
        sx={{ minHeight: 260, p: 2, outline: 'none', '& img': { maxWidth: '100%' }, '& h2': { mt: 0 } }} />
    </Paper>
  )
}
