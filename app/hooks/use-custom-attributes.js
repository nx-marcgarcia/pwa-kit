/*
 * This hook will return custom attributes in the product object
 */
export const useCustomAttributes = (product) => {
    let customAttributes = {}
    Object.getOwnPropertyNames(product).map((val) => {
        if (val.indexOf('c_') === 0) {
            customAttributes[val] = product[val]
        }
    })
    return customAttributes
}
