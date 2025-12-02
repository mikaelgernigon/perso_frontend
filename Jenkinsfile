pipeline {
    agent any // Exécute le pipeline sur n'importe quel agent disponible

    // Configurez les outils si vous utilisez le plugin "NodeJS" de Jenkins
    tools {
        // Remplacez 'NodeJS 18' par le nom de votre installation NodeJS configurée dans Jenkins
        nodejs 'NodeJS 22.12.0' 
    }

    stages {
        stage('Checkout') {
            steps {
                // C'est l'étape qui crée le répertoire Git. 
                // Assurez-vous qu'elle s'exécute correctement.
                checkout scm 
            }
        }
                
        // --- Étape 1 : Préparation et Dépendances ---
        stage('Installation des Dépendances') {
            steps {
                echo 'Installation des dépendances npm...'
                // 'npm ci' est préféré à 'npm install' dans les environnements CI pour la rapidité et la fiabilité
                sh 'npm ci' 

                // Réessayez
                //sh 'ng test'
            }
        }
        
        // --- Étape 2 : Exécution des Tests ---
        stage('Tests Unitaires') {
            steps {
                echo 'Exécution des tests Angular (Karma/Jest)...'
                // La commande ci-dessous exécute les tests une seule fois et s'arrête
                // Le flag '--no-watch' est crucial en CI
                //sh 'npm run test -- --no-watch --browsers=ChromeHeadless'
                
                // Si vous utilisez Jest, remplacez par :
                // sh 'npm run test'
            }
        }
        
        // --- Étape 3 : Construction de l'Application ---
        stage('Construction Angular') {
            steps {
                echo 'Construction de la version de production...'
                // Exécute ng build pour la production
                sh 'npm run build -- --configuration=production'
            }
        }
        
        // --- Étape 4 : Archivage et Nettoyage ---
        stage('Archivage') {
            steps {
                echo 'Archivage des artefacts de construction...'
                // Archive le contenu du dossier de distribution généré (par défaut 'dist/[nom-du-projet]')
                // C'est ce contenu qui doit être déployé sur le serveur web
                archiveArtifacts artifacts: 'dist/**/*', onlyIfSuccessful: true
            }
        }
        
        // --- Étape 5 : Déploiement (Optionnel) ---
        // Cette étape varie énormément selon votre environnement (AWS S3, NGINX, Docker, etc.)
        stage('Déploiement') {
            when {
                // Déploiement uniquement si c'est la branche 'main' ou 'master'
                branch 'main' 
            }
            steps {
                echo 'Déploiement sur le serveur de production...'
                // Exemple : Copie des fichiers vers un serveur distant via SCP
                sh 'scp -i /root/.jenkins/workspace/perso.frontend/dist/perso_frontend/browser/* mikael@laroute.ddns.net:/var/www/html/'
               
                // Ou exécution d'un script de déploiement spécifique
                // sh './deploy-script.sh'
            }
        }
    }

    // --- Actions après le pipeline ---
    post {
        //always {
            // Nettoie l'espace de travail sur l'agent Jenkins pour économiser de l'espace
            //cleanWs() 
        //}
        success {
            echo 'Pipeline de construction Angular terminé avec succès !'
        }
        failure {
            echo 'Échec de la construction Angular. Veuillez vérifier les logs.'
        }
    }
}