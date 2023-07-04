// this file contains all the database access objects

import clientPromise from "."
let client
let db
let molecules

// GET A HANDLE ON DATABASE AND COLLECTION
async function init() {
    if (db) return  
    try {
        client=await clientPromise
        db=await client.db()
        console.log('yes! connected to database')
        // in my MongoDB my collection is called 'active_compounds'
        molecules = await db.collection('active_compounds');
        console.log('yes! connected to collection')
    } catch(error){
        throw new Error('Failed to stablish connection to mongo')
    }
}


;(async () =>{
    await init()
})()

// Function that retrives documents from collection
export async function getMolecules (){
    try{
        if (!molecules) await init()
        const result= await molecules
            .find({})
            .limit(50)
            .map(user => ({ ...user, _id: user._id.toString() }))
            .toArray()
        console.log('Mongo Documents retrieved Successfully')
        return{molecules:result}
    
    }
    catch(error){
        return { error:'Failed to fetch molecules'}
    }
}