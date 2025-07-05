import { Toaster } from "sonner";
import { routes } from './routes'
import { RouterProvider } from 'react-router'
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/react-query";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/themes/default";
import { GlobalStyle } from "./styles/global";

function App() {
  
  return (
    <ThemeProvider theme={defaultTheme}>
      <Toaster richColors />
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={routes} />
      </QueryClientProvider>

      <GlobalStyle />
    </ThemeProvider>
    )
  }
  
  export default App
  