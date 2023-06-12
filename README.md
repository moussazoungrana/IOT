# IOT_Tp
**Tp1 (contrôler l'état d'une LED):**

Pour notre premier TP, nous avons utilisé un code Arduino qui démontre comment mesurer une entrée analogique provenant d'un potentiomètre. En fonction de cette mesure, nous avons contrôlé l'état d'une LED. La durée pendant laquelle la LED est allumée dépend de la lecture analogique, tandis que la durée pendant laquelle elle est éteinte est également déterminée par cette même lecture.

Dans le circuit, vous devez effectuer les connexions suivantes :

1. Potentiomètre : Connectez la broche centrale du potentiomètre à l'entrée analogique A1 de votre carte Arduino. Connectez l'une des broches latérales du potentiomètre à la terre (GND) de la carte Arduino. Enfin, reliez l'autre broche latérale du potentiomètre à la tension +5V de la carte Arduino.
2. LED : Connectez l'anode de la LED (la patte la plus longue) à la sortie numérique 13 de votre carte Arduino. Pour protéger la LED, placez une résistance de 220 ohms en série avec l'anode de la LED. Ensuite, connectez la cathode de la LED (la patte la plus courte) à la terre (GND) de la carte Arduino.

Voici un schéma simplifié du circuit :
```
    +5V
     |
     |
     |
   Potentiomètre
     |
     |
     |--------- A1 (Entrée analogique)
     |
     |
    GND

    |
    |
    |
  Résistance (220 ohms)
    |
    |
    |
  LED
    |
    |
    |
   GND

```
**Tp2 (Blink):**

Pour contrôler une LED connectée au pin 10 d'une carte Arduino via un ordinateur on utilise la bibliothèque Johnny-Five, vous devez suivre les étapes suivantes :

1. Installez Node.js sur votre ordinateur si ce n'est pas déjà fait.
2. Créez un nouveau projet Node.js dans un répertoire vide.
3. Dans le répertoire de votre projet, ouvrez une invite de commande et exécutez la commande suivante pour installer Johnny-Five :
```
const { Board, Led } = require('johnny-five');

const board = new Board({ port: 'COM6' }); // Remplacez 'COM6' par le port série de votre carte Arduino

board.on('ready', () => {
  const led = new Led(10); // Remplacez 10 par le numéro du pin auquel la LED est connectée

  led.blink(500); // La LED clignote avec des périodes d'allumage et d'extinction de 500ms
});

```
NB:Assurez-vous de remplacer 'COM6' par le port série correct de votre carte Arduino et 10 par le numéro du pin auquel votre LED est connectée.
5. Enregistrez le fichier et exécutez-le à l'aide de Node.js en utilisant la commande suivante :
```
node led_control.js
```
Johnny-Five établira une connexion avec la carte Arduino et la LED connectée au pin 10 commencera à clignoter avec des périodes d'allumage et d'extinction de 500 ms.

Vous pouvez ensuite modifier ce code pour contrôler d'autres composants électroniques connectés à la carte Arduino en utilisant les différentes méthodes disponibles dans la bibliothèque Johnny-Five.

**Tp3 (Smart-House Project avec Johnny-Five et Express):**

**1. Presentation du projet:**

Le projet "Smart_Home_Project" est basé sur un modèle MVC (Modèle-Vue-Contrôleur) simple.

Dans ce modèle, le Modèle définit la structure des données utilisées par l'application et se charge de mettre à jour l'application lorsque des modifications sont effectuées. Il représente les données de l'application et fournit des méthodes pour les manipuler.

La Vue est responsable de l'affichage de l'interface utilisateur (UI). Elle utilise les données fournies par le Modèle pour présenter les informations à l'utilisateur de manière appropriée. La Vue est généralement passive et ne modifie pas directement les données.

Le Contrôleur retient la logique de l'application. Il reçoit les entrées de l'utilisateur, interagit avec le Modèle pour mettre à jour les données et communique avec la Vue pour afficher les informations actualisées. Le Contrôleur prend en charge les interactions utilisateur et coordonne les actions entre la Vue et le Modèle.

En utilisant le modèle MVC, le projet "Smart_Home_Project" sépare clairement les responsabilités entre les différentes composantes de l'application. Cela facilite la gestion des données, l'affichage de l'interface utilisateur et la logique de l'application, rendant le code plus organisé et maintenable.

**2. Outils utilisés:**
- Node.js: Plate-forme logicielle qui permet d’exécuter du code JavaScript.---> installation: [https://nodejs.org/en](https://nodejs.org/en)
* Johnny-Five: Bibliothèque JavaScript open-source pour la programmation de cartes électroniques basée sur Arduino et d’autres microcontrôleurs.--> npm install johnny-five.
+ Express.Js: est un framework backend Node.js minimaliste, rapide et de type Sinatra qui offre des fonctionnalités et des outils robustes pour développer des applications backend évolutives. --> npm install express --save

**3. Fonctionnement:**
**- Fonction manuelle:**

Dans le projet, la fonction "manual" du contrôleur de l'index est responsable d'allumer la LED de la maison en fonction de la luminosité de la pièce. Lorsque l'utilisateur clique sur le bouton correspondant, le contrôleur récupère l'état manuel du routeur (light.js).

Le routeur (light.js) est un composant qui gère toutes les opérations liées à la maison, qu'il s'agisse du mode manuel ou automatique. Il est chargé de coordonner les actions nécessaires pour contrôler l'éclairage de la maison.

Lorsque le contrôleur de l'index récupère l'état manuel du routeur, il peut utiliser cette information pour prendre la décision d'allumer la LED de la maison en fonction de la luminosité détectée dans la pièce. Le contrôleur peut ensuite envoyer une demande appropriée au routeur pour activer la LED dans le mode manuel.

Ainsi, le routeur (light.js) joue un rôle central en prenant en charge toutes les opérations sur la maison, que ce soit pour le bouton manuel ou automatique. Il permet au contrôleur de communiquer avec les composants nécessaires pour contrôler l'éclairage et assure une coordination efficace entre les différentes fonctionnalités de l'application.


**+ Fonction automatique:**

La fonction automatique du projet "Smart_Home_Project" est responsable de l'allumage automatique de la LED de la maison en fonction de la luminosité ambiante. Cette fonction permet à l'application de réagir de manière autonome aux conditions de luminosité de la pièce sans intervention manuelle de l'utilisateur.
Lorsque le mode automatique est activé, le contrôleur de l'index communique avec le routeur (light.js) pour récupérer l'état automatique. En fonction de cet état et des mesures de luminosité effectuées, le contrôleur peut prendre la décision d'allumer ou d'éteindre la LED en fonction de seuils prédéfinis.



https://github.com/moussazoungrana/IOT/assets/125995632/89382503-59f9-4a0f-924e-1b870e4b5e68



**+ Affichage des donnees du capteur **


**+ Sunset / Sunrise **

