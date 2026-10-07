pipeline {
    agent any
    environment {
        DOCKERHUB_USER = 'vjdani'
        IMAGE_NAME     = 'myapp'
        IMAGE_TAG      = 'latest'
    }
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Aryan1Badadani/my-k8s-deployment.git'
            }
        }

        stage('Verify Tools') {
            steps {
                sh 'docker --version'
                sh 'kubectl version --client'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $DOCKERHUB_USER/$IMAGE_NAME:$IMAGE_TAG .'
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds',
                                                 usernameVariable: 'USER',
                                                 passwordVariable: 'PASS')]) {
                    sh 'echo $PASS | docker login -u $USER --password-stdin'
                    sh 'docker push $DOCKERHUB_USER/$IMAGE_NAME:$IMAGE_TAG'
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                // Ensure manifests reference vjdani/myapp:latest
                sh 'kubectl apply -f k8s/deployment.yml'
                sh 'kubectl apply -f k8s/service.yml'
            }
        }
    }
    post {
        failure {
            echo "❌ Build failed — check Docker/Kubernetes permissions or manifest references."
        }
        success {
            echo "✅ Build, push, and deploy completed successfully."
        }
    }
}
