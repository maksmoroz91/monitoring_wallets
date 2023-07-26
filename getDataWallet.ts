export async function getDataWallet(walletAddress: string): Promise<ReturnedObject | null> {
    const responseDataWallet: Response = await fetch(`https://apilist.tronscan.org/api/account?address=${walletAddress}`);
    const responseDataConversion: Response = await fetch('https://apilist.tronscan.org/api/token/price?tokenId=trx');
    const dataConversion = await responseDataConversion.json();
    const trxPriceInUSD: number = dataConversion.price_in_usd;

    if (responseDataWallet.ok) {
        const dataWallet = await responseDataWallet.json();
        const tokenCount: number  = dataWallet.tokens.length;
        const countAllTokens: CountToken = {};
        let totalBalanceTrx: number  = 0
        let totalBalanceUSD: number;

        for (let token of dataWallet.tokens) {
            countAllTokens[token.tokenName] = token.balance / (10 ** token.tokenDecimal);

            if (token.amount) {
                totalBalanceTrx += Number(token.amount);
            }
        }

        totalBalanceUSD = totalBalanceTrx * trxPriceInUSD;

        return {tokenCount, countAllTokens, totalBalanceUSD}
    }

    return null;
}

interface CountToken {
    [key: string]: number;
}

interface ReturnedObject {
    tokenCount: number;
    countAllTokens: CountToken;
    totalBalanceUSD: number;
}
