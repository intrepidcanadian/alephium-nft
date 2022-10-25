import * as web3 from '@alephium/web3'
import { DeployHelpers } from './deploy-helpers'
import nftArtifact from '../artifacts/nft.ral.json'
import nftCollectionArtifact from '../artifacts/nft_collection.ral.json'
import mintNFTArtifact from '../artifacts/mint_nft.ral.json'
import burnNFTArtifact from '../artifacts/burn_nft.ral.json'
import depositNFTArtifact from '../artifacts/deposit_nft.ral.json'
import withdrawNFTArtifact from '../artifacts/withdraw_nft.ral.json'
import { addressFromContractId } from '@alephium/web3'

export class NFTCollection extends DeployHelpers {
  defaultNFTCollectionAddress: string = addressFromContractId("0".repeat(64))

  async create(
    collectionName: string,
    collectionDescription: string,
    collectionUri: string
  ): Promise<web3.DeployContractTransaction> {
    const nftContract = web3.Contract.fromJson(nftArtifact)

    const nftDeployTx = await nftContract.deploy(
      this.signer,
      {
        initialFields: {
          owner: (await this.signer.getSelectedAccount()).address,
          isTokenWithdrawn: false,
          name: web3.stringToHex("template_name"),
          description: web3.stringToHex("template_description"),
          uri: web3.stringToHex("template_uri"),
          collectionAddress: this.defaultNFTCollectionAddress
        }
      }
    )

    const nftCollectionContract = web3.Contract.fromJson(nftCollectionArtifact)

    const nftCollectionDeployTx = await nftCollectionContract.deploy(
      this.signer,
      {
        initialFields: {
          nftTemplateId: nftDeployTx.contractId,
          collectionName: web3.stringToHex(collectionName),
          collectionDescription: web3.stringToHex(collectionDescription),
          collectionUri: web3.stringToHex(collectionUri)
        }
      }
    )

    return nftCollectionDeployTx
  }

  async mintNFT(
    nftCollectionContractId: string,
    nftName: string,
    nftDescription: string,
    nftUri: string
  ) {
    const script = web3.Script.fromJson(mintNFTArtifact)

    return await script.execute(
      this.signer,
      {
        initialFields: {
          nftCollectionContractId: nftCollectionContractId,
          name: web3.stringToHex(nftName),
          description: web3.stringToHex(nftDescription),
          uri: web3.stringToHex(nftUri)
        }
      }
    )
  }

  async burnNFT(nftContractId: string, gasAmount?: number, gasPrice?: bigint) {
    const script = web3.Script.fromJson(burnNFTArtifact)

    return await script.execute(
      this.signer,
      {
        initialFields: {
          nftContractId: nftContractId
        },
        gasAmount: gasAmount,
        gasPrice: gasPrice
      }
    )
  }

  async depositNFT(
    nftContractId: string,
    gasAmount?: number,
    gasPrice?: bigint
  ): Promise<web3.SignExecuteScriptTxResult> {
    const script = web3.Script.fromJson(depositNFTArtifact)

    return await script.execute(
      this.signer,
      {
        initialFields: {
          nftContractId: nftContractId
        },
        gasAmount: gasAmount,
        gasPrice: gasPrice
      }
    )
  }

  async withdrawNFT(
    nftContractId: string,
    gasAmount?: number,
    gasPrice?: bigint
  ): Promise<web3.SignExecuteScriptTxResult> {
    const script = web3.Script.fromJson(withdrawNFTArtifact)

    return await script.execute(
      this.signer,
      {
        initialFields: {
          nftContractId: nftContractId
        },
        gasAmount: gasAmount,
        gasPrice: gasPrice
      }
    )
  }
}
