import { useMutation } from "@tanstack/react-query";
import { FormContainer, FormControlGroup, InputBox, ValidationMessage } from "./styles";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { saveShortenedUrl } from "@/api/save-shortened-url";
import z from "zod";
import { toast } from "sonner";
import { queryClient } from "@/lib/react-query";
import type { ListShortenedUrlsOutput } from "@/api/list-shortened-urls";
import { Warning } from "phosphor-react";
import { AxiosError } from "axios";

const saveLinkForm = z.object({
  originalUrl: z.string().url('A url original é inválida!'),
  shortenedUrl: z.string().min(3, 'O link encurtado deve ter pelo menos 3 caracteres!'),
})

type SaveLinkForm = z.infer<typeof saveLinkForm>

export function FormNewLink() {
    const { register, handleSubmit, formState: { isSubmitting, errors }  } = useForm<SaveLinkForm>({
      resolver: zodResolver(saveLinkForm)
    });

    const {mutateAsync: saveLinkFn} = useMutation({
      mutationFn: saveShortenedUrl,
      onSuccess: ({id}, {originalUrl, shortenedUrl}, __) => {
        inserLinkOnCache(id, {originalUrl, shortenedUrl})
      },
      onError: (error, variables, _) => {
        if(error instanceof AxiosError) {
          if(error.status === 409) {
            toast.error(`O link ${variables.shortenedUrl} já existe` )
            return
          }
        }
        toast.error(`Erro ao cadastrar o link ${variables.shortenedUrl}` )
      }
    })

    async function handleSaveLink({originalUrl, shortenedUrl}: SaveLinkForm) {
        
          const preffix = 'brev.ly/'
          shortenedUrl = shortenedUrl.replace(preffix, '')

          saveLinkFn({
              originalUrl,
              shortenedUrl
          })
    }

    function inserLinkOnCache(id: string, {originalUrl, shortenedUrl}: SaveLinkForm) {
      const cached = queryClient.getQueryData<ListShortenedUrlsOutput>(['all-shortened-urls'])
      if (cached) {

          // udpate http cache
          queryClient.setQueryData<ListShortenedUrlsOutput>(['all-shortened-urls'], {
              items: [
                ...cached.items,
                {
                  id,
                  originalUrl,
                  shortenedUrl,
                  accessCount: 0,
                  createdAt: new Date()
                }
              ]
          })
      }

      return { cached }
    }
    
    return (
        <FormContainer>
          <h2>Novo Link</h2>

          <form onSubmit={handleSubmit(handleSaveLink)}>
            <FormControlGroup>
              <label htmlFor="originalUrl">Link Original</label>
              <input 
                id="originalUrl"
                type="text" 
                placeholder="www.exemplo.com.br" 
                data-invalid={errors.originalUrl}
                {...register('originalUrl')}
              />
              
                {errors.originalUrl && (
                  <ValidationMessage>
                    <Warning />
                    <p>{errors.originalUrl.message}</p>
                  </ValidationMessage>
                )}
            </FormControlGroup>

            <FormControlGroup>
              <label htmlFor="shortenedUrl">Link encurtado</label>
              <InputBox
                data-invalid={errors.shortenedUrl}
              >
                <span className="prefix">brev.ly/</span>
                <input 
                  id="shortenedUrl"
                  type="text" 
                  {...register('shortenedUrl')}
                />
              </InputBox>
                {errors.shortenedUrl && (
                  <ValidationMessage>
                    <Warning />
                    <p>{errors.shortenedUrl.message}</p>
                  </ValidationMessage>
                )}
            </FormControlGroup>

            <button type='submit' disabled={isSubmitting}>
              Salvar link
            </button>
          </form>
        </FormContainer>
    )
}