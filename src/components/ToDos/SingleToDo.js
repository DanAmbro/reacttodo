import React, { useState } from 'react'
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import ToDoEdit from './ToDoEdit';

export default function SingleToDo(props) {
  const { currentUser } = useAuth()
  const [showEdit, setShowEdit] = useState();

  const deleteToDo = (id) => {
    if(window.confirm(`Are you sure you want to delete ${props.toDo.name}?`)) {
      axios.delete(`https://localhost:7273/api/Categories/${id}`).then(() => props.getToDo())
    }
  }

  return (
    <div className='singletoDo col-md-5 m-4'>
        {currentUser.email === process.env.REACT_APP_ADMIN_EMAIL &&
          <div>
            <button id="editLink" onClick={() => setShowEdit(true)}>
              <FaEdit />
            </button>
            <button id="deleteLink" onClick={() => deleteToDo(props.toDo.toDoId)}>
              <FaTrashAlt />
            </button>
            {showEdit &&
              <ToDoEdit
                toDo={props.toDo}
                showEdit={showEdit}
                setShowEdit={setShowEdit}
                getToDo={props.getToDo} />

            }
          </div>
        }
        
    </div>
  )
}
