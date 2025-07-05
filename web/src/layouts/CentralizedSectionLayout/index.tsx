import { Outlet } from "react-router-dom";
import { MainContainer, MessageSection } from "./styles";

export function CentralizedSectionLayout() {
    return (
        <MainContainer>
            <MessageSection>
                <Outlet />
            </MessageSection>
        </MainContainer>
    )
}