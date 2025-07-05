import styled from "styled-components";

export const LayoutContainer = styled.div`
    max-width: 61.25rem;
    margin: 0 auto;
    height: calc(100vh - 10rem);
    min-height: calc(100vh - 10rem);
    font: ${props => props.theme["text-md"]};
`
