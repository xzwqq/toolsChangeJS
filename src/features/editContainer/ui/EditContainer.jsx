import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { EditActions } from "../model/editSlice";
import { ToolsSendActions } from '../../formToolsSend/model/toolsSendSlice.js';
import Spinner from "../../../lib/spinner/Spinner.jsx";

const EditContainer = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const toolSelecteC = useSelector(state => state.toolsSend.selectC);
  const isLoading = useSelector(state => state.edit.isLoading);
  const container = useSelector(state => state.edit.container);
  const manufacturers = useSelector(state => state.toolsSend.selectM);
  const [files, setFiles] = useState([]);
  const [filesToDelete, setfilesToDelete] = useState([''])
  const [formData, setFormData] = useState({
    type: '',
    condition: '',
    price: '',
    categoryId: '',
    manufacturerId: '',
    description: '',
  });

  // Инициализация formData данными из container
  useEffect(() => {
    if (container) {
      setFormData({
        type: container.type || '',
        condition: container.condition || '',
        price: container.price || '',
        categoryId: container.category?.id || '',
        manufacturerId: container.manufacturer?.id || '',
        description: container.description || '',
      });
    }
  }, [container]);

  const submitForm = (e) => {
    e.preventDefault();
    const data = {
      tool: formData,
      files: files, 
      id: id,
      filesToDelete: filesToDelete,
    }  
    dispatch(EditActions.submitMyContainer(data))
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    dispatch(EditActions.submitGetContainer(id));
    dispatch(ToolsSendActions.submitSelectC());
    dispatch(ToolsSendActions.submitSelectM());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <form onSubmit={submitForm}>
        <select name='type' value={formData.type} onChange={handleChange}>
          <option value=''>Выберите</option>
          <option value='EXCHANGE'>Обмен</option>
          <option value='RENT'>Аренда</option>
          <option value='SALE'>продажа</option>
        </select>

        <select name='condition' value={formData.condition} onChange={handleChange}>
          <option value=''>Выберите</option>
          <option value='USED'>б/у</option>
          <option value='NEW'>новое</option>
        </select>

        <select name='categoryId' value={formData.categoryId} onChange={handleChange}>
          <option value=''>Выберите инструмент</option>
          {toolSelecteC?.map(tools => (
            <option key={tools.id} value={tools.id}>
              {tools.name}
            </option>
          ))}
        </select>

        <select name='manufacturerId' value={formData.manufacturerId} onChange={handleChange}>
          <option value=''>Выберите производителя</option>
          {manufacturers?.map(manufacturer => (
            <option key={manufacturer.id} value={manufacturer.id}>
              {manufacturer.name}
            </option>
          ))}
        </select>

        <input name='price' value={formData.price} onChange={handleChange} type='text' />

        <input name='description' value={formData.description} onChange={handleChange} type='text' />

        <input name='files' type='file' multiple onChange={handleFileChange} />

        <button type='submit'>Сохранить</button>
      </form>

      <div className="editphoto">
        {container.photos?.map((photo, index) => (
          <div key={index} className="editPhotos">
            <img src={photo} alt={`фото ${index + 1}`} />
          </div>
        ))}
      </div>
    </>
  );
};

export default EditContainer;