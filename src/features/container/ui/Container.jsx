import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ContainerActions } from '../model/containerSlice';
import './containerStyle.scss'

const Container = type => {
	const container = useSelector(state => state.container.container);
	const dispatch = useDispatch();

	useEffect(() => {
		if (type === 'my') {
			dispatch(ContainerActions.submitMyContainer());
		} else {
			dispatch(ContainerActions.submitAllContainer());
		}
	}, [dispatch, type]);

	return (
		<div className='container'>
			{container?.map(content => {
				if (type === 'my') {
					return (
						<div key={content.id} className='container-item'>
							<img src={content.photos} className='img' alt='фото обьявления' />
							<h2>{content.owner.firstname}</h2>
							<button onClick={() => dispatch(ContainerActions.submitDeleteMyContainer(content.id))}>delete</button>
						</div>
					)
				}else{
                    return (
						<div key={content.id} className='container-item'>
							<img src={content.photos} className='img' alt='фото обьявления' />
							<h2>{content.owner.firstname}</h2>
						</div>
                    )
                }
			})}
		</div>
	);
};

export default Container;
