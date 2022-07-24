export const config = {
    api_target : process.env.NODE_ENV == 'development' ? 'https://develop-corner.com/api/v1' :  'https://develop-corner.com/api/v1',
}

export default ({app}, inject) => {
    inject('config', config);
}
