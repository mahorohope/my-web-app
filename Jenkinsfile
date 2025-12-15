pipeline {
    agent any // Runs on any available Jenkins agent [cite: 75]
    
    stages {
        stage('Checkout') {
            steps {
                // Clones the code from the SCM defined in the job configuration [cite: 155]
                checkout scm 
            }
        }
        
        stage('Install Dependencies') {
            steps {
                echo 'Installing Node.js dependencies...'
                // Install dependencies using npm
                sh 'npm install'
            }
        }
        
        stage('Test') {
            steps {
                echo 'Running tests...' [cite: 86]
                // Execute the test script defined in package.json (currently a dummy one)
                sh 'npm test'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                // Ensure Docker is installed on the Jenkins agent
                script {
                    // Uses the Dockerfile provided to build the image
                    docker.build('my-nodejs-app:${BUILD_NUMBER}') 
                }
            }
        }
        
        // This stage prepares for the deployment steps in Project 2
        stage('Deploy (Placeholder)') {
            steps {
                echo 'Skipping deployment for now. This will be updated in Project 2.'
            }
        }
    }
}