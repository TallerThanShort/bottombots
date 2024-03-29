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

window.onload = () => {
    const [accessToken, tokenType, state, timerama] = [localStorage.getItem('access_token'), localStorage.getItem('token_type'), localStorage.getItem('state'), localStorage.getItem('logtimer')];
    const usertime = localStorage.getItem('discriminator');
    const loggedAs = `${localStorage.getItem('username')}#${localStorage.getItem('discriminator')}`

    if(!accessToken){
        const randomString = generateRandomString();

        localStorage.setItem('oauth-state', randomString);
    }
    
    if(usertime, timerama != null){
        if(new Date().getTime() >= timerama) logout();
        let html = `
        <div class="dropdown">
            <span class="dropbtn">${loggedAs}</span>
                <div class="dropdown-content">
                <a href="/bots/add">Add a Bot</a>
                <a href="/servers/add">Add a Server</a>
                <a style="cursor: pointer;" onclick="logout()">Log Out</a>
            </div>
        </div>
        `
        document.getElementById('navbarthings').innerHTML += html;
    } else{
        document.getElementById('navbarthings').innerHTML += `<span class="link-1naFFL link-2eyudH" onclick="document.location.href = 'https://discord.gg/67ZBtEXt2V';">Join the Discord for updates</span>`
    }
};

const randomiseData = (data) => {
    let tutal = 0;
    let list = [];
    data.forEach(doc => {
        tutal++
        list[tutal] = `${doc.data().id}`;
    });
    shuffle(list);
    setTimeout(function(){setupSite(list)}, 100);
}

function shuffle(array) {
    var m = array.length, t, i;
    
    while(m){
        i = Math.floor(Math.random() * m--);

        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }

    return array;
}