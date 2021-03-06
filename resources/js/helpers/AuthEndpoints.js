let  AuthEndPoints =
    {
        tokenRequestEndpoint: {
            url: 'http://127.0.0.1:8000/api/login',
            method: 'POST'
        },
        logoutEndpoint: {
            url: 'http://127.0.0.1:8000/api/logout',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        },
        registerEndPoint: {
            url: 'http://127.0.0.1:8000/api/register',
            method: 'POST',
        }


    }
;

module.exports = AuthEndPoints;