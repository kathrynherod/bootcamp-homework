var ClozeCard = function(no, full, cloze) {
    this.cardNumber = no;
    this.full = full;
    this.cloze = cloze;
    this.partial = makePartial(full, cloze);
}

function makePartial(full, cloze) {
    full = full.toLowerCase();
    cloze = cloze.toLowerCase();
    if (full.indexOf(cloze) !== -1) {
        return full.replace(cloze, '... ');
    } else {
        return "You screwed up somewhere. Start over."
    }
}

module.exports = ClozeCard;