javascript:{
    if (!window.location.href.includes("members_troops") && !window.location.href.includes("members_buildings")) {
        sessionStorage.removeItem('data');
        var ask = confirm("Jeśli chcesz pobrać wojska kliknik 'ok', jeśli budynki klinkij 'Anuluj'");
        if (ask) {
            window.location.href = "https://pl160.plemiona.pl/game.php?screen=ally&mode=members_troops";
        } else {
            window.location.href = "https://pl160.plemiona.pl/game.php?screen=ally&mode=members_buildings";
        }
    }
    var table = document.getElementsByClassName('vis w100');
    if (table.length == 0) {
        document.getElementsByName('player_id')[0].options.selectedIndex = document.getElementsByName('player_id')[0].options.selectedIndex + 1;
        document.getElementsByName('player_id')[0].onchange();
    } else {
        var copy = "";
        var tab = document.getElementsByClassName('selected');
        var offset = 0;
        switch (tab[1].innerText) {
            case "Wojska":
                offset = 3;
                break;
            case "Budynki":
                offset = 0;
                break;
            default:
                break;
        }
        for (var j = 1; j < table[0].children[0].children.length; j++) {
            var row = table[0].children[0].children[j].children;
            for (var i = 1; i < row.length - offset; i++) {
                if (tab[1].innerText == "Budynki" && i == 1) {
                    copy = copy + row[i].innerText.replace('.', '') + " \t";
                } else {
                    copy = copy + row[i].innerText + " \t";
                }
            }
            copy = copy.substring(0, copy.length - 2);
            copy = copy + '\r\n';
        }

        var data = sessionStorage.getItem('data');
        if (data == null) {
            sessionStorage.setItem('data', copy);
        } else {
            sessionStorage.setItem('data', data + copy);
        }
        var select = document.getElementsByName('player_id')[0];
        var index = select.options.selectedIndex;
        if (index == select.length - 1) {
            alert(sessionStorage.getItem('data'));
            sessionStorage.removeItem('data');
        } else {
            do {
                index = index + 1;
                select.options.selectedIndex = index;
            } while (select.options[index].text.includes('(brak dostępu)'));
            select.onchange();
        }
    }
}
;
