import { Container } from "../../features/container/index.js"
import {FormToolsSend} from '../../features/formToolsSend/index.js'

const MyProfile = () => {
    const type =  'my'  

  return (
    <div>
        <h1>My profile</h1>
        <FormToolsSend />
        <Container type={type}/>
    </div>
  )
}

export default MyProfile