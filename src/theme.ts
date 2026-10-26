import { createTheme } from '@mui/material/styles'
export const makeTheme = (mode: 'light' | 'dark') => createTheme({
  palette: {
    mode, primary: { main: mode === 'dark' ? '#5b8cff' : '#1546d6' }, secondary: { main: '#f97316' }, warning: { main: '#f5b301' },
    background: mode === 'dark' ? { default: '#070d1f', paper: '#101a36' } : { default: '#f5f8ff', paper: '#ffffff' },
  },
  shape: { borderRadius: 14 },
  typography: { fontFamily: 'Nunito, sans-serif', button: { textTransform: 'none', fontWeight: 800 } },
  components: { MuiCssBaseline: { styleOverrides: { body: { overflowX: 'hidden' } } }, MuiButton: { defaultProps: { disableElevation: true } }, MuiCard: { styleOverrides: { root: { backgroundImage: 'none', border: '1px solid rgba(128,140,180,.2)' } } } },
})
