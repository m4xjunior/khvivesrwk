

import { ThemeProvider } from '@mui/material/styles'
import { lightTheme, darkTheme } from './theme/index.js'
import useStore from './store/store'
import { CssBaseline } from '@mui/material'
import App from './App.jsx'

export default function Root() {
  const darkMode = useStore(state => state.darkMode)
  const theme = darkMode ? darkTheme : lightTheme

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  )
}

