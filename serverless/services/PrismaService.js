import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();


export const getInputsByCategory = (categoryId) => {
    return prisma.calculatorInput.findMany({
        where: {
            category_id: categoryId,
        },
        select: {
            id: true,
        },
    });
};

export const getUsersThatCanViewCalculator = (typeId) => {
    return prisma.userCalculator.findMany({
        where: {
            type_id: typeId,
        },
    });
};

export const getCountOfUsersUniqueFilledResultsByCategory = (
    userId,
    idArray
) => {
    return prisma.calculatorResult.findMany({
        distinct: ["input_id"],
        where: {
            user_id: userId,
            input_id: {in: idArray},
        },
    });
};

export const getDetailsByType = (typeId) => {
    return prisma.calculatorType.findUnique({
        where: {
            id: typeId,
        },
    });
};

export const getUsersFromList = (userIdList) => {
    return prisma.user.findMany({
        where: {
            id: {in: userIdList},
        },
        select: {
            email: true,
            id: true,
        },
    });
};

export const getUsersByEmail = (userEmail) => {
    return prisma.user.findMany({
        where: {
            email: userEmail,
        },
        select: {
            id: true,
        },
    });
};

export const deleteCalculatorType = (typeId) => {
    return prisma.calculatorType.delete({
        where: {
            id: typeId,
        },
    });
};

export const deleteCategoryByType = (typeId) => {
    return prisma.calculatorCategory.deleteMany({
        where: {
            type_id: typeId,
        },
    });
};

export const deleteCategoryByCategoryId = (categoryId) => {
    return prisma.calculatorCategory.delete({
        where: {
            id: categoryId,
        },
    });
};

export const deleteInputByCategory = (categoryId) => {
    return prisma.calculatorInput.deleteMany({
        where: {
            category_id: categoryId,
        },
    });
};

export const deleteInputByInputId = (inputId) => {
    return prisma.calculatorInput.deleteMany({
        where: {
            id: inputId,
        },
    });
};

export const deleteResultByInput = (inputId) => {
    return prisma.calculatorResult.deleteMany({
        where: {
            input_id: inputId,
        },
    });
};

export const deleteUserCalculator = (typeId, userId) => {
    return prisma.userCalculator.deleteMany({
        where: {
            type_id: typeId,
            user_id: userId,
        },
    });
};

export const getUsersLogs = (userId) => {
    return prisma.calculatorResult.findMany({
        where: {
            user_id: userId,
        },
        include: {
            calculatorinput: {
                include: {
                    calculatorcategory: true,
                },
            },
        },
    });
};

export const createCalculator = (calculatorName, isPublic) => {
    return prisma.calculatorType.create({
        data: {
            name: calculatorName,
            public: isPublic,
        },
    });
};

export const createUserCalculatorEntity = (typeId, userId) => {
    return prisma.userCalculator.create({
        data: {
            type_id: typeId,
            user_id: userId,
        },
    });
};

export const getListofProjects = () => {
    return prisma.project.findMany();
};


export const getProject = (projectID) => {
    return prisma.project.findUnique({
        where: {
            id: projectID,
        },
    });
};

export const createNewProject = (data, wallet, publicAddress) => {
    return prisma.project.create({
        data: {
            projectname: data.projectname,
            projectimage1: data.projectimage1,
            projectimage2: data.projectimage2,
            projectimage3: data.projectimage3,
            projectimage4: data.projectimage4,
            projectimage5: data.projectimage5,
            cptgbp: data.cptgbp,
            latitude: data.latitude,
            longitude: data.longitude,
            streetname: data.streetname,
            city: data.city,
            county: data.county,
            country: data.country,
            totalsupply: data.totalsupply,
            remainingsupply: data.remainingsupply,
            ownername: data.ownername,
            ownerpicture: data.ownerpicture,
            type: data.type,
            website: data.website,
            description: data.description,
            datefounded: data.datefounded,
            ethWallet: wallet,
            publicAddress: publicAddress,
        },
    });
};

    export const editProjectById = (data, id) => {
        return prisma.project.update({
            where: {
                id: id,
            },
            data: {
                projectname: data.projectname,
                projectimage1: data.projectimage1,
                projectimage2: data.projectimage2,
                projectimage3: data.projectimage3,
                projectimage4: data.projectimage4,
                projectimage5: data.projectimage5,
                cptgbp: data.cptgbp,
                latitude: data.latitude,
                longitude: data.longitude,
                streetname: data.streetname,
                city: data.city,
                county: data.county,
                country: data.country,
                totalsupply: data.totalsupply,
                remainingsupply: data.remainingsupply,
                ownername: data.ownername,
                ownerpicture: data.ownerpicture,
                type: data.type,
                website: data.website,
                description: data.description,
                datefounded: data.datefounded,
            },
        });
    }

export const addWalletToUserId = (userId, wallet, publicAddress) => {
    return prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            ethWallet: wallet,
            publicAddress: publicAddress,
        },
    });
};

export const getWalletById = (userId) => {
    return prisma.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            publicAddress: true,
        },
    });
};

export const getProjectWalletById = (userId) => {
    return prisma.project.findUnique({
        where: {
            id: userId,
        },
        select: {
            publicAddress: true,
            ethWallet: true
        },
    });
};

export const createNewTransaction = (date, tonnes, price, paypalId, projectId, userId) => {
    return prisma.transaction.create({
        data: {
            date: date,
            amountTonnes: tonnes,
            amountGbp: price,
            paypal_id: paypalId,
            project_id: projectId,
            user_id: userId
        },
    });
};

export const getTransactionByUserId = (userId) => {
    return prisma.transaction.findMany({
        where: {
            user_id: userId,
        },
        include: {
            project: true
        },
    });
};

export const getProjectsByUserId = (userId) => {
    return prisma.transaction.findMany({
        where: {
            user_id: userId,
        },
        include: {
            project: true
        },
    });
};



