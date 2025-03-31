import { Container } from "../../features/container/index.js"
import { Header } from "../../widgets/Header/index.js"

const MyProfile = () => {
    const type =  'my'  

  return (
    <div className="root__my">
        <Header/>
        <Container type={type}/>
    </div>
  )
}

export default MyProfile