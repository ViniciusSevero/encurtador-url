import { BaseButton } from "@/components/ui/Button/styles"
import styled from "styled-components"

export const LinkInfoContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0;
    border-top: 1px solid ${props => props.theme["gray-200"]};
    color: ${props => props.theme["gray-500"]};

    @media screen and (max-width:460px) {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
    }

    a {
        text-decoration: none;
    }

    h3 {
        font: ${props => props.theme["text-md"]};
        color: ${props => props.theme["blue-base"]};
        cursor: pointer;
    }

    span {
        font: ${props => props.theme["text-sm"]};
    }
`

export const UrlInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.25rem;

    flex: 1;
    min-width: 0;
    h3, a, span {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`

export const Actions  = styled.div`
    display: flex;
    align-items: center;
    gap: 0.25rem;

    span {
        margin-right: 1.25rem;
    }
`

export const IconButton = styled(BaseButton)`
`
