import { DownloadSimple, Link } from 'phosphor-react'
import {MyLinksContainer, MyLinksHeader, DownloadButton, LinkList, MyScrollArea, MyScrollViewport, MyScrollBar, MyScrollBarThumb, EmptyLinksContainer} from './styles'
import { LinkInfo } from '../LinkInfo';
import { useMutation, useQuery } from '@tanstack/react-query';
import { listShortenedUrls } from '@/api/list-shortened-urls';
import { generateReport } from '@/api/generate-report';
import { toast } from 'sonner';
import { downloadUrl } from '@/utils/download-url';

export function MyLinks() {
    const { data: result, isLoading: isLoading } = useQuery({
        queryKey: ['all-shortened-urls'],
        queryFn: () => listShortenedUrls()
    })

    const { mutateAsync: generateReportFn } = useMutation({
        mutationFn: generateReport,
        onSuccess: ({ reportUrl }, _, __) => {
            downloadUrl(reportUrl)
        },
        onError: () => {
            toast.error('Erro ao gerar relatório', {
                description: `Ocorreu um erro ao gerar relatório`
            })
        }
    })

    const isListEmpty = result && result.items.length == 0;

    async function handleGenerateReport() {
        await generateReportFn()
    }
    
    return (
        <MyLinksContainer>
            <MyLinksHeader>
            <h2>Meus Links</h2>
            <DownloadButton onClick={() => handleGenerateReport()}>
                <DownloadSimple size={16} />
                Baixar CSV
            </DownloadButton>
            </MyLinksHeader>

            <LinkList>
                {!isLoading && (
                    <MyScrollArea type="auto">
                        <MyScrollViewport>
                            {isListEmpty ? (
                                <EmptyLinksContainer>
                                    <Link size={32} />
                                    <span>Ainda não existem links cadastrados</span>
                                </EmptyLinksContainer>
                            ) : (
                                result?.items.map((item) => {
                                    return <LinkInfo key={item.id} urlInfo={item} />
                                })
                            )}
                        </MyScrollViewport>

                        <MyScrollBar
                            orientation="vertical"
                        >
                            <MyScrollBarThumb />
                        </MyScrollBar>
                    </MyScrollArea>
                )}
            </LinkList>
        </MyLinksContainer>
    )
}