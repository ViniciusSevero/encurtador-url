import styled from "styled-components"
import { BaseSection } from "../../styles"

export const FormContainer = styled(BaseSection)`
    align-self: start;

    form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    h2 {
        margin-bottom: 1.25rem;
    }

    button[type="submit"] {
        cursor: pointer;
        height: 3rem;
        background: ${props => props.theme["blue-base"]};
        color: ${props => props.theme["white"]};
        font: ${props => props.theme["text-md"]};
        margin-top: 0.5rem;
        border-radius: 4px;
        border: 0;

        &:disabled{
            opacity: 0.7;
            cursor: not-allowed;
        }
    } 

`
export const FormControlGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    label: {
        font: ${props => props.theme["text-xs"]};
        color: ${props => props.theme["gray-500"]};
    }

    input {
        border-radius: 4px;
        border: 1px solid ${props => props.theme["gray-300"]};
        padding: 0.938rem;
        color: ${props => props.theme["gray-600"]};
        outline: none;

        &::placeholder{
            color:  ${props => props.theme["gray-400"]};
        }

        &:focus {
            border: 1px solid ${props => props.theme["blue-dark"]};
        }

        &[data-invalid]:not(:focus-within) {
            border-color: ${props => props.theme["danger"]};
        }
    }

    &:focus-within label {
        color:  ${props => props.theme["blue-base"]};
    }

`

export const InputBox = styled.div`
    display: flex;
    align-items: center;

    border-radius: 4px;
    border: 1px solid ${props => props.theme["gray-300"]};
    color: ${props => props.theme["gray-600"]};
    background-color: ${props => props.theme.white};

    span {
        padding: 0.938rem 0 0.938rem 0.938rem;
        color:  ${props => props.theme["gray-400"]};
        font: ${props => props.theme["text-md-normal"]};
    }


    &:focus {
        border: 1px solid ${props => props.theme["blue-dark"]};
    }
    
    &:focus-within {
        border: 1px solid ${props => props.theme["blue-dark"]};
    }

    &[data-invalid]:not(:focus-within) {
        border-color: ${props => props.theme["danger"]};
    }

    input {
        border: none;
        outline: none;
        padding: 0.938rem 0.938rem 0.938rem 0;
        width: 100%;
    }

    input::placeholder{
        color:  ${props => props.theme["gray-400"]};
    }

    input:focus {
        border: 0;
    }
    

`

export const ValidationMessage = styled.span`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font: ${props => props.theme["text-sm"]};

    svg {
        color: ${props => props.theme.danger};
    }
`