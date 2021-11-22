function products(parent, args, context, info) {
    return context.products.filter(element => element.storeId == parent.id)
}

module.exports = {
    products,
}