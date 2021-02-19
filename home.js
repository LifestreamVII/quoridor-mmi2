"use strict"


// initialisation des variables

let caseX; // coordonnées X des cases (blocs)

let caseY; // coordonnées Y des cases (blocs)

let bloc; // variable contenant le code HTML pour générer une case / bloc

let gap; // variable contenant le code HTML pour générer un gap (une barre) à la verticale

let gapligne; // variable contenant le code HTML pour générer un gap (une barre) à l'horizontale

let gapbloc;


// Début du code

$(document).ready(()=>{

    console.log("ready"); //document chargé


  // Variables compteur
    let r = 0; // r : compteur pour les lignes
    let c = 0; // c : compteur pour les cases, ajoutées (append) dans chaque ligne

    // Répéter l'opération 9 fois (pour générer 9 lignes)
    while (r != 9){

        //  variable contenant le code HTML pour générer une ligne
        let row = `<div class='row' id='${r}'></div>`;

        // gapligne : voir ci-dessus
        let gapgroup = '<div class="h-gap-group"></div>'

        // ajoute à la div principale une ligne
        $("#maincontent").append(`${row}`);
        $("#maincontent").append(`${gapgroup}`);

        // initialisation compteur
        let h;

        // ajoute 1 au compteur r (pour répéter la génération de lignes/barres)
        r+=1;
    }

// Répéter l'opération 9 fois (pour générer 9 cases/blocs)
    while (c !=9){
        // caseX: attribut où sera stockée la coordonnée X d'une case
        caseX = c;

        // bloc: voir ci-dessus
        bloc = `<div class='case' caseX=${caseX} caseY=${caseY}></div>`;

        // gap: voir ci-dessus
        gap = `<div class='gap' caseX=${caseX} caseY=${caseY}></div>`;
        
        gapligne = `<div class='gapligne' caseX='${c}'></div>`;
        gapbloc = `<div class='gapbloc' caseX='${c}'></div>`;

        // ajoute (append) à chaque ligne une case et une barre verticale, aux mêmes coordonnées
        $(".row").append(`${bloc}`);
        $(".row").append(`${gap}`);
        $(".h-gap-group").append(`${gapligne}`+`${gapbloc}`);
        c+=1;
    }
    

    // initialise le compteur i
    let i = 0;
    
    // ajoute les coordonnées Y à chaque case (chaque enfant de chaque ligne)
    while (i < 9){
        // transfère/copie l'attribut ID de chaque ligne aux coordonnées Y de ses enfants 
        $(`.row:eq(${i})`).children().attr("caseY", $(`.row:eq(${i})`).attr("id"));

        // ajoute 1 au compteur i
        i+=1;
    }



    let coordNextGAP; // sélectionne la div du mur de droite (pour doubler la longueur)
    let coordNextVert;
    let coordBlock; // sélectionne le "bloc" associé au mur (sera utilisé par la suite pour prévenir la superposition avec murs verticaux)

    $(".gapligne").hover(function() {       // vérification des murs déjà posés
        
        // si un bloc est déjà marqué comme actif dans les environs
        if ($(this).siblings(`.gapbloc[caseX=${$(this).attr("caseX")}]`).is('.isActive, .verActive') || $(this).siblings(`.gapbloc[caseX=${parseInt($(this).attr("caseX")) - 1}]`).is('.isActive, .verActive') || $(this).siblings(`.gapbloc[caseX=${parseInt($(this).attr("caseX")) + 1}]`).is('.isActive, .verActive')){
            console.log("23");
        }
        // hover accepté
        else{
            $(this).css({'background-color':'blue'});
            coordNextGAP = $(this).siblings(`.gapligne[caseX=${parseInt($(this).attr("caseX"))+1}]`);
            coordNextGAP.css({'background-color':'blue'});
        }
        
    }, function(){
        // mouse out
        if ($(this).siblings(`.gapbloc[caseX=${$(this).attr("caseX")}]`).is('.isActive, .verActive') || $(this).siblings(`.gapbloc[caseX=${parseInt($(this).attr("caseX")) - 1}]`).is('.isActive, .verActive') || $(this).siblings(`.gapbloc[caseX=${parseInt($(this).attr("caseX")) + 1}]`).is('.isActive, .verActive')){
            console.log("23");
        }
        else{
            $(this).css({'background-color':'initial'});
            coordNextGAP.css({'background-color':'initial'});
        }
    })    
    
    let J1barCount = 0;
    let J2barCount = 0;

    // placement d'un mur
    $(".gapligne").click(function() {
        if (someoneWon)
        {
            // do nothing
        }
        else{
        let gapLocation = $(this);
        if (isItP1){
            if (J1barCount < 6){
            putGap(gapLocation)
            J1barCount++;
            $(".murP1").first().remove();
            isItP1 = false;
            $("#tourJ").css({'color':'blue'});
            $("#tourJ").html("Joueur 2");
        }
        }
        else{
            if (J2barCount < 6){
                putGap(gapLocation)
                J2barCount++;
                $(".murP2").first().remove();
                isItP1 = true;
                $("#tourJ").css({'color':'red'});
                $("#tourJ").html("Joueur 1");
            }
        }
    }})

    $(".gap").click(function(){
        if (someoneWon)
        {
            // do nothing
        }
        else{
        let gapLocation = $(this);
        if (isItP1){
            if (J1barCount < 6){
            putVerGap(gapLocation);
            J1barCount++;
            $(".murP1").first().remove();
            isItP1 = false;
            $("#tourJ").css({'color':'blue'});
            $("#tourJ").html("Joueur 2");
        }
        }
        else{
            if (J2barCount < 6){
                putVerGap(gapLocation);
                J2barCount++;
                $(".murP2").first().remove();
                isItP1 = true;
                $("#tourJ").css({'color':'red'});
                $("#tourJ").html("Joueur 1");
            }
        }
    }})
    
    for(i=0; i<6; i++){
        $(".mursP1").append(`<div class="murP1">`);
        $(".mursP2").append(`<div class="murP2">`);
    }

    $(".gap").hover(function() {
        
        if ($(".h-gap-group").eq(parseInt($(this).attr("caseY"))-1).children(`.gapbloc[caseX=${$(this).attr("caseX")}]`).is('.isActive, .verActive') || $(".h-gap-group").eq(parseInt($(this).attr("caseY"))-2).children(`.gapbloc[caseX=${$(this).attr("caseX")}]`).is('.isActive, .verActive') || $(".h-gap-group").eq(parseInt($(this).attr("caseY"))).children(`.gapbloc[caseX=${$(this).attr("caseX")}]`).is('.isActive, .verActive')){
            console.log("23");
        }
        // hover accepté
        else{
            $(this).css({'background-color':'blue'});
            coordNextVert =  $(`.gap[caseX=${$(this).attr("caseX")}][caseY=${parseInt($(this).attr("caseY"))-1}]`);
            coordNextVert.css({'background-color':'blue'});
        }
        
    }, function(){
        if ($(".h-gap-group").eq(parseInt($(this).attr("caseY"))-1).children(`.gapbloc[caseX=${$(this).attr("caseX")}]`).is('.isActive, .verActive') || $(".h-gap-group").eq(parseInt($(this).attr("caseY"))-2).children(`.gapbloc[caseX=${$(this).attr("caseX")}]`).is('.isActive, .verActive') || $(".h-gap-group").eq(parseInt($(this).attr("caseY"))).children(`.gapbloc[caseX=${$(this).attr("caseX")}]`).is('.isActive, .verActive')){
            console.log("23");
        }
        else{
            $(this).css({'background-color':'initial'});
            coordNextVert.css({'background-color':'initial'});
    }})    

    function putGap(gapLocation){
        gapLocation.css({'background-color':'green'});
        coordNextGAP = gapLocation.siblings(`.gapligne[caseX=${parseInt(gapLocation.attr("caseX"))+1}]`);
        coordNextGAP.css({'background-color':'green'});
        coordBlock = gapLocation.siblings(`.gapbloc[caseX=${gapLocation.attr("caseX")}]`);
        coordBlock.addClass("isActive");
    }

    function putVerGap(gapLocation){
        gapLocation.css({"background-color":"green"});
        gapLocation.addClass("verActive");
        coordNextVert =  $(`.gap[caseX=${gapLocation.attr("caseX")}][caseY=${parseInt(gapLocation.attr("caseY"))-1}]`);
        coordNextVert.css({'background-color':'green'});
        coordBlock = $(".h-gap-group").eq(parseInt(gapLocation.attr("caseY"))-1).children(`.gapbloc[caseX=${gapLocation.attr("caseX")}]`);
        coordBlock.addClass("verActive");
        coordNextVert.addClass("verActive");
    }

    //Joueurs
    //Initialisation
    let player1; //contient le HTML du J1 ou l'élément en lui-même
    let player2; //contient le HTML du J2 ou l'élément en lui-même
    let positionP1; //contient le sélécteur du parent avec la classe case (pour obtenir les coordonnées XY)
    let positionP2; //idem mais pour le J2
    let isItP1; // vérifie le tour (J1 ou J2)

    //affectation des vars en début de jeu
    isItP1 = true;                                          // Premier tour au joueur 1
    player1 = `<div id='player1'></div>`;                   // code HTML de la div
    positionP1 = $(".case[caseX='4'][caseY='8']");          // sélectionne la case avec les coordonnées X=4 et Y=8 (tout en bas)
    positionP1.append(`${player1}`);                        // place le pion du J1 en tant qu'enfant de la case
    player1 = $("#player1");                                // change la variable pour affecter l'élément

    player2 = `<div id='player2'></div>`;
    positionP2 = $(".case[caseX='4'][caseY='0']");          // sélectionne la case avec les coordonnées X=4 et Y=8 (tout en haut)
    positionP2.append(`${player2}`);
    player2 = $("#player2");


    function caseInteract(positionPlayer, playerNo, caseNo, numPlayer, color) {
        function movePlayer(){
            positionPlayer = caseNo;
            if (isItP1){
                positionP1 = positionPlayer;
                $("#tourJ").html(`Joueur 2`);
            }
            else{
                positionP2 = positionPlayer;
                $("#tourJ").html(`Joueur 1`);
            }
            $(`#player${numPlayer}`).remove();
            playerNo = `<div id='player${numPlayer}'></div>`;
            positionPlayer.append(playerNo);
            playerNo = $(`#player${numPlayer}`);
            isItP1 = !isItP1;
            $("#tourJ").css({'color':color});
        }
            // Case trop éloignée (verticalement) ?
            if (caseNo.attr("caseY") < parseInt($(positionPlayer).attr("caseY")) - 1 || caseNo.attr("caseY") > parseInt($(positionPlayer).attr("caseY")) + 1){
                console.log("denied");
            }
            // Case trop éloignée (horizontalement) ?
            else if (caseNo.attr("caseX") < parseInt($(positionPlayer).attr("caseX")) - 1 || caseNo.attr("caseX") > parseInt($(positionPlayer).attr("caseX")) + 1){
                console.log("denied");
            }

            else{
                // Case en avant
                if (caseNo.attr("caseY") == parseInt($(positionPlayer).attr("caseY")) - 1){
                    if (parseInt(caseNo.attr("caseX")) != parseInt($(positionPlayer).attr("caseX"))){
                        console.log("denied");
                    }
                    else{
                    // Mur ?
                    if (positionPlayer.closest(".row").prev().children(`.isActive[caseX=${caseNo.attr("caseX")}]`).length > 0 || positionPlayer.closest(".row").prev().children(`.isActive[caseX=${parseInt(caseNo.attr("caseX")) - 1}]`).length > 0 ) 
                    {
                        console.log("denied");
                    }
                    else{
                        // OK
                        movePlayer();
                    }
                }}
                // Case en arrière
                else if (caseNo.attr("caseY") == parseInt($(positionPlayer).attr("caseY")) + 1){
                    if (parseInt(caseNo.attr("caseX")) != parseInt($(positionPlayer).attr("caseX"))){
                        console.log("denied");
                    }
                else {
                    // Mur ?
                    if (positionPlayer.closest(".row").next().children(`.isActive[caseX=${caseNo.attr("caseX")}]`).length > 0 || positionPlayer.closest(".row").next().children(`.isActive[caseX=${parseInt(caseNo.attr("caseX")) - 1}]`).length > 0 ) 
                {
                    console.log("denied");
                }
                else{
                        // OK
                        movePlayer();
                }
                }}

                else if (caseNo.attr("caseY") == positionPlayer.attr("caseY")){
                    if (caseNo.siblings(`.gap[caseX=${caseNo.attr("caseX")}]`).hasClass("verActive") && parseInt(positionPlayer.attr("caseX")) == parseInt(caseNo.attr("caseX")) + 1 || caseNo.siblings(`.gap[caseX=${parseInt(caseNo.attr("caseX"))-1}]`).hasClass("verActive"))
                    console.log("denied")
                    else{
                        // OK
                        movePlayer();
                }
            }
            }
        }

    let someoneWon = false;

    $("#reloadpage").click(()=>{

        location.reload();

    })
    
    $(".case").click(function(){

        if (someoneWon)
        {
            // do nothing
        }
        else{
        console.log(isItP1);
        console.log(positionP1);
        console.log(positionP2);
        if (isItP1)
        caseInteract(positionP1, player1, $(this), 1, "blue");
        else
        caseInteract(positionP2, player2, $(this), 2, "red");

        if (positionP1.attr("caseY") == "0"){
            someoneWon = true;
            alert('Le joueur 1 gagne la partie !');
        }
        else if (positionP2.attr("caseY") == "8"){
            someoneWon = true;
            alert('Le joueur 2 gagne la partie !');
        }
    }})
});