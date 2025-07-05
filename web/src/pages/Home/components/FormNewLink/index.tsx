import { useMutation } from "@tanstack/react-query";
import { FormContainer, FormControlGroup, InputBox } from "./styles";
import { useForm } from 'react-hook-form';
import { saveShortenedUrl } from "@/api/save-shortened-url";
import z from "zod";
import { toast } from "sonner";
import { queryClient } from "@/lib/react-query";
import type { ListShortenedUrlsOutput } from "@/api/list-shortened-urls";

const saveLinkForm = z.object({
  originalUrl: z.string().url(),
  shortenedUrl: z.string(),
})

type SaveLinkForm = z.infer<typeof saveLinkForm>

export function FormNewLink() {
    const { register, handleSubmit, formState: { isSubmitting }  } = useForm<SaveLinkForm>();

    const {mutateAsync: saveLinkFn} = useMutation({
      mutationFn: saveShortenedUrl
    })

    async function handleSaveLink({originalUrl, shortenedUrl}: SaveLinkForm) {
        
      try {
          const preffix = 'brev.ly/'
          shortenedUrl = shortenedUrl.replace(preffix, '')

          const { id } = await saveLinkFn({
              originalUrl,
              shortenedUrl
          })

          inserLinkOnCache(id, {originalUrl, shortenedUrl})
      } catch (error) {
          toast.error('Erro ao cadastrar Link!')
      }
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
                required
                {...register('originalUrl')}
              />
            </FormControlGroup>

            <FormControlGroup>
              <label htmlFor="shortenedUrl">Link encurtado</label>
              <InputBox>
                <span className="prefix">brev.ly/</span>
                <input 
                  id="shortenedUrl"
                  type="text" 
                  required
                  {...register('shortenedUrl')}
                />
              </InputBox>
            </FormControlGroup>

            <button type='submit' disabled={isSubmitting}>
              Salvar link
            </button>
          </form>
        </FormContainer>
    )
}