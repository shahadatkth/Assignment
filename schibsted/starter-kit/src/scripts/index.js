require('../styles/index.scss');

/*function imageSrc(name) {
    var imageURL = "http://localhost:8111/png/" + name + "/200";
    var imageSource = "";
    return $.ajax({
        type: "GET",
        async: "false",
        url: imageURL,
        beforeSend: function (xhr) {
            xhr.overrideMimeType('text/plain; charset=x-user-defined');
        },
        success: function (result, textStatus, jqXHR) {
            if (result.length < 1) {
                alert("The thumbnail doesn't exist");
                $("#thumbnail").attr("src", "data:image/png;base64,");
                return
            }

            var binary = "";
            var responseText = jqXHR.responseText;
            var responseTextLen = responseText.length;

            for (var i = 0; i < responseTextLen; i++) {
                binary += String.fromCharCode(responseText.charCodeAt(i) & 255)
            }
            cards.push({name: name, img: "data:image/png;base64," + btoa(binary), id: k.id});

            imageSource = "data:image/png;base64," + btoa(binary);
        },
        error: function (xhr, textStatus, errorThrown) {
            alert("Error in getting document " + textStatus);
        }
    });
}*/

(function () {

    var Memory = {

        init: function (cards) {
            this.$game = $(".game");
            this.$modal = $(".modal");
            this.$overlay = $(".modal-overlay");
            this.$restartButton = $("button.restart");
            this.cardsArray = $.merge(cards, cards);
            this.shuffleCards(this.cardsArray);
            this.setup();
        },

        shuffleCards: function (cardsArray) {
            this.$cards = $(this.shuffle(this.cardsArray));
        },

        setup: function () {
            this.html = this.buildHTML();
            this.$game.html(this.html);
            this.$memoryCards = $(".card");
            this.paused = false;
            this.guess = null;
            this.binding();
        },

        binding: function () {
            this.$memoryCards.on("click", this.cardClicked);
            this.$restartButton.on("click", $.proxy(this.reset, this));
        },
        // kinda messy but hey
        cardClicked: function () {
            var _ = Memory;
            var $card = $(this);
            if (!_.paused && !$card.find(".inside").hasClass("matched") && !$card.find(".inside").hasClass("picked")) {
                $card.find(".inside").addClass("picked");
                if (!_.guess) {
                    _.guess = $(this).attr("data-id");
                } else if (_.guess == $(this).attr("data-id") && !$(this).hasClass("picked")) {
                    $(".picked").addClass("matched");
                    _.guess = null;
                } else {
                    _.guess = null;
                    _.paused = true;
                    setTimeout(function () {
                        $(".picked").removeClass("picked");
                        Memory.paused = false;
                    }, 600);
                }
                if ($(".matched").length == $(".card").length) {
                    _.win();
                }
            }
        },

        win: function () {
            this.paused = true;
            setTimeout(function () {
                Memory.showModal();
                Memory.$game.fadeOut();
            }, 1000);
        },

        showModal: function () {
            this.$overlay.show();
            this.$modal.fadeIn("slow");
        },

        hideModal: function () {
            this.$overlay.hide();
            this.$modal.hide();
        },

        reset: function () {
            this.hideModal();
            this.shuffleCards(this.cardsArray);
            this.setup();
            this.$game.show("slow");
        },

        // Fisher--Yates Algorithm -- https://bost.ocks.org/mike/shuffle/
        shuffle: function (array) {
            var counter = array.length, temp, index;
            // While there are elements in the array
            while (counter > 0) {
                // Pick a random index
                index = Math.floor(Math.random() * counter);
                // Decrease counter by 1
                counter--;
                // And swap the last element with it
                temp = array[counter];
                array[counter] = array[index];
                array[index] = temp;
            }
            return array;
        },

        buildHTML: function () {
            var frag = '';
            this.$cards.each(function (k, v) {


                frag += '<div class="card" data-id="' + v.id + '"><div class="inside">\
				<div class="front"><img id="img-' + v.id + '" src="' + v.img + '"\
				alt="' + v.name + '" /></div>\
				<div class="back"><img src="https://mds.pliing.com/sync/demo/test/logo.jpg"\
				alt="schibsted" /></div></div>\
				</div>';


            });

            return frag;
        }
    };

    var cards = [
        {
            name: "alice",
            img: "http://localhost:8111/png/alice/200",
            id: 1,
        },
        {
            name: "bully",
            img: "http://localhost:8111/png/bully/200",
            id: 2
        },
        {
            name: "diamond",
            img: "http://localhost:8111/png/thapraiagallalkoiradimu/200",
            id: 3
        },
        {
            name: "vonda",
            img: "http://localhost:8111/png/vonda/200",
            id: 4
        },
        {
            name: "bichichara",
            img: "http://localhost:8111/png/bichichara/200",
            id: 5
        },
        {
            name: "balchira",
            img: "http://localhost:8111/png/balchira/200",
            id: 6
        },
        {
            name: "notangki",
            img: "http://localhost:8111/png/notangki/200",
            id: 7
        },
        {
            name: "khankimagi",
            img: "http://localhost:8111/png/khankimagi/200",
            id: 8
        },
        {
            name: "chodna",
            img: "http://localhost:8111/png/chodna/200",
            id: 9
        },
        {
            name: "hogarpola",
            img: "http://localhost:8111/png/hogarpola/200",
            id: 10
        },
        {
            name: "kuttarbaccha",
            img: "http://localhost:8111/png/kuttarbaccha/200",
            id: 11
        },
        {
            name: "balchal",
            img: "http://localhost:8111/png/balchal/200",
            id: 12
        },
    ];

    Memory.init(cards);


})();
