import styled from "styled-components";

export const BaseButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 2rem;
    padding: 0.5rem;
    background-color: ${props => props.theme["gray-200"]};
    border: 0;
    border-radius: 4px;
    color: ${props => props.theme["gray-600"]};
    font: ${props => props.theme["text-sm"]};
    gap: 0.5rem;
`