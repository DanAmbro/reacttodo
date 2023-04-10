import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Container } from 'react-bootstrap'
import SingleCategory from './SingleCategory';
import { useAuth } from '../../contexts/AuthContext';
import CatCreate from './CatCreate';

//Steps to Read functionality
//1. add useState and useEffect to the react import
//2. install and import axios
//3. create the hook to store the data
//4. create the function that uses axios to get the categories
//5. create useEffect to automate retrieval of data in this component
//----- You should now have your data stored, and now on to the UI
//6. use .map to render each category to the screen 
//(also add any supplemental UI (table and thead)...combo of Categories and SingleCategory)

//Steps to Create functionality
//1. Create validationSchema and form specific to Categories
//2. import currentUser from the context
//3. Create a react hook to show/hide the form
//4. Create and render CatCreate in the conditonal rendering, based on whether the user is an admin or not
//5. Update the create functionality in CatForm.js

export default function Categories() {
    //hook to store the data returned fron the API
    const [categories, setCategories] = useState([]);

    //This currentUser object is brought in from our context to implement create functionality
    const { currentUser } = useAuth()
    //Below this hook will serve to show/hide the create form in Categories.js
    const [showCreate, setShowCreate] = useState(false);


    const getCategories = () => {
        axios.get(`https://localhost:7273/api/Categories`).then(response => {
            console.log(response)
            setCategories(response.data)
        })
    }

    useEffect(() => {
        getCategories()
    }, []);

  return (
    <section className="categories">
        <article className="bg-info p-5">
            <h1 className="text-center">Categories Dashboard</h1>
        </article>
        {currentUser.email === process.env.REACT_APP_ADMIN_EMAIL &&
            <div className="bg-dark p-2 mb-3 text-center">
                {showCreate ? 
                    <>
                        <button className="btn btn-warning" onClick={() => setShowCreate(false)}>Cancel</button>
                        <CatCreate getCategories={getCategories} setShowCreate={setShowCreate} />
                    </>
                : <button className="btn btn-info" onClick={() => setShowCreate(true)}>Create Category</button>    
                }
            </div>

        }
        <Container className='p-2'>
            <table className='table bg0info table-dark my-3'>
                <thead className='table-secondary text-uppercase'>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        {currentUser.email === process.env.REACT_APP_ADMIN_EMAIL &&
                            <th>Actions</th>
                        }    

                    </tr>
                </thead>
                <tbody>
                    {categories.map(c => 
                          <SingleCategory key={c.categoryId} category={c} getCategories={getCategories}/>
                        )}
                </tbody>
            </table>
        </Container>
    </section>
  )
}
