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

const container = document.querySelector('.gridz');
        const something = document.querySelector('.texst');
        const usertime = localStorage.getItem('discriminator');
        let html = ``;

        if(usertime != null){
            db.collection('users').get().then(snapshot => {
                helloUser(snapshot.docs);
            });
            db.collection('queue').get().then(snapshot => {
                setupSite(snapshot.docs);
            });


        const helloUser = (data) => {
            data.forEach(doc => {
                const boo = doc.data();
                something.innerHTML += boo.wewo;
            })
        }

        const setupSite = (data) => {
            data.forEach(doc => {
                const bot = doc.data();
                const li = `
                <div onclick="location.href='${bot.invite}';" title="Invite ${bot.name}">
                    <div class="slot">
                        <div class="banner">
                            <img class="banner-img" src="${bot.banner}">
                        </div>
                        <div class="image">
                            <img class="image-img" src="${bot.profile_image}">
                        </div>
                        <div class="bot-descriptors">
                            <div class="bot-desc">
                                <div class="bot-name">${bot.name}</div>
                                <div class="bot-id">${bot.id}</div>
                                <div class="owner-descriptors">
                                    <div>
                                        <p id="owner">${bot.owner_name}</p>
                                    </div>
                                    <div>
                                        <p id="owner-id">Pending Review</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                `;
                html += li
            });
            container.innerHTML = html;
        }
        } else{
            const li = `
            <h3 style="color: crimson; cursor: pointer;" onclick="location.href='/'">You must first log in to see /bots/review</h3>
            `
            container.innerHTML = li;
        }

        window.onload = () => {
            const [accessToken, tokenType, state] = [localStorage.getItem('access_token'), localStorage.getItem('token_type'), localStorage.getItem('state')];
    const loggedAs = `${localStorage.getItem('username')}#${localStorage.getItem('discriminator')}`
    const usertime = localStorage.getItem('discriminator');
    if(usertime != null){
        let html = `
        <div class="dropdown">
            <span class="dropbtn">${loggedAs}</span>
                <div class="dropdown-content">
                <a href="/bots/add">Add a Bot</a>
                <a href="/servers/add">Add a Server</a>
            </div>
        </div>
        `
        document.getElementById('navbarthings').innerHTML += html;
    } else{
        document.getElementById('navbarthings').innerHTML += `<span class="link-1naFFL link-2eyudH" onclick="document.location.href = 'https://discord.com/api/oauth2/authorize?client_id=914396590901452820&redirect_uri=http%3A%2F%2Fbottombots.xyz%2Fauth&response_type=token&scope=identify%20email&state=${localStorage.getItem('oauth-state')}';">Log In</span>`
    }
        }