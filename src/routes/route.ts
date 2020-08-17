export default {
    home: '/',
    flashMessage: '/message/:action',

    signin: '/auth/signin',
    logout: '/auth/logout',
    register: '/auth/register',
    forgot: '/auth/forgot',
    resetPassword: '/auth/resetPassword/:userId/:key',
    confirmation: '/confirmation/:key',

    // profile
    user: {
        profile: '/user/:username'
    },

    // admin
    apanel: {
        dashbord: '/apanel/dashboard',
    }
};