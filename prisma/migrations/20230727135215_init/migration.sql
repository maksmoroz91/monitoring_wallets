-- CreateTable
CREATE TABLE `Contract` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `address` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Contract_address_key`(`address`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Transaction` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `amount` VARCHAR(191) NOT NULL,
    `fromAddress` VARCHAR(191) NOT NULL,
    `decimals` INTEGER NOT NULL,
    `tokenName` VARCHAR(191) NOT NULL,
    `toAddress` VARCHAR(191) NOT NULL,
    `block` INTEGER NOT NULL,
    `confirmed` BOOLEAN NOT NULL,
    `hash` VARCHAR(191) NOT NULL,
    `timestamp` BIGINT NOT NULL,

    UNIQUE INDEX `Transaction_hash_key`(`hash`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Wallet` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `address` VARCHAR(191) NOT NULL,
    `tokenCount` INTEGER NOT NULL,
    `balanceOfEachToken` JSON NOT NULL,
    `totalBalanceUSD` DOUBLE NOT NULL,

    UNIQUE INDEX `Wallet_address_key`(`address`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
