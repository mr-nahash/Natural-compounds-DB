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
        // in my MongoDB my collection is called 'active_compounds'
        molecules = await db.collection('active_compounds')
    } catch(error){
        throw new Error('Failed to stablish connection to database')
    }
}


;(async () =>{
    await init()
})()

export async function getMolecules (){
    try{
        if (!molecules) await init()
        const result= await molecules
            .find({})
            .limit(10)
            .map(molecule => ({ ...molecule, _id: molecule._id.toString() }))
            .toArray()
        return{molecules:result}
    }
    catch(error){
        return { error:'Failed to fetch molecules'}
    }
}