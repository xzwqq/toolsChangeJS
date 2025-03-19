import { useEffect, useState } from 'react'
import {ApiHome} from '../../shared/api/APIHome.js'
const MyProfile = () => {
    const [container, setContainer] = useState([])

    useEffect(()=>{
        setContainer(ApiHome())
        console.log(container)
    },[container])
  return (
    <div>
        <h1>My profile</h1>
        {container?.map(content => {
					console.log(content.photos);
					return(
						<div key={content.id} className="cont">
						 <h2>{content.owner.firstname}</h2>
						 <img src={content.photos} className='img' alt="" />
						 </div>
						)
				})}
    </div>
  )
}

export default MyProfile