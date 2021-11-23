const { ApolloServer } = require('apollo-server');
const fs = require('fs')
const path = require('path')

const { myCustomScalarType } = require('./scalar/customScalar')

const typeDefs = fs.readFileSync(
    path.join(__dirname, './schema.graphql'),
    'utf8'
)

const resolvers = {
    CustomScalar: myCustomScalarType,

    Query: require("./resolvers/query"),
    Mutation: require('./resolvers/mutation'),

    Store: require('./resolvers/store'),
    Product: require('./resolvers/product'),
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: {
        stores: [],
        products: []
    }
})

server
    .listen()
    .then(({ url }) =>
        console.log(`Server is running on ${url}`)
    )