module.exports = (sequelize, DataTypes)=>{
    const TodoModel = sequelize.define('todo',{
            id:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            title:{
                type: DataTypes.STRING,
                allowNull:false
            }
        },
        {
            freezeTableName: true
        }
    )

    return TodoModel
}