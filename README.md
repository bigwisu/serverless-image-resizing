# Serverless Image Resizing

## Description

Resizes images on the fly using Amazon S3, AWS Lambda, and Amazon API Gateway.
Using a conventional URL structure and S3 static website hosting with
redirection rules, requests for resized images are redirected to a Lambda
function via API Gateway which will resize the image, upload it to S3, and
redirect the requestor to the resized image. The next request for the resized
image will be served from S3 directly.

## Usage

1. Build the Lambda function

   The Lambda function uses [sharp][sharp] for image resizing which requires
   native extensions. In order to run on Lambda, it must be packaged on Amazon
   Linux. You can accomplish this in one of two ways:

   - Upload the contents of the `lambda` subdirectory to an [Amazon EC2 instance
     running Amazon Linux][amazon-linux] and run `npm install`, or

   - Use the Amazon Linux Docker container image to build the package using your
     local system. This repo includes Makefile that will download Amazon Linux,
     install Node.js and developer tools, and build the extensions using Docker.
     
     Optionally run `make clean` as you may be working on tests, then run `make all` 
     to build and finally `make dist` to package the build.

2. Deploy the CloudFormation stack

    Run `bin/deploy` to deploy the CloudFormation stack. It will create a
    temporary Amazon S3 bucket, package and upload the function, and create the
    Lambda function, Amazon API Gateway RestApi, and an S3 bucket for images via
    CloudFormation.

    The deployment script requires the [AWS CLI][cli] version 1.11.19 or newer
    to be installed.

3. Test the function

    Upload an image to the S3 bucket and try to resize it via your web browser
    to different sizes, e.g. with an image uploaded in the bucket called
    image.png:

    - http://[BucketWebsiteHost]/path/to/image-resized-300x200.png
    - http://[BucketWebsiteHost]/second/path/to/image-name-resized-400x600.jpg
    - http://[BucketWebsiteHost]/path/to/image-resized-50x50.jpg

    You can find the `BucketWebsiteUrl` in the table of outputs displayed on a
    successful invocation of the deploy script.

## License

This reference architecture sample is [licensed][license] under Apache 2.0.

[license]: LICENSE
[sharp]: https://github.com/lovell/sharp
[amazon-linux]: https://aws.amazon.com/blogs/compute/nodejs-packages-in-lambda/
[cli]: https://aws.amazon.com/cli/
