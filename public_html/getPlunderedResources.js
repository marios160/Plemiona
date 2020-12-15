javascript:{
    if (!window.location.href.includes("in_a_day")) {
        sessionStorage.removeItem('stats');
        sessionStorage.removeItem('plazers');
        window.location.href = "https://pl160.plemiona.pl/game.php?screen=ranking&mode=in_a_day";
    } else {

        var stats = sessionStorage.getItem('stats');
        if (stats == null) {
            var list = prompt('Wklej liste graczy');
            list = list.replace('Nazwa \tRanking \tP. \tRanking globalny \tWioski ', '');
            listSplit = list.split(/ \t\d{0,2} \t\d{1,},{0,1}\d{0,3} \t\d{1,} \t\d{1,}/);
            console.log(listSplit);
            var arr = [];
            for (var i = 0; i < listSplit.length; i++) {
                if (listSplit[i].length > 0) {
                    var p = listSplit[i].replace(/\(.*\)/, '');
                    arr.push(p);
                }
            }
            var nicks = JSON.stringify(arr.reverse());
            sessionStorage.setItem('players', nicks);
            sessionStorage.setItem('stats', '');
        } else {
            var row = document.getElementsByClassName('lit-item');
            var copy = "";
            for (var i = 1; i < row.length; i++) {
                if (i == 2)
                    continue;
                if (i == 3) {
                    copy = copy + row[i].innerText.replace(".", "") + " \t";
                } else {
                    copy = copy + row[i].innerText + " \t";
                }
            }
            ;
            copy = copy.substring(0, copy.length - 2);
            sessionStorage.setItem('stats', stats + copy + '\r\n');
        }
        var players = JSON.parse(sessionStorage.getItem('players'));
        var input = document.getElementsByName('name');
        if (players.length == 0) {
            alert(sessionStorage.getItem('stats'));
            sessionStorage.removeItem('stats');
            sessionStorage.removeItem('players');
        } else {
            var player = players[players.length - 1].trim();
            players.pop();
            sessionStorage.setItem('players', JSON.stringify(players));
            window.location.href = "https://pl160.plemiona.pl/game.php?screen=ranking&mode=in_a_day&type=loot_res&name=" + player;
        }

    }
}
