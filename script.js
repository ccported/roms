document.getElementById('searchInput').addEventListener('input', function () {
    var filter = normalize(this.value);
    var items = document.querySelectorAll('.romList li');
    console.log(items)
    var validDeterminers = [];
    Array.from(items).forEach(function (item) {
        if (item.classList.contains('determiner')) return;
        var parentli = item.closest(".determiner");
        var fullText = (parentli) ? parentli.getAttribute("data-determiner") : "";
        var secondText = item.textContent;
        var text = fullText + secondText;
        text = normalize(text);
        if (text.indexOf(filter) > -1) {
            item.classList.remove('hidden');
            if (parentli) {
                parentli.classList.remove('hidden');
                validDeterminers.push(parentli);
            }
        } else {
            item.classList.add('hidden');
            if (parentli && validDeterminers.indexOf(parentli) == -1) {
                parentli.classList.add('hidden');
            }
        }
    });
});

function normalize(string) {
    string = string.toLowerCase();
    string = string.replace(/[^a-z0-9]/g, "");
    string = string.replace(/\s/g, "");
    return string;
}