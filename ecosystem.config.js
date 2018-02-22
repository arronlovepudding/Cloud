module.exports = {
  apps: [
    {
      name: 'cloud',
      script: 'bin/www',
      max_memory_restart: '512M',
      env: {
        PORT: '3001',
        NODE_ENV: 'production'
      }
    }
  ]
}
