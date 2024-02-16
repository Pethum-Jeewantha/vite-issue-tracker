import { Container } from '@radix-ui/themes';
import React, {ReactNode} from "react";

interface MainLayoutProps {
    children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <main className='p-5'>
            <Container>
                {children}
            </Container>
        </main>
    )
}

export default MainLayout;
