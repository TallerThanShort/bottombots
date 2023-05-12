const maestro = document.getElementById("botpage");
const fragment = new URLSearchParams(window.location.search.slice(1));
const [target, dave] = [fragment.get('id'), fragment.get('dev')];
const [accessToken, tokenType, state, loookie] = [localStorage.getItem('access_token'), localStorage.getItem('token_type'), localStorage.getItem('state'), localStorage.getItem('log_id')];
const usertime = localStorage.getItem('discriminator');
const loggedAs = `${localStorage.getItem('username')}#${localStorage.getItem('discriminator')}`

window.onload = function(){
    if(target != null){
    store.collection("bots").where("id", "==", target)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const botto = doc.data()
                    if(botto.owner === loookie){
                        maestro.innerHTML = `<div id="banner" style="overflow: hidden; position: relative; height: 170px;"><img src="${botto.banner}" style="overflow: hidden; width: 100%;"></div><br><div id="profile" style="background-color: lightgray; position: relative;"><img src="${botto.profile_image}" style="height: 48px; width: 48px; border-radius: 50%; position: absolute; top: -46px; left: 6px;"><b id="name" style="position: absolute; top: 6px; left: 5px;">${botto.name}</b><p style="position: absolute; top: -18px; right: 15px; color: gray; font-size: 10px;">Bot ID: ${botto.id}</p><p style="position: absolute; top: -30px; right: 15px; color: gray; font-size: 11px;">Prefix: ${botto.prefix}</p><p id="slyvote" style="position: absolute; top: -8px; right: 15px; font-size: 12px;">Votes: ${botto.vote}</p><p style="position: absolute; top: 32px; left: 5px;">Created by: ${botto.owner_name}</p></div><div style="position: relative;" id="invite"><button style="position: absolute; top: 26px; right: 15px;" onclick="location.href='${botto.invite}';">Invite ${botto.name}</button></div><div style="position: relative;" id="edita"><button style="position: absolute; top: 86px; right: 15px;" onclick="editBoi()">Edit ${botto.name}</button></div><div style="position: relative;"><p id="bot-long-desc" style="position: absolute; top: 170px;">${botto.longdesc}</p></div>`;
                    } else{
                        maestro.innerHTML = `<div id="banner" style="overflow: hidden; position: relative; height: 170px;"><img src="${botto.banner}" style="overflow: hidden; width: 100%;"></div><br><div id="profile" style="background-color: lightgray; position: relative;"><img src="${botto.profile_image}" style="height: 48px; width: 48px; border-radius: 50%; position: absolute; top: -46px; left: 6px;"><b id="name" style="position: absolute; top: 6px; left: 5px;">${botto.name}</b><p style="position: absolute; top: -18px; right: 15px; color: gray; font-size: 10px;">Bot ID: ${botto.id}</p><p style="position: absolute; top: -30px; right: 15px; color: gray; font-size: 11px;">Prefix: ${botto.prefix}</p><p id="slyvote" style="position: absolute; top: -8px; right: 15px; font-size: 12px;">Votes: ${botto.vote}</p><p style="position: absolute; top: 32px; left: 5px;">Created by: ${botto.owner_name}</p></div><div style="position: relative;" id="invite"><button style="position: absolute; top: 86px; right: 15px;" onclick="location.href='${botto.invite}';">Invite ${botto.name}</button></div><div style="position: relative;" id="invite"><button style="position: absolute; top: 26px; right: 15px;" onclick="voteAction()">Vote for ${botto.name}</button></div><div style="position: relative;"><p id="bot-long-desc" style="position: absolute; top: 170px;">${botto.longdesc}</p></div>`;
                    }
                    store.collection("creds").doc(target).get().then((doc) => {
                        document.getElementById("slyvote").innerText = `Votes: ${doc.data().vote}`;
                    });
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
        document.getElementById('navbarthings').innerHTML += `<span class="link-1naFFL link-2eyudH" onclick="document.location.href = '<span class="link-1naFFL link-2eyudH" onclick="document.location.href = 'https://discord.gg/67ZBtEXt2V';">Join the Discord for updates</span>`
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
    location.href=`vote/?type=bot&id=${target}`
}
