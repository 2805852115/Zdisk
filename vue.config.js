module.exports={
    devServer:{
        proxy:{
            'login': {
                target: 'http://127.0.0.1:5000',
                changeOrigin: true,
                pathRewrite: {
                    'login': '/login',

                }
            },
                'Download': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
        pathRewrite: {
            'Download':'/Download'

        }
            },
        'cookie': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
        pathRewrite: {
            'cookie':'/cookie'

        }
            },

                'register': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
        pathRewrite: {
            'register':'/register'

        }
            },
                    'sendmail': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
        pathRewrite: {
            'sendmail':'/sendmail'

        }
            },

        'datalist': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
        pathRewrite: {
            'datalist':'/datalist'

        }
            },
        }

    }
}