export async function getDataContractTransactions(contractAddress: string): Promise<dataTransaction[] | null>{
    const responseDataTransactions: Response = await fetch(`https://apilist.tronscan.org/api/contract/events?contract=${contractAddress}`);

    if (responseDataTransactions.ok) {
        const dataTransactions = await responseDataTransactions.json();
        return dataTransactions.data;
    }

    return null;
}

export interface dataTransaction {
    amount: string;
    transferFromAddress: string;
    data?: string;
    decimals: number;
    tokenName: string;
    transferToAddress: string;
    block: number;
    id?: string;
    confirmed: boolean;
    transactionHash: string;
    timestamp: number;
}


