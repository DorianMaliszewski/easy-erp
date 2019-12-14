# spring-boot-easy-erp

## Prerequisite

- OpenJDK 11
- Docker and docker-compose

## Build images

- run `sh create-all-image.sh`

## Quick launch

- `sh launch-stack.sh`, it will launch the stack with 4 instance of hello-service
- Add `127.0.0.1 easy-erp.lan api.easy-erp.lan oauth.easy-erp.lan` to `/etc/hosts` with : `echo "127.0.0.1 easy-erp.lan api.easy-erp.lan oauth.easy-erp.lan" |  sudo tee -a /etc/hosts`
## Launch the stack

- `docker-compose up` optionnaly you can add `-d` option for detached mode.
- Wait launching

**To stop all container `docker-compose down`**
