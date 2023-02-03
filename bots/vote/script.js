const maestro = document.getElementById("botpage");
const fragment = new URLSearchParams(window.location.search.slice(1));
const [target, uuid] = [fragment.get('id'), localStorage.getItem('log_id')];
const [accessToken, tokenType, state] = [localStorage.getItem('access_token'), localStorage.getItem('token_type'), localStorage.getItem('state')];
const usertime = localStorage.getItem('discriminator');
const loggedAs = `${localStorage.getItem('username')}#${localStorage.getItem('discriminator')}`
let wid = '1071123873053024316'
let piname = ''
let woken = 'v7TjXDpxpGvoF37osOtapHcdEPzNztzvtTmKchLvu8N5_93xXFwnrTYSUpnMh2-KRlz2'

const config = {
    apiKey: "AIzaSyAV1jnqT5r1xKYaW_z1c_M7rp8rWiMC3A8",
    authDomain: "bottom-bots.firebaseapp.com",
    projectId: "bottom-bots",
    storageBucket: "bottom-bots.appspot.com",
    messagingSenderId: "759946456504",
    appId: "1:759946456504:web:d5e5eacfa53d9ef43ab34d"
};
firebase.initializeApp(config);
const store = firebase.firestore();

window.onload = function(){
    if(target != null){
    fetch('https://advertise.ggpht.ga/api')
        .then(result => result.json())
        .then(response => {
            const { name, forward } = response;
            document.getElementById("linkfors").href = forward;
            document.getElementById("imagerender").src = name;
        })
    store.collection("bots").where("id", "==", target)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const botto = doc.data()
                    piname = botto.name
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
            const dra = doc.data()
            
            const loginVal = `https://discord.com/api/webhooks/${wid}/${woken}`
    
            var request = new XMLHttpRequest();
                
            request.open("POST", loginVal);
            try {
                if(loginVal == "") throw "empty";
            }
            catch(err) {
                window.alert("Webhook: " + err);
            }
            request.setRequestHeader('Content-type', 'application/json');
            var params = {
                username: "refactored rotary logger",
                avatar_url: "https://cdn.discordapp.com/avatars/967116498290217010/79f1fad9d30192caa2f787ad06ecbc60.webp",
                content: ` `,
                embeds: [
                    {
                        "author": {
                            "name": `${localStorage.getItem('username')} voted for ${dra.name}!`,
                            "url": `https://bottombots.xyz/bots/?id=${target}`,
                            "icon_url": "https://tallerthanshort.github.io/ut3.ggpht/icons/Bottom_new.png"
                        }
                    }
                ]
            }
            request.send(JSON.stringify(params))

            store.collection('creds').doc(target).update({
                vote: firebase.firestore.FieldValue.increment(1),
                votes: firebase.firestore.FieldValue.arrayUnion(uuid)
            });
            setTimeout(function(){location.href=`/bots/?id=${target}`},1900)
            
        })
    } else{
        window.alert("You must first log in to vote!")
    }
}
