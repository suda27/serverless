const Responses = require('../common/API_responses')


exports.handler = async event =>{
    console.log('event',event);

    if(!event.pathParameters || !event.pathParameters.ID){
        // ID is mising from the path
        return Responses._400({message:'Missing ID from the Path'});
    }

    let ID = event.pathParameters.ID;

    if(data[ID]){
        // return the data
        return Responses._200(data[ID]);
    }

    // ID doesnt exists
    return Responses._400({message:'No ID present in the given data'});
} 

const data ={

    123:{name:'Sudarsan',role:'DEV',project:'Internal POC'},
    456:{name:'Chocka',role:'DEV',project:'EHE'},
    789:{name:'Kaavya',role:'BA',project:'Bandera'}
}