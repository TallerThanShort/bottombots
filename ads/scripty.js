const firebaseConfig = {
    apiKey: "AIzaSyAV1jnqT5r1xKYaW_z1c_M7rp8rWiMC3A8",
    authDomain: "bottombots.xyz",
    projectId: "bottom-bots",
    storageBucket: "bottom-bots.appspot.com",
    messagingSenderId: "759946456504",
    appId: "1:759946456504:web:d5e5eacfa53d9ef43ab34d"
};
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const navbarthing = document.getElementById("classy");
const userID = localStorage.getItem("log_id")

db.collection("users").where("uid", "==", userID).get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        const pp = doc.data();
        navbarthing.innerHTML += `
        <h3>${pp.wewo}</h3>
        <br>
        <p>You have ${pp.votes} Credits!</p>
        <br>
        <button style="text-transform: uppercase;">buy more</button>
        <br><br>
        <button style="text-transform: uppercase;">bid on bot advert</button>
        <br>
        <button style="text-transform: uppercase;">bid on server advert</button>`
    });
})