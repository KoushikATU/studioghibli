terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }
}

provider "aws" {
    access_key = ""
    secret_key = ""
    region = "${var.aws_region}"
}

/*
resource "aws_lambda_function" "my_lambda" {
  function_name = "my-lambda-function"   # Replace with your preferred name
  handler = "index.handler"
  runtime = "nodejs14.x"   # Replace with the Node.js version you're using

  source_code_hash = filebase64sha256("lamda.zip")   # Replace with your Lambda function code ZIP file name

  role = aws_iam_role.lambda_exec.arn

  environment {
    variables = {
      # Add any environment variables required by your Lambda function
      NODE_ENV = "production"
    }
  }

  # Replace with your GitHub repository and branch details
  source_code_url = "https://github.com/L00170995/Group1_GhiblisMovie/blob/main/Backend/lamda.zip"
}

resource "aws_iam_role" "lambda_exec" {
  name = "lambda_exec_role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })

  # Add any additional permissions required by your Lambda function
  # For example, if your Lambda function accesses an S3 bucket, you can add the following policy:
  # policy = jsonencode({
  #   Version = "2012-10-17"
  #   Statement = [
  #     {
  #       Effect = "Allow"
  #       Action = [
  #         "s3:GetObject",
  #         "s3:PutObject"
  #       ]
  #       Resource = [
  #         "arn:aws:s3:::bucket_name/*"
  #       ]
  #     }
  #   ]
  # })
}

resource "aws_iam_role_policy_attachment" "lambda_exec" {
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
  role = aws_iam_role.lambda_exec.name
}
*/
