



export const spoofNavigatorProperty = (propertyName: string, value: any) => {
    spoofProperty(navigator, propertyName, value)
}
export const spoofScreenProperty = (propertyName: string, value: any) => {
    spoofProperty(screen, propertyName, value)
}

const spoofProperty = (jsObject: Object, propertyName: string, value: any) => {
    Object.defineProperty(jsObject, propertyName, {
        configurable: true,
        // writable: false,
        // enumerable: true,
        get: () => value,
    })
}