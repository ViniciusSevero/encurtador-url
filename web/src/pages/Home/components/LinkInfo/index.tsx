import { Copy, Trash } from 'phosphor-react'
import { LinkInfoContainer, UrlInfo, Actions, IconButton} from './styles'
import { env } from '@/env'
import { toast } from 'sonner'
import { queryClient } from '@/lib/react-query'
import type { ListShortenedUrlsOutput } from '@/api/list-shortened-urls'
import { useMutation } from '@tanstack/react-query'
import { deleteShortenedUrl } from '@/api/delete-shortened-url'
import { NavLink } from 'react-router'

interface LinkInfoParams {
    urlInfo: {
        id: string
        shortenedUrl: string
        originalUrl: string
        accessCount: number
        createdAt: Date
    }
}

export function LinkInfo({ urlInfo: { id, originalUrl, shortenedUrl, accessCount }}: LinkInfoParams) {
    const { mutateAsync: deleteLinkFn } = useMutation({
        mutationFn: deleteShortenedUrl,
        onSuccess: (_, { id }, __) => {
            deleteFromCache(id)
        },
        onError: () => {
            toast.error('Erro ao deletar link', {
                description: `Um erro ocorreu ao deletar o link`
            })
        }
    })

    function handleDeleteLink(id: string, shortenedUrl: string) {
        if (window.confirm(`Você deseja realmente apagar o link ${shortenedUrl}?`)) {
            deleteLinkFn({ id })
        } 
    }

    function deleteFromCache(id: string) {
        const cached = queryClient.getQueryData<ListShortenedUrlsOutput>(['all-shortened-urls'])
        if (cached) {
            const filteredItems = cached.items.filter(item => item.id != id)

            // udpate http cache
            queryClient.setQueryData<ListShortenedUrlsOutput>(['all-shortened-urls'], {
                items: filteredItems
            })
        }

        return { cached }
    }

    function handleAddLinkToClipboard(shortenedLink: string) {
        const fullShortenedLink = `${env.VITE_FRONTEND_URL}/${shortenedLink}`
        navigator.clipboard.writeText(fullShortenedLink)
        toast.info('Link copiado com sucesso', {
            description: `O link ${shortenedLink} foi copiado para a àrea de transferência`
        })
    }

    return (
        <LinkInfoContainer>
            <UrlInfo>
                <NavLink to={`/${shortenedUrl}`}>
                    <h3>{`${env.VITE_FRONTEND_URL}/${shortenedUrl}`}</h3>
                </NavLink>
                <span>{originalUrl}</span>
            </UrlInfo>
            <Actions>
                <span>{accessCount} acessos</span>
                <IconButton onClick={() => handleAddLinkToClipboard(shortenedUrl)}>
                    <Copy size={16} />
                </IconButton>
                <IconButton onClick={() => handleDeleteLink(id, shortenedUrl)}>
                    <Trash size={16} />
                </IconButton>
            </Actions>
        </LinkInfoContainer>
    )
}