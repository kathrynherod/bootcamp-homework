function renderDom() {
    var timeHrSel = $("#train-time-hr");

    for (var i = 0; i < 24; i++) {
        if (i < 10) {
            $(timeHrSel).append("<option id='hr-0" + [i] + "'>" + "0" + [i]);
        } else {
            $(timeHrSel).append("<option id='hr-" + [i] + "'>" + [i]);
        }
    }
    for (var j = 0; j < 10; j++) {
        $("#train-time-min1").append("<option id='min1-" + [j] + "'>" + [j]);
    }
  /*   for (var k = 0; k < 10; j++) {
        $("#train-time-min2").append("<option id='min2-" + [k] + "'>" + [k]);
    }*/

}
renderDom();