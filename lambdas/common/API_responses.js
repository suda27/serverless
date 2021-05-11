const Responses = {

    _200(data ={}){
        return {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify(data),
            statusCode : 200
        }
    },

    _400(data ={}){
        return {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify(data),
            statusCode : 400
        }
    }
}

module.exports = Responses;