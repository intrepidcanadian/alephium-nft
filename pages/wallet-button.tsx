import { useContext } from "react"
import { AlephiumWeb3Context } from './alephium-web3-providers'
import { disconnect as extensionDisconnect, connect as extensionConnect } from "@h0ngcha0/get-extension-wallet"

const WalletButton = () => {
  const context = useContext(AlephiumWeb3Context)

  async function connect() {
    console.log("provider", context.signerProvider?.type)
    switch (context.signerProvider?.type) {
      case 'WalletConnectProvider': {
        await context.signerProvider.provider.connect()
        break;
      }

      case 'BrowserExtensionProvider': {
        const windowAlephium = await extensionConnect({
          include: ["alephium"],
        })
        await windowAlephium?.enable()
        if (windowAlephium && context.setSignerProviderFunc && context.setSelectedAccountFunc) {
          context.setSignerProviderFunc(windowAlephium)
          windowAlephium.defaultAddress &&
            context.setSelectedAccountFunc(windowAlephium.defaultAddress)
        }
        break;
      }
    }
  }

  async function disconnect() {
    switch (context.signerProvider?.type) {
      case 'WalletConnectProvider': {
        await context.signerProvider.provider.disconnect()
        break;
      }

      case 'BrowserExtensionProvider': {
        extensionDisconnect()
        break;
      }
    }
  }

  const showButton = context.signerProvider && (
    context.signerProvider.type === 'WalletConnectProvider' ||
    context.signerProvider.type === 'BrowserExtensionProvider'
  )

  return (
    showButton ?
      (
        !context.selectedAccount ?
          <button className="btn btn-outline btn-sm btn-accent" onClick={connect}>Connect</button> :
          <button className="btn btn-outline btn-sm btn-secondary" onClick={disconnect}>Disconnect</button>
      ) : null
  )
}

export default WalletButton