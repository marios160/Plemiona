//pobieraniewojska
javascript:{
    var table = document.getElementsByClassName('vis w100');
    var row = table[0].children[0].children[1].children;
    var copy = "";
    for (var i = 1; i < row.length - 3; i++) {
        copy = copy + row[i].innerText + " \t";
    }
    ;
    copy = copy.substring(0, copy.length - 2);
    var data = sessionStorage.getItem('data');
    if (data == null) {
        sessionStorage.setItem('data', copy);
    } else {
        sessionStorage.setItem('data', data + '\r\n' + copy);
    }

    document.getElementsByName('player_id')[0].options.selectedIndex = document.getElementsByName('player_id')[0].options.selectedIndex + 1;
    document.getElementsByName('player_id')[0].onchange();
}
;
