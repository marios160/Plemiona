javascript:{
    if (!window.location.href.includes("members_troops") && !window.location.href.includes("members_buildings")) {
        sessionStorage.removeItem('buildings');
        sessionStorage.removeItem('army');
        window.location.href = "https://pl160.plemiona.pl/game.php?screen=ally&mode=members_buildings";
    }
    var table = document.getElementsByClassName('vis w100');
    if (table.length == 0) {
        document.getElementsByName('player_id')[0].options.selectedIndex = document.getElementsByName('player_id')[0].options.selectedIndex + 1;
        document.getElementsByName('player_id')[0].onchange();
    } else {
        if (sessionStorage.getItem('buildings') == null) {
            sessionStorage.setItem('buildings', JSON.stringify([]));
        }
        if (sessionStorage.getItem('army') == null) {
            sessionStorage.setItem('army', JSON.stringify([]));
        }
        var buildings = JSON.parse(sessionStorage.getItem('buildings'));
        var army = JSON.parse(sessionStorage.getItem('army'));
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
            var dataRow = [];
            if (tab[1].innerText == "Budynki"){
                dataRow.push(document.getElementsByName('player_id')[0].options[document.getElementsByName('player_id')[0].options.selectedIndex].innerText);
            }
            for (var i = 0; i < row.length - offset; i++) {
                if (tab[1].innerText == "Budynki") {
                    if (i == 0) {
                        dataRow.push(row[i].innerText.match(/\(\d{1,3}\|\d{1,3}\)/)[0].replace('(', '').replace(')', ''));
                    } else if (i == 1) {
                        dataRow.push(row[i].innerText.replace('.', ''));
                    } else {
                        dataRow.push(row[i].innerText);
                    }
                } else if (tab[1].innerText == "Wojska") {
                    if (i > 0) {
                        dataRow.push(row[i].innerText);
                    }
                }
            }
            
            
            if (tab[1].innerText == "Budynki") {
                buildings.push(dataRow);
            } else if (tab[1].innerText == "Wojska") {
                dataRow.push(document.getElementsByName('player_id')[0].options[document.getElementsByName('player_id')[0].options.selectedIndex].value);
                dataRow.push('');
                var date = new Date();
                dataRow.push(date.getFullYear() + "-" + ("0" + (date.getMonth()+1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2));
                dataRow.push(("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2) + ":" + ("0" + date.getSeconds()).slice(-2));
                army.push(dataRow);
            }

        }

        sessionStorage.setItem('buildings', JSON.stringify(buildings));
        sessionStorage.setItem('army', JSON.stringify(army));

        var select = document.getElementsByName('player_id')[0];
        var index = select.options.selectedIndex;
        if (index == select.length - 1 && window.location.href.includes("members_buildings")) {
            window.location.href = "https://pl160.plemiona.pl/game.php?screen=ally&mode=members_troops";
        } else if (index == select.length - 1 && window.location.href.includes("members_troops")) {
            var copy = "";
            for (var i = 0; i < buildings.length; i++) {
                copy = copy + buildings[i].join(" \t") + " \t" + army[i].join(" \t") + "\r\n";
            }
            alert(copy);
            sessionStorage.removeItem('buildings');
            sessionStorage.removeItem('army');
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
