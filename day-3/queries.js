const Pool = require('pg').Pool
const pool = new Pool({
    user    : "postgres",
    host    : "localhost",
    database: "testkitabisa",
    password: "postgres",
    port    :  5432
})

const getMenus = (req,res)=>{
    pool.query("select menu_id, concat(cakes.cake_name,' ',batters.batter_type,' ', toppings.topping_type) as toppingType from menus\
    join cakes on cakes.cake_id = menus.cake_id\
    join batters on batters.batter_id = menus.batter_id\
    join toppings on toppings.topping_id = menus.topping_id",
    (err,result)=>{
        if(err){
            throw err
        }
        res.status(200).json(result.rows)
    })
}

module.exports = {getMenus}