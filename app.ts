import {Contract, PrismaClient} from "@prisma/client";
import {dataTransaction, getDataContractTransactions} from "./api/getDataContractTransactions";
import {getDataWallet, ReturnedObject} from "./api/getDataWallet";
import {getContract} from "./database/getContract";
import {saveTransactionData} from "./database/saveTransactionData";
import {saveWalletData} from "./database/saveWalletData";



export const prisma = new PrismaClient();
let contractAddress: string;

async function main(): Promise<void> {
    while (true) {
        if (!contractAddress) {
            contractAddress = await initAddress();
        }

        const dataTransactions: dataTransaction[] | null = await getDataContractTransactions(contractAddress);

        if (dataTransactions) {
            for (let data of dataTransactions) {
                await saveTransactionData(data);
                const { transferFromAddress, transferToAddress }: { transferFromAddress: string, transferToAddress: string } = data;
                const dataFromAddress: ReturnedObject | null = await getDataWallet(transferFromAddress);
                const dataToAddress: ReturnedObject | null = await getDataWallet(transferToAddress);

                if (dataFromAddress) await saveWalletData(transferFromAddress, dataFromAddress);
                if (dataToAddress) await saveWalletData(transferToAddress, dataToAddress);
            }
        }
    }
}

async function initAddress(): Promise<string> {
    const promiseContract: Contract =  await getContract();
    return promiseContract.address;
}

main();
