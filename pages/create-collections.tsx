import * as web3 from '@alephium/web3'
import { useState } from 'react'
import { NFTCollection } from '../utils/nft-collection'
import TxStatusAlert, { useTxStatusStates } from './tx-status-alert'
import { ipfsClient } from '../utils/ipfs'
import { useAlephiumConnectContext } from '@alephium/web3-react'
import { useRouter } from 'next/router'

export default function CreateCollections() {
  const [fileUrl, setFileUrl] = useState<string | undefined>(undefined)
  const [formInput, updateFormInput] = useState({ name: '', description: '' })
  const context = useAlephiumConnectContext()
  const router = useRouter()

  const [
    ongoingTxId,
    setOngoingTxId,
    ongoingTxDescription,
    setOngoingTxDescription,
    txStatusCallback,
    setTxStatusCallback,
    resetTxStatus
  ] = useTxStatusStates()

  async function onChange(e: any) {
    const file = e.target.files[0]
    try {
      const added = await ipfsClient.add(
        file,
        {
          progress: (prog) => console.log(`received: ${prog}`)
        }
      )
      const url: string = `https://alephium-nft.infura-ipfs.io/ipfs/${added.cid}`
      setFileUrl(url)
    } catch (error) {
      console.log('Error uploading file: ', error)
    }
  }

  async function uploadToIPFS(): Promise<string | undefined> {
    const { name, description } = formInput
    if (!name || !description || !fileUrl) return
    /* first, upload to IPFS */
    const data = JSON.stringify({
      name, description, image: fileUrl
    })
    try {
      const added = await ipfsClient.add(data)
      const url = `https://alephium-nft.infura-ipfs.io/ipfs/${added.cid}`
      /* after file is uploaded to IPFS, return the URL to use it in the transaction */
      return url
    } catch (error) {
      console.log('Error uploading file: ', error)
    }
  }

  async function createCollection() {
    const uri = await uploadToIPFS()
    if (uri && context.signerProvider?.nodeProvider && context.account) {
      const nftCollection = new NFTCollection(context.signerProvider)

      const createCollectionTxResult = await nftCollection.createOpenCollection(uri)
      console.debug('create collection TxResult', createCollectionTxResult)
      setOngoingTxId(createCollectionTxResult.txId)
      setOngoingTxDescription('minting NFT')

      let txNotFoundRetries: number = 0
      setTxStatusCallback(() => async (txStatus: web3.node.TxStatus) => {
        if (txStatus.type === 'Confirmed') {
          resetTxStatus()
          router.push(`/collections?collectionId=${createCollectionTxResult.contractInstance.contractId}`)
        } else if (txStatus.type === 'TxNotFound') {
          if (txNotFoundRetries >= 10) {
            console.info('Create collection transaction not found after 30 seconds, give up.')
            resetTxStatus()
          } else {
            txNotFoundRetries = txNotFoundRetries + 1
            console.info('Create collection transaction not found, retrying...')
          }
        }
      })
    } else {
      console.debug('context..', context)
    }
  }

  function isPositiveNumber(str: string): Boolean {
    const num = parseInt(str, 10)
    return !isNaN(num) && num > 0
  }

  return (
    <>
      {
        ongoingTxId ? <TxStatusAlert txId={ongoingTxId} description={ongoingTxDescription} txStatusCallback={txStatusCallback} /> : undefined
      }

      <div className="flex justify-center">
        <div className="w-1/2 flex flex-col pb-12">
          <input
            placeholder="Collection Name"
            className="mt-2 border rounded p-4"
            onChange={e => updateFormInput({ ...formInput, name: e.target.value })}
          />
          <textarea
            placeholder="Collection Description"
            className="mt-2 border rounded p-4"
            onChange={e => updateFormInput({ ...formInput, description: e.target.value })}
          />
          <input
            type="file"
            name="Asset"
            className="my-4"
            onChange={onChange}
          />
          {
            fileUrl && (
              <img className="rounded mt-4" width="350" src={fileUrl} />
            )
          }
          <button onClick={createCollection} className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg">
            Create Collection
          </button>
        </div>
      </div>
    </>
  )
}
