import { StaticImageData } from 'next/image';
import images from '../assets';
import * as bs58 from 'bs58'

export function shortenAddress(address: string): string {
  return `${address.slice(0, 5)}...${address.slice(address.length - 4)}`
};

export function addressToCreatorImage(address: string): StaticImageData {
  const hex = Buffer.from(bs58.decode(address)).toString('hex')
  const index = Number(BigInt('0x' + hex) % 10n)
  return (images as { [key: string]: StaticImageData })[`creator${index + 1}`]
}

export const shortenName = (name: string) => (
  `${name.slice(0, 14)}...`
)

export function maybeConvertIPFSUrl(url: string): string {
  if (url.startsWith('ipfs://')) {
    return `https://ipfs.io/ipfs/${url.slice(7)}`
  }
  return url
}
