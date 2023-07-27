import {dataTransaction} from "../api/getDataContractTransactions";
import {prisma} from "../app";


export async function saveTransactionData(data: dataTransaction): Promise<void> {
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
