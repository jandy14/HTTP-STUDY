const { Kind,GraphQLScalarType } = require('graphql')

const myCustomScalarType = new GraphQLScalarType({
    name: 'MyCustomScalar',
    description: 'Description of my custom scalar type',
    serialize(value) {
        let result = value.getTime()
        return result
    },
    parseValue(value) {
        let result = new Date(value)
        return result
    },
    parseLiteral(ast) {
        if (ast.kind === Kind.INT) {
            return new Date(+ast.value) // ast value is always in string format
        }
        return new Date()
    }
})

module.exports = {
    myCustomScalarType,
}