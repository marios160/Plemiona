//pobierz danie o surowcach
javascript:{
    var stats = sessionStorage.getItem('stats');
    if (stats == null) {
        var list = prompt('Wklej liste graczy');
        listSplit = list.split(' ');
        var arr = [];
        for (var i = 6; i < listSplit.length; i += 5) {
            arr.push(listSplit[i]);
        }
        var nicks = JSON.stringify(arr.reverse());
        sessionStorage.setItem('players', nicks);
        sessionStorage.setItem('stats', '');
    } else {
        var row = document.getElementsByClassName('lit');
        if (row.length == 0) {
            row = document.getElementsByClassName('lit2');
            if (row.length == 0)
                row = [];
            else
                row = row[0].children;
        } else {
            row = row[0].children;
        }
        var copy = "";
        for (var i = 1; i < row.length; i++) {
            if (i == 3) {
                copy = copy + row[i].innerText.replace(".", "") + " \t";
            } else {
                copy = copy + row[i].innerText + " \t";
            }
        };
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
        input[0].value = players[players.length - 1];
        players.pop();
        sessionStorage.setItem('players', JSON.stringify(players));
        input[0].nextElementSibling.click();
    }

}
