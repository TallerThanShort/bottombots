const maestro = document.getElementById("botpage");
const fragment = new URLSearchParams(window.location.search.slice(1));
const [target, uuid] = [fragment.get('id'), localStorage.getItem('log_id')];
const [accessToken, tokenType, state] = [localStorage.getItem('access_token'), localStorage.getItem('token_type'), localStorage.getItem('state')];
const usertime = localStorage.getItem('discriminator');
const loggedAs = `${localStorage.getItem('username')}#${localStorage.getItem('discriminator')}`

window.onload = function(){
    if(target != null){
    store.collection("bots").where("id", "==", target)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const botto = doc.data()
                    document.getElementById("nameloca").innerHTML = `<img src="${botto.profile_image}" style="margin-top: 8px; width: 64px; height: 64px; object-fit: cover; border-radius: 50%;"><h3>Voting for ${botto.name}<h3><button onclick="voteAction()" style="width: 100px;">Vote</button>`;
        });
    })
    .catch((error) => {
        window.alert("Error getting data: ", error);
    });
    }

    if(!accessToken){
        const randomString = generateRandomString();

        localStorage.setItem('oauth-state', randomString);
    }
    
    if(usertime != null){
        let html = `
        <div class="dropdown">
            <span class="dropbtn">${loggedAs}</span>
                <div class="dropdown-content">
                <a href="/bots/add">Add a Bot</a>
                <a href="/servers/add">Add a Server</a>
                <a onclick="logout()">Log Out</a>
            </div>
        </div>
        `
        document.getElementById('navbarthings').innerHTML += html;
    } else{
        document.getElementById('navbarthings').innerHTML += `<span class="link-1naFFL link-2eyudH" onclick="document.location.href = 'https://discord.com/api/oauth2/authorize?client_id=914396590901452820&redirect_uri=http%3A%2F%2Fbottombots.xyz%2Fauth&response_type=token&scope=identify%20email&state=${localStorage.getItem('oauth-state')}';">Log In</span>`
    }
}
function generateRandomString() {
	let randomString = '';
	const randomNumber = Math.floor(Math.random() * 6);

	for (let i = 0; i < 32 + randomNumber; i++) {
		randomString += String.fromCharCode(47 + Math.floor(Math.random() * 11));
	}

	return randomString;
}

function logout() {
    location.reload()
    localStorage.clear();
}

function voteAction() {
    if(usertime != null){
        store.collection('bots').doc(target).get().then((doc) =>{
            let index = parseFloat(doc.data().vote) + 1
            store.collection('bots').doc(target).update({
              vote: index
            })
          }).catch((err) => {
            window.alert("An error occured during voting. Check console for more.");
            console.error(err);
        })
    } else{
        window.alert("You must first log in to vote!")
    }
}
