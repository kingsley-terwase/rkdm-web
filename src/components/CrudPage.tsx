import { useState } from 'react'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Drawer, MenuItem, Snackbar, TextField, Typography } from '@mui/material'
import { AddRegular, ArrowDownloadRegular } from '@fluentui/react-icons'
import Guard from './Guard'
import PageHeader from './PageHeader'
import DataTable, { Row } from './DataTable'
import { useActivity } from '../context/Activity'
export interface Spec { title: string; perm: string; rows: Row[]; noAdd?: boolean; exportable?: boolean; store?: [Row[], (r: Row[]) => void] }
const esc = (v: any) => { let s = String(v); if (/^[=+\-@]/.test(s)) s = "'" + s; return `"${s.replace(/"/g, '""')}"` }
export default function CrudPage({ title, perm, rows: init, noAdd, exportable, store }: Spec) {
  const [lr, setLr] = useState(init)
  const rows = store ? store[0] : lr
  const setRows = store ? store[1] : setLr
  const [form, setForm] = useState<Row | null>(null)
  const [editing, setEditing] = useState<Row | null>(null)
  const [del, setDel] = useState<Row | null>(null)
  const [msg, setMsg] = useState('')
  const { log } = useActivity()
  const keys = Object.keys(init[0] ?? {}).filter(k => k !== 'id')
  const statuses = Array.from(new Set(['draft', 'published', ...init.map(r => r.status).filter(Boolean)]))
  const hasStatus = keys.includes('status')
  const save = () => {
    setRows(editing ? rows.map(r => (r === editing ? form! : r)) : [{ status: init[0]?.status, ...form }, ...rows])
    log(editing ? 'update' : 'create', `${title}: ${form![keys[0]]}`); setMsg(editing ? 'Changes saved and logged' : 'Created and logged'); setForm(null); setEditing(null)
  }
  const remove = () => { setRows(rows.filter(r => r !== del)); log('delete', `${title}: ${del?.[keys[0]]}`); setDel(null); setMsg('Deleted and logged') }
  const exportCsv = () => {
    const csv = '\uFEFF' + [keys.join(','), ...rows.map(r => keys.map(k => esc(r[k])).join(','))].join('\n')
    const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' })); a.download = `${title}.csv`; a.click()
    log('export', title); setMsg('CSV exported and logged')
  }
  return (
    <Guard perm={perm}>
      <PageHeader title={title} sub={`${rows.length} records · every change is written to the activity log`}>
        {exportable && <Button variant="outlined" startIcon={<ArrowDownloadRegular />} onClick={exportCsv}>Export CSV</Button>}
        {!noAdd && <Button variant="contained" startIcon={<AddRegular />} onClick={() => { setEditing(null); setForm({}) }}>Add new</Button>}
      </PageHeader>
      <DataTable rows={rows} onEdit={noAdd ? undefined : r => { setEditing(r); setForm({ ...r }) }} onDelete={noAdd ? undefined : setDel} />
      <Drawer anchor="right" open={!!form} onClose={() => setForm(null)} PaperProps={{ sx: { width: { xs: '100%', sm: 420 }, p: 3 } }}>
        <Typography variant="h6" fontWeight={800} sx={{ mb: 3 }}>{editing ? 'Edit' : 'Add to'} {title}</Typography>
        <Box sx={{ display: 'grid', gap: 2 }}>
          {keys.filter(k => k !== 'status').map(k => <TextField key={k} label={k} value={form?.[k] ?? ''} onChange={e => setForm({ ...form, [k]: e.target.value })} />)}
          {hasStatus && <TextField select label="status" value={form?.status ?? init[0]?.status} onChange={e => setForm({ ...form, status: e.target.value })}>{statuses.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}</TextField>}
        </Box>
        <Box sx={{ mt: 3, display: 'flex', gap: 1 }}><Button variant="contained" disabled={!form?.[keys[0]]} onClick={save}>Save</Button><Button onClick={() => setForm(null)}>Cancel</Button></Box>
      </Drawer>
      <Dialog open={!!del} onClose={() => setDel(null)}>
        <DialogTitle>Delete “{del?.[keys[0]]}”?</DialogTitle>
        <DialogContent><DialogContentText>This is written to the activity log.</DialogContentText></DialogContent>
        <DialogActions><Button onClick={() => setDel(null)}>Cancel</Button><Button color="error" variant="contained" onClick={remove}>Delete</Button></DialogActions>
      </Dialog>
      <Snackbar open={!!msg} autoHideDuration={2500} onClose={() => setMsg('')} message={msg} />
    </Guard>
  )
}
