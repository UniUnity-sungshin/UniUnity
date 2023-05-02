module.exports = (sequelize,Sequelize)=>{
    const subscriber=sequelize.define("subscriber",{
        name:{
            type:Sequelize.STRING
        },
        email:{
            type:Sequelize.STRING,
            primaryKey:true
        },
        zipCode:{
            type:Sequelize.INTEGER
        }
    },{
        timestamps:false;
    })
    return subscriber;
}