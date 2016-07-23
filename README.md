# HTTP/2 test

To run execute command:

```
npm start       //for HTTP/2 server  
npm start https //for HTTPS/1 server
```


### Server SLL setup
```
$ openssl genrsa -des3 -passout pass:x -out server.pass.key 2048

$ openssl rsa -passin pass:x -in server.pass.key -out server.key

$ rm server.pass.key

$ openssl req -new -key server.key -out server.csr

$ openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt
```
