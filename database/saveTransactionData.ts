import {dataTransaction} from "../api/getDataContractTransactions";
import {prisma} from "../app";
import {Transaction} from "@prisma/client";


export async function saveTransactionData(data: dataTransaction): Promise<void> {
    const checkTransaction: Transaction | null = await prisma.transaction.findFirst({
        where: {
            hash: data.transactionHash
        }
    });

    if (!checkTransaction) {
        await prisma.transaction.create({
            data: {
                amount: data.amount,
                fromAddress: data.transferFromAddress,
                decimals: data.decimals,
                tokenName: data.tokenName,
                toAddress: data.transferToAddress,
                block: data.block,
                confirmed: data.confirmed,
                hash: data.transactionHash,
                timestamp: data.timestamp
            }
        })
    }
}
