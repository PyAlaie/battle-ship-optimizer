var grid = [];
var ships = [4, 3, 3, 2, 2, 2];
var grid_table = document.querySelector('#grid');
var pr_color = "30D800";

function addAlpha(color, opacity) {
    // coerce values so ti is between 0 and 1.
    var _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
    return color + _opacity.toString(16).toUpperCase();
}

window.addEventListener('load', function() {
    grid_table.innerHTML += `
        <tr>
            <th></th>
            <th>1</th>
            <th>2</th>
            <th>3</th>
            <th>4</th>
            <th>5</th>
            <th>6</th>
            <th>7</th>
            <th>8</th>
            <th>9</th>
            <th>10</th>
        </tr>
        `.trim();

    alp = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
    for (var i = 0; i < 10; i++) {
        grid.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

        grid_table.innerHTML += `
        <tr class="r` + i + `">
            <td class="identifier">` + alp[i] + `</td>
            <td class="i0"></td>
            <td class="i1"></td>
            <td class="i2"></td>
            <td class="i3"></td>
            <td class="i4"></td>
            <td class="i5"></td>
            <td class="i6"></td>
            <td class="i7"></td>
            <td class="i8"></td>
            <td class="i9"></td>
        </tr>
        `.trim();
    }

    console.log(grid);

    document.querySelectorAll("#grid td").forEach(function(item) {
        item.addEventListener('click', function(i) {
            var target = i.target;
            if (!target.classList.contains('fixed')) {
                if (!target.classList.contains('on')) {
                    target.classList.add('on');
                } else {
                    target.classList.remove('on');
                }
            }
        });
    });

    document.querySelectorAll("#ships td").forEach(function(item) {
        item.addEventListener('click', function(i) {
            var target = i.target;
            if (!target.classList.contains('fixed')) {
                if (!target.classList.contains('on')) {
                    target.classList.add('on');
                } else {
                    target.classList.remove('on');
                }
            }
        });
    });
});


function get_grid(add_fixed=false) {
    let grid = [];

    for (var i = 0; i < 10; i++) {
        let row = [];
        for (var j = 0; j < 10; j++) {
            var item = document.querySelector('#grid .r' + i + ' .i' + j);
            if (item.classList.contains('on')) {
                if (add_fixed) {
                    item.classList.add('fixed');
                }

                row.push(1);
            } else {
                row.push(0);
            }
        }
        grid.push(row);
    }

    return grid;
}

function get_ships() {
    let grid = [];

    document.querySelectorAll('#ships td').forEach(function(item) {
        if (item.classList.contains('on')) {
            grid.push(1);
        } else {
            grid.push(0);
        }
    });

    return grid;
}

document.querySelector('#send').addEventListener('click', function() {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'api/', true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    xhr.setRequestHeader('X-CSRFToken', csrf_token);

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var resp = JSON.parse(this.responseText);

            for (var i = 0; i < 10; i++) {
                for (var j = 0; j < 10; j++) {
                    var item = document.querySelector('#grid .r' + i + ' .i' + j);
                    if (!item.classList.contains('on')) {
                        item.setAttribute('style', 'background: #' + addAlpha(pr_color, (resp.grid[i][j] / 32)));
                    }
                }
            }
        }
    };

    xhr.send(JSON.stringify({'grid': get_grid(add_fixed=true), 'ships': get_ships()}));
});

