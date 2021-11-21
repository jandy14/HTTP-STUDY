function stores(parent, args, context, info) {
    return context.stores;
}
function store(parent, args, context, info) {
    return context.stores.find(element => element.id === args.id)
}
function product(parent, args, context, info) {
    return context.products.find(element => element.id === args.id)
}

module.export = {
    stores,
    store,
    product,
}