#!/bin/bash

# Create sounds directory if it doesn't exist
mkdir -p public/sounds

# Download basic meditation sounds
curl -o public/sounds/rain.mp3 https://cdn.pixabay.com/download/audio/2022/03/10/audio_c8c8a73467.mp3
curl -o public/sounds/ocean.mp3 https://cdn.pixabay.com/download/audio/2022/03/10/audio_8a3c7b0c0f.mp3
curl -o public/sounds/forest.mp3 https://cdn.pixabay.com/download/audio/2022/03/10/audio_8a3c7b0c0f.mp3

# Make the script executable
chmod +x scripts/download-sounds.sh 