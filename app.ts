import {getDataContractTransactions} from "./getDataContractTransactions";

const contractAddress = 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t';

async function main() {
    const data = await getDataContractTransactions(contractAddress);
    console.log(data);


}

main();


