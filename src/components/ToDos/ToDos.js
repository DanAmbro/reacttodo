import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import SingleToDo from "./SingleToDo";
import "./ToDos.css";
import CatFilter from "./CatFilter";
import { useAuth } from '../../contexts/AuthContext'
import ToDoCreate from "./ToDoCreate";

//Steps to Read functionality
//1. add useState and useEffect to the react import
//2. install and import axios
//3. create the hook to store the data
//4. create the function that uses axios to get the resources
//5. create useEffect to automate retrieval of data in this component
//----- You should now have your data stored, and now on to the UI
//6. use .map to render each resource to the screen
//(also add any supplemental UI (container for the gallery)...combo of Resources/SingleResource)

export default function ToDos() {
  const [toDos, setToDos] = useState([]);

  const { currentUser } = useAuth()
  const [showCreate, setShowCreate] = useState(false);

  //Filtering steps - use .filter() to create a limited list of resources.
  //1. Create a hook that will store values for what the user wants to filter resources by...this 
  //hook will store the categoryId for the category they want to filter by.
  //2. place the conditional rendering for when filter === 0 in the initial map of resources
  //3. Create FilterCat to give the buttons to the user to filter by
  //4. Render in resources...see below
  //5. Create the conditional rendering for when filter != 0...see below

  const [filter, setFilter] = useState(0);//Zero is not an id in ResourcesDB so we can use it as

  const getToDos = () => {
    axios.get(`https://localhost:7273/api/ToDos`).then((response) => {
      setToDos(response.data);
    });
  };

  useEffect(() => {
    getToDos()
  }, []);

  return (
    <section className="todos">
      <article className="bg-info p-5">
        <h1 className="text-center">ToDo DashBoard</h1>
      </article>
      {currentUser.email === process.env.REACT_APP_ADMIN_EMAIL &&
        <div className="bg-dark p-2 mb-3 text-center">
            <button className="btn btn-info" onClick={() => setShowCreate(!showCreate)}>
              {!showCreate ? 'Create New ToDo' : 'Cancel'}
            </button>
            <div className="createContainer">
              {showCreate &&
                  <ToDoCreate getToDos={getToDos} setShowCreate={setShowCreate} />
              }
            </div>
        </div>


      }
      <CatFilter setFilter={setFilter} />
      <Container>
        <article className="todoGallery row justify-content-center">
           {filter === 0 ? toDos.map(t => 
                //SingleResource will map each resource to a tile 
               <SingleToDo key={t.toDoId} todo={t} getToDos={getToDos} />
             ) :
            toDos.filter(t => t.categoryId === filter).map(t =>
                //SingleResource will map each resource to a tile 
               <SingleToDo key={t.toDoId} todo={t} getToDos={getToDos} />
             )
           }

           {filter !== 0 && toDos.filter(t => t.categoryId === filter).length === 0 &&
                <h2 className="alert alert-warning text-dark">
                    There are not results for this category
                </h2>
           }
        </article>
      </Container>
    </section>
  );
}
