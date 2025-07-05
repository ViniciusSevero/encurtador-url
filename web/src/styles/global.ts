import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        background-color: ${props => props.theme["gray-200"]};
        color: ${props => props.theme["gray-300"]};
        -webkit-font-smoothing: antialiased;
    }

    body, input, textarea, button {
        font-family: "Open Sans", sans-serif;
        font: ${props => props.theme["text-xs"]};
        color: ${props => props.theme["gray-400"]};
    }
`