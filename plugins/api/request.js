import axios from 'axios'

export default (context, inject, app) => {

    const request = {
        async get(url, params) {
            let key = context.store.state.sessions.key;
            let headers = {
                'Authorization': key,
            };
            return await axios.get(context.$config.api_target + url, {
                params: params, headers: headers
            });
        }
    }

}
