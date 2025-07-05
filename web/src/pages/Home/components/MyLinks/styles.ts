import styled from "styled-components"
import { BaseSection } from "../../styles"
import { BaseButton } from "@/components/ui/Button/styles"
import * as ScrollArea from "@radix-ui/react-scroll-area";

export const MyLinksContainer = styled(BaseSection)`
    max-height: 36.25rem;
`

export const MyLinksHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-content: center;
`

export const DownloadButton = styled(BaseButton)`
    
`
export const LinkList = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 1.25rem;
`

export const MyScrollArea = styled(ScrollArea.Root)<ScrollArea.ScrollAreaViewportProps & React.RefAttributes<HTMLDivElement>>`
    overflow: hidden;
`

export const MyScrollViewport = styled(ScrollArea.Viewport)`
    max-height: 22.188rem;
    padding-right: 1rem;
    border-radius: inherit;
`

export const MyScrollBar = styled(ScrollArea.Scrollbar)<ScrollArea.ScrollAreaScrollbarProps & React.RefAttributes<HTMLDivElement>>`
    display: flex;
    width: 1rem; /* Width of the vertical scrollbar */
    padding: 2px;
    transition: background-color 0.3s ease-out; /* Optional: transition for track color */
`

export const MyScrollBarThumb = styled(ScrollArea.Thumb)`
    flex: 1;
    border-radius: 0.25rempx; /* Rounded corners */
    background-color: ${props => props.theme["blue-base"]};
    transition: background-color 0.3s ease-in-out; /* Smooth transition for color change */
`

export const EmptyLinksContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    padding: 1rem 0 1.5rem 0;

`