function store(parent, args, context, info) {
    const item = {
        id: context.stores.length,
        title: args.title,
        description: args.description,
    }
    context.stores.push(item)
    return item
}
function product(parent, args, context, info) {
    const item = {
        id: context.products.length,
        title: args.title,
        price: args.price,
        storeId: args.storeId,
    }
    context.products.push(item)
    return item
}

module.exports = {
    store,
    product,
}