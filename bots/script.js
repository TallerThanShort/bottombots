window.onload = function(){
    const maestro = document.getElementById("botpage");
    const fragment = new URLSearchParams(window.location.hash.slice(1));
    const [target, adid] = [fragment.get('id'), fragment.get('dev')];
    if(target != null){
    store.collection("bots").where("id", "==", target)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const botto = doc.data()
                    maestro.innerHTML = `<div id="banner" style="position: relative;"><img src="${botto.banner}" style="width: 100%;"></div><br><div id="profile" style="position: relative;"><img src="${botto.profile_image}" style="height: 48px; width: 48px; border-radius: 50%; position: absolute; top: -46px; left: 6px;"><b id="name" style="position: absolute; top: 6px; left: 5px;">${botto.name}</b><p style="position: absolute; top: -21px; right: 15px; color: gray; font-size: 10px;">Bot ID: ${botto.id}</p><p style="position: absolute; top: 32px; left: 5px;">Created by: ${botto.owner_name}</p></div><div style="position: relative;" id="invite"><button style="position: absolute; top: 6px; right: 15px;" onclick="location.href='${botto.invite}';">Invite ${botto.name}</button></div>`;
        });
    })
    .catch((error) => {
        window.alert("Error getting data: ", error);
    });
    }
}
