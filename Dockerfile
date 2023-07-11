# Utiliser une image de base
FROM nginx:latest

# Définir le répertoire de travail
WORKDIR /usr/share/nginx/html

# Copier les fichiers frontend dans le conteneur
COPY . .

# Exposer le port nécessaire
EXPOSE 3000

# Définir la commande pour démarrer le serveur
CMD ["nginx", "-g", "daemon off;"]