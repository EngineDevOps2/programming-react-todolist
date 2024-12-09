pipeline {
    agent any
    
    environment {
        DOCKER_IMAGE = 'enginedevops/react-todolist-chrome'
        K8S_DEPLOYMENT_NAME = 'react-todolist-chrome' // Kubernetes deployment name
        NAMESPACE = 'prod'
        DOCKER_USERNAME = 'enginedevops'
        DOCKER_PASSWORD = 'xxxxxxxxxxxx'
//        DOCKER_CREDENTIALS_ID = 'docker-credentials-id' // Jenkins credentials for Docker
//        KUBE_CONFIG_CREDENTIALS_ID = 'kubeconfig-credentials-id' // Jenkins credentials for kubeconfig
    }

     stages {
        stage('Checkout GitHub repo') {
            steps {
            cleanWs()
                checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/EngineDevOps2/programming-react-todolist.git']])
            }
        }
        
        stage('Build and Tag Docker Image') {
            steps {
                script {
                    sh "docker build  -t  ${DOCKER_IMAGE}:${env.BUILD_ID}  ."
                }
            }
        }
        
        


    // stage('Pushing Image') {
    //   environment {
    //           registryCredential = 'dockerhub_id'
    //       }
    //   steps{
    //     script {
    //       docker.withRegistry( 'https://registry.hub.docker.com', registryCredential ) {
    //         dockerImage.push("latest")
    //       }
    //     }
    //   }
    // }




        stage('Push the Docker Image to DockerHUb') {
            steps {
                script {
                    withCredentials([string(credentialsId: 'docker_hub', variable: 'docker_hub')]) {
                    sh 'docker login -u enginedevops -p ${docker_hub}'
}
                    sh "docker push ${DOCKER_IMAGE}:${env.BUILD_ID}"
                }
            }
        }
        
        
        

        stage('Deploy to Kubernetes') {
            steps {
                script {
                    // Setup Kubernetes context
                     withCredentials([file(credentialsId: 'KUBECONFIG', variable: 'KUBECONFIG')]) {

                    sh "kubectl --kubeconfig ${KUBECONFIG} set image deployment/${K8S_DEPLOYMENT_NAME} ${K8S_DEPLOYMENT_NAME}=${DOCKER_IMAGE}:${env.BUILD_ID}   -n ${NAMESPACE}"
                    // sh "kubectl --kubeconfig ${KUBECONFIG}  rollout status deployment/${K8S_DEPLOYMENT_NAME}  -n ${NAMESPACE} "
                    
}
                        // sh "kubectl --kubeconfig ${KUBECONFIG} set image deployment/${K8S_DEPLOYMENT_NAME} ${K8S_DEPLOYMENT_NAME}=${DOCKER_IMAGE}:${env.BUILD_ID}   -n ${NAMESPACE}"
                        // sh "kubectl --kubeconfig ${KUBECONFIG}  rollout status deployment/${K8S_DEPLOYMENT_NAME}  -n ${NAMESPACE} "
 
                }

            }
        }
   }
   }
