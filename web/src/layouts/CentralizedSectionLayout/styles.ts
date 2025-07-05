import styled from "styled-components";

export const MainContainer = styled.main`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;

    @media screen and (max-width:600px) {
        min-width: 22.875rem;
        width: 90%;
    }

`

export const MessageSection = styled.main`
    background-color: ${props => props.theme["gray-100"]};
    border-radius: 4px;
    width: 36.25rem;
    max-width: 36.25rem;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
    padding: 4rem 3rem;


    h1 {
        font: ${props => props.theme["text-xl"]};
        color: ${props => props.theme["gray-600"]};
    }

    div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 0.25rem;
        text-align: center;

        p {
            font: ${props => props.theme["text-md"]};
            color: ${props => props.theme["gray-500"]};
        }

        a {
            text-decoration: none;
            color: ${props => props.theme["blue-base"]};
            cursor: pointer;
        }
    }
`