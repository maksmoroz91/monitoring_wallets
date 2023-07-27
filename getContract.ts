import {Contract, PrismaClient} from "@prisma/client";

export async function getContract(prisma: PrismaClient): Promise<Contract> {
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
