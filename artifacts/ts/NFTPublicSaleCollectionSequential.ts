/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  Address,
  Contract,
  ContractState,
  TestContractResult,
  HexString,
  ContractFactory,
  SubscribeOptions,
  EventSubscription,
  CallContractParams,
  CallContractResult,
  TestContractParams,
  ContractEvent,
  subscribeContractEvent,
  subscribeContractEvents,
  testMethod,
  callMethod,
  multicallMethods,
  fetchContractState,
  ContractInstance,
  getContractEventsCurrentCount,
} from "@alephium/web3";
import { default as NFTPublicSaleCollectionSequentialContractJson } from "../nft/NFTPublicSaleCollectionSequential.ral.json";
import { getContractByCodeHash } from "./contracts";

// Custom types for the contract
export namespace NFTPublicSaleCollectionSequentialTypes {
  export type Fields = {
    enumerableNftTemplateId: HexString;
    collectionUri: HexString;
    nftBaseUri: HexString;
    collectionOwner: Address;
    maxSupply: bigint;
    mintPrice: bigint;
    totalSupply: bigint;
  };

  export type State = ContractState<Fields>;

  export interface CallMethodTable {
    getCollectionUri: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<HexString>;
    };
    totalSupply: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<bigint>;
    };
    nftByIndex: {
      params: CallContractParams<{ index: bigint }>;
      result: CallContractResult<HexString>;
    };
    getNFTUri: {
      params: CallContractParams<{ index: bigint }>;
      result: CallContractResult<HexString>;
    };
    mint: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<HexString>;
    };
  }
  export type CallMethodParams<T extends keyof CallMethodTable> =
    CallMethodTable[T]["params"];
  export type CallMethodResult<T extends keyof CallMethodTable> =
    CallMethodTable[T]["result"];
  export type MultiCallParams = Partial<{
    [Name in keyof CallMethodTable]: CallMethodTable[Name]["params"];
  }>;
  export type MultiCallResults<T extends MultiCallParams> = {
    [MaybeName in keyof T]: MaybeName extends keyof CallMethodTable
      ? CallMethodTable[MaybeName]["result"]
      : undefined;
  };
}

class Factory extends ContractFactory<
  NFTPublicSaleCollectionSequentialInstance,
  NFTPublicSaleCollectionSequentialTypes.Fields
> {
  consts = {
    PublicSaleErrorCodes: { IncorrectTokenIndex: BigInt(0) },
    ErrorCodes: {
      IncorrectTokenIndex: BigInt(0),
      NFTNotFound: BigInt(1),
      TokenOwnerAllowedOnly: BigInt(2),
    },
  };

  at(address: string): NFTPublicSaleCollectionSequentialInstance {
    return new NFTPublicSaleCollectionSequentialInstance(address);
  }

  tests = {
    getCollectionUri: async (
      params: Omit<
        TestContractParams<
          NFTPublicSaleCollectionSequentialTypes.Fields,
          never
        >,
        "testArgs"
      >
    ): Promise<TestContractResult<HexString>> => {
      return testMethod(this, "getCollectionUri", params);
    },
    totalSupply: async (
      params: Omit<
        TestContractParams<
          NFTPublicSaleCollectionSequentialTypes.Fields,
          never
        >,
        "testArgs"
      >
    ): Promise<TestContractResult<bigint>> => {
      return testMethod(this, "totalSupply", params);
    },
    nftByIndex: async (
      params: TestContractParams<
        NFTPublicSaleCollectionSequentialTypes.Fields,
        { index: bigint }
      >
    ): Promise<TestContractResult<HexString>> => {
      return testMethod(this, "nftByIndex", params);
    },
    withdraw: async (
      params: TestContractParams<
        NFTPublicSaleCollectionSequentialTypes.Fields,
        { to: Address; amount: bigint }
      >
    ): Promise<TestContractResult<null>> => {
      return testMethod(this, "withdraw", params);
    },
    getNFTUri: async (
      params: TestContractParams<
        NFTPublicSaleCollectionSequentialTypes.Fields,
        { index: bigint }
      >
    ): Promise<TestContractResult<HexString>> => {
      return testMethod(this, "getNFTUri", params);
    },
    mint: async (
      params: Omit<
        TestContractParams<
          NFTPublicSaleCollectionSequentialTypes.Fields,
          never
        >,
        "testArgs"
      >
    ): Promise<TestContractResult<HexString>> => {
      return testMethod(this, "mint", params);
    },
  };
}

// Use this object to test and deploy the contract
export const NFTPublicSaleCollectionSequential = new Factory(
  Contract.fromJson(
    NFTPublicSaleCollectionSequentialContractJson,
    "",
    "d540a48e7d77afa02e305e4f373a9a9512270a7169bef4fa803c4eed929fedcf"
  )
);

// Use this class to interact with the blockchain
export class NFTPublicSaleCollectionSequentialInstance extends ContractInstance {
  constructor(address: Address) {
    super(address);
  }

  async fetchState(): Promise<NFTPublicSaleCollectionSequentialTypes.State> {
    return fetchContractState(NFTPublicSaleCollectionSequential, this);
  }

  methods = {
    getCollectionUri: async (
      params?: NFTPublicSaleCollectionSequentialTypes.CallMethodParams<"getCollectionUri">
    ): Promise<
      NFTPublicSaleCollectionSequentialTypes.CallMethodResult<"getCollectionUri">
    > => {
      return callMethod(
        NFTPublicSaleCollectionSequential,
        this,
        "getCollectionUri",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    totalSupply: async (
      params?: NFTPublicSaleCollectionSequentialTypes.CallMethodParams<"totalSupply">
    ): Promise<
      NFTPublicSaleCollectionSequentialTypes.CallMethodResult<"totalSupply">
    > => {
      return callMethod(
        NFTPublicSaleCollectionSequential,
        this,
        "totalSupply",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
    nftByIndex: async (
      params: NFTPublicSaleCollectionSequentialTypes.CallMethodParams<"nftByIndex">
    ): Promise<
      NFTPublicSaleCollectionSequentialTypes.CallMethodResult<"nftByIndex">
    > => {
      return callMethod(
        NFTPublicSaleCollectionSequential,
        this,
        "nftByIndex",
        params,
        getContractByCodeHash
      );
    },
    getNFTUri: async (
      params: NFTPublicSaleCollectionSequentialTypes.CallMethodParams<"getNFTUri">
    ): Promise<
      NFTPublicSaleCollectionSequentialTypes.CallMethodResult<"getNFTUri">
    > => {
      return callMethod(
        NFTPublicSaleCollectionSequential,
        this,
        "getNFTUri",
        params,
        getContractByCodeHash
      );
    },
    mint: async (
      params?: NFTPublicSaleCollectionSequentialTypes.CallMethodParams<"mint">
    ): Promise<
      NFTPublicSaleCollectionSequentialTypes.CallMethodResult<"mint">
    > => {
      return callMethod(
        NFTPublicSaleCollectionSequential,
        this,
        "mint",
        params === undefined ? {} : params,
        getContractByCodeHash
      );
    },
  };

  async multicall<
    Calls extends NFTPublicSaleCollectionSequentialTypes.MultiCallParams
  >(
    calls: Calls
  ): Promise<NFTPublicSaleCollectionSequentialTypes.MultiCallResults<Calls>> {
    return (await multicallMethods(
      NFTPublicSaleCollectionSequential,
      this,
      calls,
      getContractByCodeHash
    )) as NFTPublicSaleCollectionSequentialTypes.MultiCallResults<Calls>;
  }
}
