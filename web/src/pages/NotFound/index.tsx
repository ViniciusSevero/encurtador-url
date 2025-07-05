import logo from '@/assets/404.svg'
import { ImageNotFound } from './styles'

export function NotFound() {

  return (
      <>
        <ImageNotFound src={logo} />
        <h1>Link não encontrado</h1>
        <div>
          <p>O link que você está tentando acessar não existe, foi removido ou é uma URL inválida. Saiba mais em <a href="">brev.ly</a>.</p>
        </div>
      </>
  )
}