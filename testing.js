const Sequelize = require('sequelize')
const sequelize = new Sequelize('mysql://root:@localhost/sql_intro')
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    })
    // sequelize
    //   .query("SELECT * FROM company")
    //   .spread(function (results, metadata) {
    //     results.forEach(c => console.log(c.name))
    //   })
    // sequelize
    // .query("INSERT INTO company VALUES(null, 'Google', 'Tech', 10000)")
    // .then(function (result) {
    //     console.log(result)
    // })
   const addStudent=(x,y)=>{
    sequelize
    .query(`INSERT INTO student VALUES(null, '${x}', ${y})`)
    .then(function (result) {
        console.log(result)
    })
   }
   const addTeacher=(x,y)=>{
    sequelize
    .query(`INSERT INTO teacher VALUES(null, '${x}', ${y})`)
    .then(function (result) {
        console.log(result)
    })
   }
//    addStudent("Leonidis", 1)
//    addTeacher("Yoda", 0)
//    sequelize
//       .query("SELECT * FROM student")
//       .spread(function (results, metadata) {
//         console.log(results)
//       })
//     sequelize
//       .query("SELECT * FROM teacher")
//       .spread(function (results, metadata) {
//         console.log(results)
//       })

   const enrollStudent=async(sname,tname)=>{
     let student=await sequelize.query(`SELECT s_id FROM student WHERE s_name='${sname}'`)
     let teacher=await sequelize.query(`SELECT t_id FROM teacher WHERE t_name='${tname}'`)
     sequelize
     .query(`INSERT INTO student_teacher VALUES( ${student[0][0].s_id}, ${teacher[0][0].t_id})`)
     .then(function (result) {
         console.log(result)
     })
   }
//    enrollStudent("Ryan", "Levine")

//    sequelize
//       .query("SELECT * FROM student_teacher")
//       .spread(function (results, metadata) {
//         console.log(results)
//       })

    let data=require('./raw-pokemon-trainer-json/poke_data.json')
    // console.log(data[0])
//     let typearr=[]
//     for(let d of data){
//         let exist=false
//         for(let t of typearr){
//         if(d.type===t){
//             exist=true
//         }
//         }
//         if(exist===false){
//         typearr.push(d.type)
//         sequelize
//     .query(`REPLACE INTO pokemon_type SET typename='${d.type}',id=${null}`)
//     .then(function (result) {
//         // console.log(result)
//     })
// }
//     }

//     let townarr=[]
//     for(let d of data){
//         for(let i of d.ownedBy){
//         let exist=false
//         for(let t of townarr){
//         if(i.town===t){
//             exist=true
//         }
//         }
//         if(exist===false){
//         townarr.push(i.town)
//         sequelize
//     .query(`REPLACE INTO town SET name='${i.town}',id=${null}`)
//     .then(function (result) {
//         // console.log(result)
//     })
// }
// }
//     }

//        let trainerarr=[]
//     for(let d of data){
//         for(let i of d.ownedBy){
//         let exist=false
//         for(let t of trainerarr){
//         if(i.name===t){
//             exist=true
//         }
//         }
//         if(exist===false){
//         trainerarr.push(i.name)
//         sequelize
//     .query(`REPLACE INTO trainer SET name='${i.name}',id=${null},town=(SELECT id FROM town WHERE name='${i.town}')`)
//     .then(function (result) {
//         // console.log(result)
//     })
// }
// }
//    }

//    for(let d of data){
    
//     sequelize
// .query(`REPLACE INTO pokemon SET name='${d.name}',id=${d.id},height=${d.height},weight=${d.weight}, typename=(SELECT id FROM pokemon_type WHERE typename='${d.type}')`)
// .then(function (result) {
//     // console.log(result)
// })

// }

//     for(let d of data){
//         for(let i of d.ownedBy){
//         sequelize
//     .query(`REPLACE INTO pokemon_trainer SET pokemon_id='${d.id}',trainer_id=(SELECT id FROM trainer WHERE name='${i.name}')`)
//     .then(function (result) {
//         // console.log(result)
//     })
// }
// }
   

    // sequelize
    //   .query("SELECT * FROM pokemon_trainer")
    //   .spread(function (results, metadata) {
    //     console.log(results)
    //   })

 const maxweight=async()=>{
let result=await sequelize.query(`SELECT MAX(weight) as weight FROM pokemon`)
    sequelize
      .query(`SELECT name FROM pokemon WHERE weight=${result[0][0].weight}`)
      .spread(function (results, metadata) {
        console.log(results)
      })
  }

//   maxweight()

const findByType=async(type)=>{
    let result=await sequelize.query(`SELECT id FROM pokemon_type WHERE typename='${type}'`)

    sequelize
      .query(`SELECT name FROM pokemon WHERE typename=${result[0][0].id}`)
      .spread(function (results, metadata) {
        console.log(results)
      })
  }

//   findByType("grass")

const findOwners=async(pokemon)=>{
    let pokemonid=await sequelize.query(`SELECT id FROM pokemon WHERE name='${pokemon}'`)
    let owners=await sequelize.query(`SELECT trainer_id FROM pokemon_trainer WHERE pokemon_id=${pokemonid[0][0].id}`)
    for(let o of owners[0]) 
    sequelize
      .query(`SELECT name FROM trainer WHERE id=${o.trainer_id}`)
      .spread(function (results, metadata) {
        console.log(results)
      })
    
}


// findOwners("gengar")


const findRoster=async(owner)=>{
    let ownerid=await sequelize.query(`SELECT id FROM trainer WHERE name='${owner}'`)
    let pokemons=await sequelize.query(`SELECT pokemon_id FROM pokemon_trainer WHERE trainer_id=${ownerid[0][0].id}`)
    for(let p of pokemons[0]) 
    sequelize
      .query(`SELECT name FROM pokemon WHERE id=${p.pokemon_id}`)
      .spread(function (results, metadata) {
        console.log(results)
      })
}

// findRoster("Loga")

const mostownedpokemon=async()=>{
    let pokemons=[{name:'',amount:0}]
    for(let d of data){
        let pokemon=await  sequelize
          .query(`SELECT count(*) as num FROM pokemon_trainer WHERE pokemon_id=${d.id}`)
          .spread(function (results, metadata) {
           return results
          })
            sequelize
      .query(`SELECT name FROM pokemon WHERE id=${d.id}`)
      .spread(function (results, metadata) {
        if(pokemon[0].num===pokemons[pokemons.length-1].amount){
        pokemons.push({name:results[0].name,amount:pokemon[0].num})
        }else if(pokemon[0].num>pokemons[pokemons.length-1].amount){
            pokemons[pokemons.length-1]={name:results[0].name,amount:pokemon[0].num}
        }
      })
        
    }
    console.log(pokemons)
}

//mostownedpokemon()