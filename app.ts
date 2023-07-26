import {getDataContractTransactions} from "./getDataContractTransactions";
import {getDataWallet} from "./getDataWallet";

const contractAddress = 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t';
const walletAddress = 'TYZer2VkmieEh3SXCunYSZ9m8gGxLyEHoe';

async function main() {
    const dataTransactions = await getDataContractTransactions(contractAddress);
    const dataWallet = await getDataWallet(walletAddress);

    if (dataTransactions) {
        console.log(dataTransactions);
    }

    if (dataWallet) {
        console.log(`Количество токенов: ${dataWallet.tokenCount}`)
        console.log(`Количество каждого токена: ${JSON.stringify(dataWallet.countAllTokens)}`);
        console.log(`Общая стоимость в $: ${dataWallet.totalBalanceUSD.toFixed(2)}`)
    }
}

main();
