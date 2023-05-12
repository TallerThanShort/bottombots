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