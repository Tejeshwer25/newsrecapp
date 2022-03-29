import React from 'react';

const user = sessionStorage.getItem("email") ? sessionStorage.getItem("email") : ""

const Context = React.createContext({
    userId: "",
    name: "",
    email: user, 
    topics: [],
});

export {Context};