import React, { useState, useEffect } from 'react'
import { Formik, Form, Field } from 'formik'
import { toDoSchema } from '../../utilities/validationSchema'
import axios from 'axios'

export default function ToDoForm(props) {
    // We need to get categories from the API to populate the dropdown list/select list
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get(`https://localhost:7273/api/Categories`).then(response => {
            setCategories(response.data)
        })
    }, []);

    const handleSubmit = (values) => {
        console.log(values)
        if(!props.todo) {
            //If there's no resource object in our props, we are in "create" mode and are limited to this scope
            const toDoToCreate = values

            axios.post(`https://localhost:7273/api/ToDo`, toDoToCreate).then(() => {
                props.setShowCreate(false)
                props.getToDos()
            })
        }
        else{
            //Any code in this scope will only execute if we are in "edit" mode
            const toDoToEdit = {
                toDoId: props.toDo.toDoId,
                name: values.name,                
                done: values.done
            }

            axios.put(`https://localhost:7273/api/ToDos/${props.resource.resourceId}`, toDoToEdit).then(() => {
                props.setShowEdit(false)
                props.getToDos()
            })
        }
    }
  return (
    <Formik
        initialValues={{
            name: props.todo ? props.todo.name : '',            
            done: props.todo ? props.todo.description : '',
            categoryId: props.todo ? props.todo.categoryId : ''
        }}
        validationSchema={toDoSchema}
        onSubmit={(values) => handleSubmit(values)}>
            {({ errors, touched }) => (
                <Form id='toDoForm'>
                    <div className="form-group m-3">
                        <Field name='name' className='form-control' placeholder='Name' />
                        {errors.name && touched.name &&
                            <div className='text-danger'>{errors.name}</div>
                        }
                    </div>
                   
                    <div className="form-group m-3">
                        <Field name='done' as='textarea' className='form-control' placeholder='Done' 
                            style={{ resize: 'none', height: '5em'}} />
                        {errors.done && touched.done &&
                            <div className='text-danger'>{errors.done}</div>
                        }
                    </div>
                    <div className="form-group m-3">
                        <Field name='categoryId' as='select' className='form-control'>
                            <option value='' disabled>
                                [--Please Choose--]
                            </option>
                            {categories.map(cat => 
                                    <option key={cat.categoryId} value={cat.categoryId}>
                                       {cat.categoryName}     
                                    </option>
                                )}    
                        </Field>                                            
                    </div>
                    <div className="form-group m-3">
                        <button  typr='submit' className="btn btn-info m-3">
                            Sumit Resource to API
                        </button>
                    </div>
                </Form>
            )}
    </Formik>
  )
}
