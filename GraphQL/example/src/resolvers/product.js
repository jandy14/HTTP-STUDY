function store(parent, args, context, info) {
    return context.stores.find(element => element.id === parent.storeId)
}

module.export = {
    store,
}