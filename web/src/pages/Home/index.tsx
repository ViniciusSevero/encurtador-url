import logo from '../../assets/Logo.svg'
import { FormNewLink } from './components/FormNewLink'
import { MyLinks } from './components/MyLinks'
import { Header, MainContainer } from './styles'

export function Home() {

  return (
    <>
      <Header>
        <img src={logo} />
      </Header>

      <MainContainer>
        <FormNewLink />

        <MyLinks />

      </MainContainer>
    </>
  )
}
