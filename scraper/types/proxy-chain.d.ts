declare module 'proxy-chain' {
    export default {
        anonymizeProxy(
            proxyUrl: string,
            username?: string,
            password?: string
        ): Promise<string>,

        closeAnonymizedProxy(
            serverUrl: string,
            closeConnections: boolean
        ): Promise<void>
    }
}
