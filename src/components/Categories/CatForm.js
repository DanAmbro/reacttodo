import React from 'react'
import { Formik, Form, Field } from 'formik' //This will produce the form for creating/editing a category
import { catSchema } from '../../utilities/validationSchema' 
import axios from 'axios'

export default function CatForm(props) {
    const handleSubmit = (values)  => {
        console.log(values)
        if(!props.category){
            //any code in this scope will only execute if we are in "create" mode
            const catToCreate = values

            //send the object in a POST request to the API
            axios.post(`https://localhost:7273/api/Categories`, catToCreate).then(() => {
                //first we want to close the create form when a new category is submitted
                props.setShowCreate(false)
                //next, we want to display the new set of categories
                props.getCategories()
            })
        }
        else{
            //Any code in this scope will only execute if we are in "edit" mode
            const catToEdit = {
                categoryId: props.category.categoryId,
                categoryName: values.categoryName,
                categoryDescription: values.categoryDescription
            }

            axios.put(`https://localhost:7273/api/Categories/${props.category.categoryId}`, catToEdit).then(() => {
                props.setShowEdit(false)
                props.getCategories()
            })
        }
    }

  return (
    <div className='createCategory m-2 text-white text-center'>
        <Formik 
            initialValues={{
                //Below is a ternary operator that makes our form behave differently based on whether we have a prop
                //called "category" (if we have that prop, we are in "edit mode")
                categoryName: props.category ? props.category.categoryName : '',
                categoryDescription: props.category ? props.category.categoryDescription : ''
            }}
            validationSchema={catSchema}
            onSubmit={values => handleSubmit(values)}>
            {({errors, touched}) => (
                <Form id='carForm' className='row text-center m-auto'>
                    <div className="form-group m-1 p-1">
                        <Field name='categoryName' className='form-control' placeholder='Name' />
                        {errors.categoryName && touched.categoryName ? 
                            <div className="text-danger">{errors.categoryName}</div>
                        : null}                        
                    </div>
                    <div className="form-group m-1 p-1">
                        <Field name='categoryDescription' className='form-control' placeholder='Description' />
                        {errors.categoryDescription && touched.categoryDescription ?
                            <div className="text-danger">{errors.categoryDescription}</div>
                        : null}                        
                    </div>
                    <div className="form-group m-1">
                        <button type='submit' className="btn btn-success">Submit Category to API</button>
                    </div>
                </Form>
            )}
        </Formik>        
    </div>
  )
}
