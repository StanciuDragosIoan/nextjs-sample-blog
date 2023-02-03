const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');


module.exports = (phase) => {

    if (phase === PHASE_DEVELOPMENT_SERVER) {
        return {
            env: {
                mongodb_username: 'codepillbot',
                mongodb_password: 'Cozonac43%40',
                db_name: 'my-blog-dev'
            }
        }
    }


    //prod credentials can be defined here..
    return {
        env: {
            mongodb_username: 'codepillbot',
            mongodb_password: 'Cozonac43%40',
            db_name: 'my-blog'
        }
    }

}