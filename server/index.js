const express = require('express')
const {graphqlHTTP} = require("express-graphql")
const cors = require('cors')
const app = express()
app.use(cors())
const schema = require("./schema")
const users = [{id: 1, username: "Georgiy", age: 25}]
const createUser = (input) =>{
    const id = Date.now()
    return {
        id, ...input
    }
}
const root = {
    getAllUsers: () => {
        console.log(users)
        return users
    }, 
    getUser: ({id})=>{
        return users.find(user => user.id == id)
    },
    createUser: ({input})=>{
        const user = createUser(input)
        users.push(user)
        console.log(users)
        return user
    }

}

app.use("/graphql", graphqlHTTP({
    graphiql: true, 
    schema, 
    rootValue: root
}))

app.listen(5000, () => console.log(`server has been started on port:`))