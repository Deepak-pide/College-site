// Your Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// DOM elements
const nameInput = document.getElementById('nameInput');
const addButton = document.getElementById('addButton');
const namesList = document.getElementById('namesList');

// Add name to Firestore
addButton.addEventListener('click', () => {
    const name = nameInput.value.trim();
    if (name) {
        db.collection('names').add({
            name: name,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(() => {
            nameInput.value = ''; // Clear input
        })
        .catch(error => {
            console.error("Error adding document: ", error);
        });
    }
});

// Real-time listener for names
db.collection('names')
    .orderBy('timestamp', 'desc')
    .onSnapshot(snapshot => {
        namesList.innerHTML = ''; // Clear current list
        
        snapshot.forEach(doc => {
            const name = doc.data().name;
            const li = document.createElement('li');
            li.textContent = name;
            namesList.appendChild(li);
        });
    });