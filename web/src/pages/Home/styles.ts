import styled from "styled-components";

export const Header = styled.header`
    margin-top: 5.5rem;
    margin-bottom: 2.063rem;

    @media screen and (max-width:600px) {
        margin-top: 2rem;
        margin-bottom: 1.5rem;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
            width: 97px;
            height: 25px;
        }
    }

`

export const MainContainer = styled.main`
    display: grid;
    grid-template-columns: 4fr 6fr;
    gap: 1.25rem;

    @media screen and (max-width:600px) {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

`

export const BaseSection = styled.div`
    background-color: ${props => props.theme["gray-100"]};
    padding: 2rem;
    border-radius: 8px;

    h2 {
        font: ${props => props.theme["text-lg"]};
        color: ${props => props.theme["gray-600"]};
    }

    @media screen and (max-width:600px) {
        min-width: 22.875rem;
        width: 90%;
    }
`