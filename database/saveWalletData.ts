import {Wallet} from "@prisma/client";
import {prisma} from "../app";
import {ReturnedObject} from "../api/getDataWallet";

export async function saveWalletData(address: string, data: ReturnedObject): Promise<void> {
    const checkAddress: Wallet | null = await prisma.wallet.findUnique({
        where: {
            address
        }
    });

    if (checkAddress) {
        await prisma.wallet.update({
            where: {
                id: checkAddress.id
            },
            data: {
                tokenCount: data.tokenCount,
                balanceOfEachToken: JSON.stringify(data.balanceOfEachToken),
                totalBalanceUSD: data.totalBalanceUSD
            }
        });
    } else {
        await prisma.wallet.create({
            data: {
                address: address,
                tokenCount: data.tokenCount,
                balanceOfEachToken: JSON.stringify(data.balanceOfEachToken),
                totalBalanceUSD: data.totalBalanceUSD
            }
        });
    }
}
