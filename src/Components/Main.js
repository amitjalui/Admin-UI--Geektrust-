import React, { useState, useEffect } from "react";
import axios from "axios";
import { config } from '../App';
import TableUI from './TableUI'

const Main = () => {
    const [search, setSearch] = useState('');
    const [users, setUsers] = useState([]);
    const [filterUsers, setFilterUsers] = useState([]);
    let userId = [];      // storing userId, to delete selected user 

    /* fetching list of user details */
    const getUsers = async() => {
      try {
        const getResponse = await axios.get(config.endpoint);
        setUsers(getResponse.data);
        setFilterUsers(getResponse.data);
      } catch (error) {
        console.log('App', error);
      }
    }

    /* deleting only all selected users */
    const handleDelete = () => {
        const result = filterUsers.filter(user => {
            return userId.indexOf(user.id) < 0; 
        })
        setFilterUsers(result);
    }

    /* edit user details */
    const handleEdit = (e) => {
        const update = filterUsers.filter(user => {
            return user.id === e.target.id 
                ? (user.name = prompt('enter name'),
                    user.email = prompt('enter email'),
                    user.role = prompt('enter role'))
                : user;
        })
        setFilterUsers(update);
    }

    /* delete one user */
    const handleSingleDelete = (e) => {
        const result = filterUsers.filter((user) => {
            return e.target.id.indexOf(user.id) < 0;
        });
        setFilterUsers(result);        
    }


    /* invoking fetching function, dependency: one-time */
    useEffect(() => {
        getUsers();
    }, []);


    /*  
        update list on user search
        render , dependency: as many time search changes 
    */
    useEffect(() => {
        const result = users.filter(user => {
            return user.name.toLowerCase().match(search.toLowerCase())
            
        })
        setFilterUsers(result);
    }, [search]);

    return ( 
        <>  
            <TableUI 
                filterUsers={filterUsers}
                setFilterUsers={setFilterUsers}
                userId={userId}
                search={search}
                handleDelete={handleDelete}
                setSearch={setSearch}
                handleEdit={handleEdit}
                handleSingleDelete={handleSingleDelete}
            />
        </>
    )
}

export default Main;