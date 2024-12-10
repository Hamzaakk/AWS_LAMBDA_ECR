# Deploy to Lambda using ECR , CI/CD Pipline

This project demonstrates the deployment of a Node.js application to AWS Lambda using a container image hosted on Amazon Elastic Container Registry (ECR). The workflow automates the process using GitHub Actions and includes building, pushing the Docker image to ECR, and updating the Lambda function.

## Features

- **Continuous Integration**: Automatically triggered on a `push` to the `main` branch.
- **TypeScript Compilation**: Converts TypeScript source files to JavaScript.
- **Containerized Deployment**: Builds and deploys a Docker container image to AWS Lambda.
- **AWS ECR Integration**: Publishes Docker images to Amazon Elastic Container Registry.
- **Automated Lambda Updates**: Updates the Lambda function with the new container image.

## Requirements

### Prerequisites

1. **AWS Account** with permissions to access Lambda and ECR.
2. **GitHub Secrets** configured for secure credential management:
   - `AWS_ACCESS_KEY_ID`
   - `AWS_SECRET_ACCESS_KEY`
   - `AWS_ACCOUNT_ID`
3. **Node.js 16.x** installed locally for development.

### Tools and Libraries

- **AWS CLI**: To interact with AWS services.
- **Docker**: To build and push container images.
- **GitHub Actions**: For CI/CD automation.

## Workflow Configuration

The workflow is defined in `.github/workflows/deploy.yml` and executes the following steps:

1. **Checkout Code**: Checks out the repository to the GitHub runner.
2. **Set Up Node.js**: Configures the Node.js environment.
3. **Install Dependencies and Compile TypeScript**: Installs project dependencies and compiles TypeScript to JavaScript.
4. **Configure AWS Credentials**: Sets up AWS CLI credentials using GitHub secrets.
5. **Login to Amazon ECR**: Authenticates with Amazon ECR.
6. **Build Docker Image**: Builds the Docker image from the application source.
7. **Push Docker Image to Amazon ECR**: Pushes the built Docker image to Amazon ECR.
8. **Deploy Lambda Function**: Updates the AWS Lambda function with the new container image.

## Folder Structure

```plaintext
.
├── .github/
│   └── workflows/
│       └── main.yml   # GitHub Actions workflow file
├── src/                 # TypeScript source files
├── dist/                # Compiled JavaScript output
├── Dockerfile           # Dockerfile for containerization
├── package.json         # Node.js dependencies and scripts
└── tsconfig.json        # TypeScript configuration
