// Your Firebase configuration (replace with your actual config from Firebase Console)
const firebaseConfig = {
    apiKey: "AIzaSyCkWqy_sd9xrW3eg1cQlEUCTFmngS_tNaI",
    authDomain: "students-b4af5.firebaseapp.com",
    projectId: "students-b4af5",
    storageBucket: "students-b4af5.firebasestorage.app",
    messagingSenderId: "347751091965",
    appId: "1:347751091965:web:b98acf8f1c513a8f017894",
    measurementId: "G-VBCWB81BFK"
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
            alert("Failed to add name. Please try again.");
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
