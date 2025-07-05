import { useNavigate, useParams } from "react-router";
import { ImageRedirect } from "./styles";
import logo from '@/assets/Logo_Icon.svg'
import { useMutation, useQuery } from "@tanstack/react-query";
import { getOriginalUrl } from "@/api/get-original-url";
import { useEffect } from "react";
import { incrementAccessCount } from "@/api/increment-access-count";

export function ShortenedUrl() {

  const { shortenedUrl } = useParams(); 
  const navigate = useNavigate();

  const { data: result, isError } = useQuery({
      queryKey: ['shortened-url', shortenedUrl],
      queryFn: () => getOriginalUrl({ shortenedUrl: shortenedUrl ?? 'not-found'}),
      enabled: !!shortenedUrl,
      retry: false
  })

  const { mutateAsync: incrementAccessCountFn } = useMutation({
    mutationFn: incrementAccessCount,
    onSuccess: () => {
      if(!result) {
        return;
      }
      window.location.href = result?.originalUrl
    },
    onError: () => {
      navigate('/not-found')
    }
})

  useEffect(() => {
    if(result) {
      incrementAccessCountFn({id: result.id})
    }
  }, [result])

  useEffect(() => {
    if(isError) {
      navigate('/not-found')
    }
  }, [isError])

  return (
      <>
        <ImageRedirect src={logo} />
        <h1>Redirecionando... </h1>
        <div>
          <p>O link será aberto automaticamente em alguns instantes.</p>
          {result?.originalUrl ? (
            <p>Não foi redirecionado? <a href={result.originalUrl}>Acesse aqui</a></p>
          ): (
            <p>Não foi redirecionado? <a href="">Acesse aqui</a></p>
          )}
        </div>
      </>
  )
}