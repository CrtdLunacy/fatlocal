import { useState, useEffect } from 'react';
import Keycloak from 'keycloak-js';

const client = new Keycloak({
    url: 'http://127.0.0.1:8080',
    realm: 'myrealm',
    clientId: 'demo',
});

const useAuth = () => {
    // const isRun = useRef(false);
    // const [token, setToken] = useState(null);
    const [isLogin, setLogin] = useState(false);

    useEffect(() => {
        client
            .init({
                onLoad: 'login-required',
            })
            .then((res) => {
                setLogin(res);
            });
    }, []);

    return isLogin;
};

export default useAuth;
