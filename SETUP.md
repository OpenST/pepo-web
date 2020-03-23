## How to install pepo-web

You need to install the following to run `pepo-web`
1. node
2. nginx

### nginx configuration:
1. check if your system has `nginx` installed.
    - Use the command to check if the nginx directory exists or not
        `ls /usr/local/etc/nginx/`
    - If it lists the files, its is installed.
    - If it gives the following output its not installed.
        `/usr/local/etc/nginx/: No such file or directory`
    - Install nginx
        -  Use homebrew to install nginx
            -  `brew install nginx`
        - Once its installed create self signed certificates
            
            ```
            mkdir -p /usr/local/etc/nginx/dev-proxy-https-certificates/
            cd /usr/local/etc/nginx/dev-proxy-https-certificates/
            openssl req -new -newkey rsa:4096 -x509 -sha256 -days 365 -nodes -out dev-proxy-https.crt -keyout dev-proxy-https.key
            ```
            
        - Add the self-signing certificate into Keychain Access
            - Run the following command to locate your certificate in finder.
                ```
                cd /usr/local/etc/nginx/dev-proxy-https-certificates/
                open .
                ```
            - Open System’s Keychain Access
            - Unlock login Keychains (left top panel).
            - Select Certificates in Category Panel (left bottom panel).
            - Drag and drop the dev-proxy-https.crt from finder into the Keychain Access App.
            - Right-click on the added certificate.
            - Choose Get Info to open the certificate information popup.
            - Expand Trust in the certificate information popup.
            - Set the ‘When Using This Certificate:’ option to Always Trust.
            - All other trust options should automatically be set to Always Trust.

2. Update nginx.conf
    - open the file in your editor `/usr/local/etc/nginx/nginx.conf`
    - Delete the existing text and add the following
        ```
        worker_processes  1;
        events {
            worker_connections  1024;
        }


        http {
            include       mime.types;
            default_type  application/octet-stream;
            index    index.html index.htm;

            ssl_certificate     /usr/local/etc/nginx/dev-proxy-https-certificates/dev-proxy-https.crt;
            ssl_certificate_key /usr/local/etc/nginx/dev-proxy-https-certificates/dev-proxy-https.key;
            ssl_ciphers         HIGH:!aNULL:!MD5;
            ssl_protocols       TLSv1.1 TLSv1.2;

            sendfile        on;

            keepalive_timeout  65;

            server {
               listen       443 ssl;
               server_name  pepodev.com;
               proxy_buffering  off;
               add_header 'Access-Control-Allow-Origin' 'https://stagingpepo.com' always;
               add_header 'Access-Control-Allow-Credentials' 'true' always;
               add_header 'Access-Control-Allow-Headers' 'Authorization,Accept,Origin,DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Content-Range,Range' always;
               add_header 'Access-Control-Allow-Methods' 'GET,POST,OPTIONS,PUT,DELETE,PATCH' always;

               location /api/ {
                    proxy_cookie_domain .stagingpepo.com .pepodev.com;
                    proxy_pass https://stagingpepo.com/api/;
               }
               location /admin/ {
                    proxy_cookie_domain .stagingpepo.com .pepodev.com;
                    proxy_pass http://pepodev.com:4000/admin/;
               }
               location /builtAssets {
                    proxy_cookie_domain .stagingpepo.com .pepodev.com;
                    proxy_pass http://pepodev.com:4000;
               }
               location / {
                    proxy_cookie_domain .stagingpepo.com .pepodev.com;
                    if ($request_method = 'OPTIONS') {
                        add_header 'Access-Control-Allow-Origin' 'https://stagingpepo.com' always;
                        add_header 'Access-Control-Allow-Credentials' 'true' always;
                        add_header 'Access-Control-Allow-Headers' 'Authorization,Accept,Origin,DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Content-Range,Range' always;
                        add_header 'Access-Control-Allow-Methods' 'GET,POST,OPTIONS,PUT,DELETE,PATCH' always;
                        add_header 'Access-Control-Max-Age' 1728000;
                        add_header 'Content-Type' 'text/plain charset=UTF-8';
                        add_header 'Content-Length' 0;
                        return 204;
                    }
                    proxy_pass http://pepodev.com:5000;
               }
            }
            include servers/*;
        }
        ```
    - Save the file. Test if the nginx configuration is correct. 
        ```
        sudo nginx -c /usr/local/etc/nginx/nginx.conf -t
        ```
        **Please note**: Sudo command is used, because the nginx is trying to access 443 port which is accessable only by the super user.
        The output should look like the following
        ```
        sudo nginx -c /usr/local/etc/nginx/nginx.conf -t
        Password:
        nginx: the configuration file /usr/local/etc/nginx/nginx.conf syntax is ok
        nginx: configuration file /usr/local/etc/nginx/nginx.conf test is successful
        ```
    - Start the nginx server
        ```
        sudo brew services start nginx
        ```
        It will have the following output.
        ```
        Warning: Taking root:admin ownership of some nginx paths:
          /usr/local/Cellar/nginx/1.17.9/bin
          /usr/local/Cellar/nginx/1.17.9/bin/nginx
          /usr/local/opt/nginx
          /usr/local/opt/nginx/bin
          /usr/local/var/homebrew/linked/nginx
        This will require manual removal of these paths using `sudo rm` on
        brew upgrade/reinstall/uninstall.

        ```
4. Update hosts db `/etc/hosts`
    - Use the following command
        ```
        sudo vi /etc/hosts
        ```
        Add `127.0.0.1       pepodev.com` in the file.
        
        It should appear like this
        ```
        ##
        # Host Database
        #
        # localhost is used to configure the loopback interface
        # when the system is booting.  Do not change this entry.
        ##
        127.0.0.1       localhost
        255.255.255.255 broadcasthost
        ::1             localhost
        127.0.0.1       pepodev.com
        # Added by Docker Desktop
        # To allow the same kube context to work on the host and the container:
        127.0.0.1 kubernetes.docker.internal
        # End of section
        ~                      
        ```
    - Save the file.
5. Clone pepo-web
    - Use command
        - `git clone git@github.com:ostdotcom/pepo-web.git`
        - `npm install`
        - `source set_env_vars.sh`
        - `npm run webpack-dev`
        - `npm start`

6. Go to browser and type `https://pepodev.com`
    - It will give warning that it is not secured, do to advance setting and allow the access anyway.

This should set up the pepo-web on you local machine
    