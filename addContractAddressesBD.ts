import {Contract, PrismaClient} from "@prisma/client";

export async function addContractAddressesBD(prisma: PrismaClient): Promise<void> {
    const contractAddress = 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t';

    const checkContractAddress: Contract | null = await prisma.contract.findUnique({
        where: {
            address: contractAddress,
        },
    });

    if (!checkContractAddress) {
        await prisma.contract.create({
            data: {
                address: contractAddress,
            },
        })
    }
}
