import {Contract} from "@prisma/client";
import {prisma} from "../app";

export async function getContract(): Promise<Contract> {
    const contractAddress = 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t';

    const existingAddress: Contract | null = await prisma.contract.findUnique({
        where: {
            address: contractAddress,
        },
    });

    if (existingAddress) {
        return existingAddress;
    }

    return prisma.contract.create({
        data: {
            address: contractAddress,
        },
    })
}
