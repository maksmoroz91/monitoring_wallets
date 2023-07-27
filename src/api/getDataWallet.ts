export async function getDataWallet(walletAddress: string): Promise<ReturnedObject | null> {
    const responseDataWallet: Response = await fetch(`https://apilist.tronscan.org/api/account?address=${walletAddress}`);
    const responseDataConversion: Response = await fetch('https://apilist.tronscan.org/api/token/price?tokenId=trx');
    const dataConversion = await responseDataConversion.json();
    const trxPriceInUSD: number = dataConversion.price_in_usd;

    if (responseDataWallet.ok) {
        const dataWallet = await responseDataWallet.json();
        const balanceOfEachToken: CountToken = {};
        let tokenCount: number;
        let totalBalanceTrx: number  = 0
        let totalBalanceUSD: number;

        for (let token of dataWallet.tokens) {
            if (token.tokenPriceInTrx) {
                const balance:number = token.balance / (10 ** token.tokenDecimal);
                balanceOfEachToken[token.tokenName] = Number(balance.toFixed(2));

                if (token.amount) {
                    totalBalanceTrx += Number(token.amount);
                }
            }
        }

        totalBalanceUSD = Number((totalBalanceTrx * trxPriceInUSD).toFixed(2));
        tokenCount = Object.keys(balanceOfEachToken).length

        return {tokenCount, balanceOfEachToken, totalBalanceUSD}
    }

    return null;
}

interface CountToken {
    [key: string]: number;
}

export interface ReturnedObject {
    tokenCount: number;
    balanceOfEachToken: CountToken;
    totalBalanceUSD: number;
}
