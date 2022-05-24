pipeline {
    agent any
    triggers {
        pollSCM("*/5 * * * *")
    }
    environment {
        COMMITMSG = sh(returnStdout: true, script: "git log -1 --oneline")
    }
    stages {
        stage("Start up"){
            when {
                anyOf {
                    changeset "**"
                }
            }
            steps {
                withCredentials([string(credentialsId: 'DiscordWebHook', variable: 'WEBHOOK_URL')]) {
                    discordSend description: "Organizee Web Pipeline Start", footer: env.COMMITMSG , link: env.Build_URL, webhookURL: "${WEBHOOK_URL}"
                    buildDescription env.COMMITMSG
                } 
            }
        }
        stage("Build") {
                when {
                        changeset "**"
                    }
                steps {
                        sh "npm install"
                        sh "npm run build"
                        sh "docker-compose --env-file config/Test.env build"
                        sh "npm install testcafe testcafe-reporter-xunit"
                        echo "Register testing"
                        sh "testcafe chrome:headless testCafe/register.test.js"
                        echo "Login testing"
                        sh "testcafe chrome:headless testCafe/login.test.js"
            }
               
        }
        stage("Clean containers") {
            steps {
                script {
                    try {
                        sh "docker-compose --env-file config/Test.env down"
                    }
                    finally { }
                }
            }
        }
        stage("Deploy"){
            steps {
                 sh "docker-compose --env-file config/Test.env up -d"
            }
        }
        stage("Push images to registry") {
             steps {
                sh "docker-compose --env-file config/Test.env push"
            }
        }
    }
    post {
        always {
            withCredentials([string(credentialsId: 'DiscordWebHook', variable: 'WEBHOOK_URL')]) {
                sh "echo 'Pipeline finished!'"
                discordSend description: "Organizee Web Pipeline Finished", footer: "The pipeline has finished!", link: env.Build_URL, result: currentBuild.currentResult, title: JOB_NAME, webhookURL: "${WEBHOOK_URL}"
            }
        }
        success {
            withCredentials([string(credentialsId: 'DiscordWebHook', variable: 'WEBHOOK_URL')]) {
                sh "echo 'Pipeline finished!'"
                discordSend description: "Organizee Web Pipeline Success", footer: "Pipeline finished successfully", link: env.Build_URL, result: currentBuild.currentResult, title: JOB_NAME, webhookURL: "${WEBHOOK_URL}"
            }
            sh 'npm install'
            sh 'npm run lighthouse'
            publishHTML (target: [
                allowMissing: false,
                alwaysLinkToLastBuild: false,
                keepAll: true,
                reportDir: '.',
                reportFiles: 'lighthouse-report.html',
                reportName: "Lighthouse"
            ])
        }
        failure {
            withCredentials([string(credentialsId: 'DiscordWebHook', variable: 'WEBHOOK_URL')]) {
                sh "echo 'Pipeline finished!'"
                discordSend description: "Organizee Web Pipeline Failed", footer: "Pipeline failed", link: env.Build_URL, result: currentBuild.currentResult, title: JOB_NAME, webhookURL: "${WEBHOOK_URL}"
            }
        }
        unstable {
            withCredentials([string(credentialsId: 'DiscordWebHook', variable: 'WEBHOOK_URL')]) {
                sh "echo 'Pipeline finished!'"
                discordSend description: "Organizee Web Pipeline Unstable", footer: "Pipeline marked unstable", link: env.Build_URL, result: currentBuild.currentResult, title: JOB_NAME, webhookURL: "${WEBHOOK_URL}"
            }
        }
        changed {
            withCredentials([string(credentialsId: 'DiscordWebHook', variable: 'WEBHOOK_URL')]) {
                sh "echo 'Pipeline finished!'"
                discordSend description: "Organizee Web Pipeline Changed", footer: "Pipeline's state changed", link: env.Build_URL, result: currentBuild.currentResult, title: JOB_NAME, webhookURL: "${WEBHOOK_URL}"
            }
        }
    }
}
