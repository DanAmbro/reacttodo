//This file will house the schemas for both resources and categories for the create/edit form.
//To bring in a simple validation implementation, we are going to use Yup by installing it in our app
// `npm install yup` (see implementation below)

//Yup will work in tandom with Formik, which is an npm package that creates and stores form inputs for each
//item (categoryName, categoryDescription) that we need to capture in our form. `npm install formik` 

/* This is what we nee for a category object in a POST request:
    {
        categoryName: `some string`,
        categoryDescription: `some other string`
    }

*/
import * as Yup from 'yup'

const catSchema = Yup.object().shape({
    //Below we call to each property that will need to be validated and sue Yup to define the requirements
    //for each property (max length, required, etc.)
    catName: Yup.string().max(25, 'Max 25 characters').required('Required'),
    catDesc: Yup.string().max(50, 'Max 50 characters')
})

const toDoSchema = Yup.object().shape({
    name: Yup.string().max(25, 'Max 25 characters').required('Required'),
    done: Yup.string().max(50, 'Max 50 characters'),    
    categoryId: Yup.number().required('Required')
})

export { toDoSchema, catSchema }