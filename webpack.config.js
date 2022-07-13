module.exports = {
    // archivo a convertir
    entry: './src/app/index.js',
    // archivo convertido
    output: {
        // ubicacion de archivo
        path: __dirname + '/src/public', 
        // codigo convertido y compactado en una sola linea
        filename: 'bundle.js'
    },
    module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env'],
                presets: ['@babel/preset-react']
              }
            }
          }
        ]
      }
}