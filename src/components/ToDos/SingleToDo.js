import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { FaEdit } from 'react-icons/fa'
import ToDoEdit from './ToDoEdit';

export default function SingleToDo(props) {
  const { currentUser } = useAuth()
  const [showEdit, setShowEdit] = useState();

  return (
    <div className='singletoDo col-md-5 m-4'>
        {currentUser.email === process.env.REACT_APP_ADMIN_EMAIL &&
          <div>
            <button id="editLink" onClick={() => setShowEdit(true)}>
              <FaEdit />
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
        <h3>{props.resource.name}</h3>
        {props.resource.description !== null ?
            <p>{props.resource.description}</p> :
            <p>No Description Provided</p> 
        }
        <a href={props.resource.url} target='_blank' rel='noreferrer' className='btn btn-info'>
            Visit {props.resource.linkText}
        </a>
    </div>
  )
}
