# threadly_portfolio
backend for threadly to upload and get files

# podman machine init
# podman machine start

## start minio with podman 
run_minio.sh

## configurate aws with access keys
aws configure

## create a bucket
create_bucket.sh

## How to run scripts
gitbash => ./<fileName>

## Not working for the moment
docker build -t threadly-portfolio-demo . 
docker run -d -p 3004:3004 threadly-portfolio-demo