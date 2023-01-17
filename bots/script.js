const maestro = document.getElementById("botpage");
const fragment = new URLSearchParams(window.location.search.slice(1));
const [target, dave] = [fragment.get('id'), fragment.get('dev')];
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
                    maestro.innerHTML = `<div id="banner" style="overflow: hidden; position: relative; height: 170px;"><img src="${botto.banner}" style="overflow: hidden; width: 100%;"></div><br><div id="profile" style="background-color: lightgray; position: relative;"><img src="${botto.profile_image}" style="height: 48px; width: 48px; border-radius: 50%; position: absolute; top: -46px; left: 6px;"><b id="name" style="position: absolute; top: 6px; left: 5px;">${botto.name}</b><p style="position: absolute; top: -18px; right: 15px; color: gray; font-size: 10px;">Bot ID: ${botto.id}</p><p style="position: absolute; top: -30px; right: 15px; color: gray; font-size: 11px;">Prefix: ${botto.prefix}</p><p style="position: absolute; top: -8px; right: 15px; font-size: 12px;">Votes: ${botto.vote}</p><p style="position: absolute; top: 32px; left: 5px;">Created by: ${botto.owner_name}</p></div><div style="position: relative;" id="invite"><button style="position: absolute; top: 56px; right: 15px;" onclick="location.href='${botto.invite}';">Invite ${botto.name}</button></div><div style="position: relative;" id="invite"><button style="position: absolute; top: 26px; right: 15px;" onclick="voteAction()">Vote for ${botto.name}</button></div><div style="position: relative;"><p id="bot-long-desc" style="position: absolute; top: 90px;">${botto.longdesc}</p></div>`;
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
        location.href=`vote/?id=${target}`/*
        store.collection('bots').doc(target).get().then((doc) =>{
            let index = parseFloat(doc.data().vote) + 1
            store.collection('bots').doc(target).update({
              vote: index
            })
          }).catch((err) => {
            window.alert("An error occured during voting. Check console for more.");
            console.error(err);
        })
    */} else{
        window.alert("You must first log in to vote!")
    }
}
