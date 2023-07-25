export async function getDataContractTransactions(contractAddress: string): Promise<dataTransaction[] | null>{
    const url = `https://apilist.tronscan.org/api/contract/events?contract=${contractAddress}`;
    const response = await fetch(url);

    if (response.ok) {
        const transactions = await response.json();
        return transactions.data;
    }

    return null;
}

interface dataTransaction {
    amount: string;
    transferFromAddress: string;
    data: string;
    decimals: number;
    tokenName: string;
    transferToAddress: string;
    block: number;
    id: string;
    confirmed: boolean;
    transactionHash: string;
    timestamp: number;
}


