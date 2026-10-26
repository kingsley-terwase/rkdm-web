import { useState } from 'react'
import { Avatar, Box, Card, Chip, IconButton, InputAdornment, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material'
import { DeleteRegular, EditRegular, SearchRegular } from '@fluentui/react-icons'
import StatusChip from './StatusChip'
export type Row = Record<string, any>
export default function DataTable({ rows, onDelete, onEdit }: { rows: Row[]; onDelete?: (r: Row) => void; onEdit?: (r: Row) => void }) {
  const [q, setQ] = useState('')
  const [st, setSt] = useState('all')
  const [page, setPage] = useState(0)
  const keys = Object.keys(rows[0] ?? {}).filter(k => k !== 'id')
  const statuses = Array.from(new Set(rows.map(r => r.status).filter(Boolean)))
  const f = rows.filter(r => (st === 'all' || r.status === st) && JSON.stringify(r).toLowerCase().includes(q.toLowerCase()))
  return (
    <Card>
      <Box sx={{ p: 2, display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
        <TextField size="small" placeholder="Search…" value={q} onChange={e => { setQ(e.target.value); setPage(0) }} InputProps={{ startAdornment: <InputAdornment position="start"><SearchRegular /></InputAdornment> }} />
        {statuses.length > 0 && ['all', ...statuses].map(s => <Chip key={s} label={s} clickable color={st === s ? 'primary' : 'default'} onClick={() => { setSt(s); setPage(0) }} sx={{ fontWeight: 700 }} />)}
        <Typography variant="body2" color="text.secondary" sx={{ ml: 'auto' }}>{f.length} records</Typography>
      </Box>
      <TableContainer>
        <Table size="medium">
          <TableHead><TableRow sx={{ bgcolor: 'action.hover' }}>{keys.map(k => <TableCell key={k} sx={{ fontWeight: 800, textTransform: 'uppercase', fontSize: 12, letterSpacing: 0.8 }}>{k}</TableCell>)}{(onDelete || onEdit) && <TableCell />}</TableRow></TableHead>
          <TableBody>{f.slice(page * 8, page * 8 + 8).map((r, i) => (
            <TableRow key={i} hover>
              {keys.map((k, c) => <TableCell key={k}>{k === 'status' ? <StatusChip s={String(r[k])} /> : c === 0
                ? <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}><Avatar sx={{ width: 32, height: 32, fontSize: 13, bgcolor: 'primary.main' }}>{String(r[k])[0]}</Avatar><b>{String(r[k])}</b></Box> : String(r[k])}</TableCell>)}
              {(onDelete || onEdit) && <TableCell align="right" sx={{ whiteSpace: 'nowrap' }}>
                {onEdit && <IconButton aria-label="Edit" onClick={() => onEdit(r)}><EditRegular /></IconButton>}{onDelete && <IconButton aria-label="Delete" color="error" onClick={() => onDelete(r)}><DeleteRegular /></IconButton>}</TableCell>}
            </TableRow>))}</TableBody>
        </Table>
      </TableContainer>
      {f.length === 0 && <Typography color="text.secondary" sx={{ p: 4, textAlign: 'center' }}>No records found.</Typography>}
      <TablePagination component="div" count={f.length} page={page} onPageChange={(_, p) => setPage(p)} rowsPerPage={8} rowsPerPageOptions={[8]} />
    </Card>
  )
}
