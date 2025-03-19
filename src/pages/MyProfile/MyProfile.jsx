import { Container } from "../../features/container/index.js"
import {FormToolsSend} from '../../features/formToolsSend/index.js'

const MyProfile = () => {
    
  return (
    <div>
        <h1>My profile</h1>
        <FormToolsSend />
        <Container type={'my'}/>
    </div>
  )
}

export default MyProfile