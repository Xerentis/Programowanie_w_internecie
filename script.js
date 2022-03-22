var tablica;
var plansza;
var ruch_numer;
window.addEventListener("load", function(){
    document.getElementById("przycisk").addEventListener("click", function(){
        document.getElementById("komunikat").setAttribute("hidden", "");
        nowa_gra("x");
    });
    plansza = document.getElementById("plansza");
    plansza.addEventListener("click", function(zdarzenie){
        if(zdarzenie.target.nodeName != "TH" || zdarzenie.target.hasAttribute("pole"))
            return false;
        zdarzenie.target.setAttribute("pole", plansza.getAttribute("ruch"));
        var ruch = 1;
        if(plansza.getAttribute("ruch") == "x")
        {
            ruch = -1;
            plansza.setAttribute("ruch", "o");
        }
        else
            plansza.setAttribute("ruch", "x");
        ruch_numer++;
        tablica[parseInt(zdarzenie.target.getAttribute("x"))][parseInt(zdarzenie.target.getAttribute("y"))] = ruch;
        switch(czy_koniec())
        {
            case false: break;
            case -1:
                wyswietl_komunikat("Wygrał krzyzyk");
                break;
            case 1:
                wyswietl_komunikat("Wygrało kólko");
                break;
            case -2:
                wyswietl_komunikat("Remis");
                break;
        }
    });
    nowa_gra("x");
});
function wyswietl_komunikat(tresc)
{
    document.getElementById("tresc").innerHTML = tresc;
    plansza.removeAttribute("ruch");
    document.getElementById("komunikat").removeAttribute("hidden");
};
function nowa_gra(zaczyna)
{
    ruch_numer = 0;
    tablica = new Array(3);
    for(var i = 0; i < tablica.length;i++)
    {
        tablica[i] = new Array(tablica.length);
        for(var x = 0; x < tablica.length; x++)
        tablica[i][x] = 0;
    }
    var zapelnione_pola = plansza.querySelectorAll("th[pole]");
    for(var i = 0; i < zapelnione_pola.length; i++)
        zapelnione_pola[i].removeAttribute("pole");
    plansza.setAttribute("ruch", zaczyna);
};
function czy_koniec()
{
    for(var i = 0; i < 3; i++)
    {
        if(Math.abs(tablica[0][i] + tablica[1][i] + tablica[2][i]) == 3)
            return tablica[0][i];
        if(Math.abs(tablica[i][0] + tablica[i][1] + tablica[i][2]) == 3)
            return tablica[i][0];
    }
    if(Math.abs(tablica[0][0] + tablica[1][1] + tablica[2][2]) == 3)
        return tablica[0][0];
    if(Math.abs(tablica[0][2] + tablica[1][1] + tablica[2][0]) == 3)
        return tablica[0][2];
    if(ruch_numer >= 9)
        return -2;
   return false;
}