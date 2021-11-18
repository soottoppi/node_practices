const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize({});

// User table 정의
const User = sequelize.define(
    "User",
    {
        no: {
            field: "no",
            type: DataType.BIGINT(11),
            primaryKey: true,
            autoIncrement: true,
        },
        name: {},
        email: {},
    },
    {
        underscored: true,
        freezeTableName: true,
        timestamps: false,
        createdAt: true,
        updateAt: false,
        tableName: "user",
    }
);

// User.create({

// })

// User.findOne({
//     where:
// })
