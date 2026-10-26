import { IconButton } from '@mui/material'
import { WeatherMoonRegular, WeatherSunnyRegular } from '@fluentui/react-icons'
import { useTheme } from '../context/Theme'
export default function ThemeToggle() {
  const { dark, toggle } = useTheme()
  return <IconButton onClick={toggle} aria-label="Toggle theme">{dark ? <WeatherSunnyRegular /> : <WeatherMoonRegular />}</IconButton>
}
