
const flip_card_array = [
  {
    title: "happy frog",
    class: "frog_smile",
    img: "./assets/frog_smile.svg"

  },
  {
    title: "sad frog",
    class: "frog_sad",
    img: "./assets/frog_sad.svg"
  },
  {
    title: "shocked frog",
    class: "frog_shocked",
    img: "./assets/frog_shocked.svg"
  },
  {
    title: "girl frog sad",
    class: "girl_frog_sad",
    img: "./assets/girl_frog_sad.svg"
  },
  {
    title: "girl frog happy",
    class: "girl_frog_smile",
    img: "./assets/girl_frog_smile.svg"

  },
  {
    title: "girl frog shocked",
    class: "girl_frog_shocked",
    img: "./assets/girl_frog_shocked.svg"
  },
  {
    title: "happy frog",
    class: "frog_smile",
    img: "./assets/frog_smile.svg"

  },
  {
    title: "sad frog",
    class: "frog_sad",
    img: "./assets/frog_sad.svg"
  },
  {
    title: "shocked frog",
    class: "frog_shocked",
    img: "./assets/frog_shocked.svg"
  },
  {
    title: "girl frog sad",
    class: "girl_frog_sad",
    img: "./assets/girl_frog_sad.svg"
  },
  {
    title: "girl frog happy",
    class: "girl_frog_smile",
    img: "./assets/girl_frog_smile.svg"

  },
  {
    title: "girl frog shocked",
    class: "girl_frog_shocked",
    img: "./assets/girl_frog_shocked.svg"
  }
]

const $memory_game = $('#memory');
const $game = $("<section>").attr('class', 'game');
$memory_game.append($game);


$(function () {

  // //shuffle cards each time page reloads
  function shuffle(array) { //this code is from stack overflow
    let current_index = array.length;
    let temporary_value;
    let random_index;

    while (0 !== current_index) {
      // Pick a remaining element...

      random_index = Math.floor(Math.random() * current_index);
      current_index -= 1;

      // And swap it with the current element.
      temporary_value = array[current_index];
      array[current_index] = array[random_index];
      array[random_index] = temporary_value;
    }
    return array;
  }

  const shuffled_cards = shuffle(flip_card_array); //calling shuffle of flip_card_array in variable shuffled_cards

  //this prints the cards to the screen 
  shuffled_cards.forEach(item => {
    const $card = $("<div>").attr("class", "card");
    const $front = $("<div>").attr("class", "front");
    const $flip = $("<div>")
      .attr("class", "back")
      .attr('data-set', item.class);

    const $image = $("<img>")
      .attr("src", item.img)
      .attr("class", "frog");

    $card.append($front)
    $card.append($flip)
    $flip.append($image);
    $game.append($card);

  });

  let first_click = '';
  let second_click = '';
  let click = 0;
  let delay = 1000;
  let tries = 8;
   


  const reset = () => {
    first_click = '';
    second_click = '';
    click = 0;
    $('.selected_card').removeClass('selected_card');
  }

  const card_match = () => {
    let $selected_card = $('.selected_card')
    $selected_card.addClass('card_match')
  
  }
  const close_modal = $('button').click(function () {
    $(".modal").hide();
  })
  const game_over = $(".over_button").click(function () {
    location.reload();
  })

  $(".card").on("click", function () {

    let clicked = $(this);
    if (clicked.element === "section" || clicked.hasClass('selected_card')) {
      return;
    }
   

    if (click < 2) {
      click++;

      if (click === 1) {
        first_click = $(this).children(".back").data("set");
        clicked.addClass('selected_card')
      } else {
        second_click = $(this).children(".back").data("set");
        clicked.addClass('selected_card')
      }

      // clicked.addClass('selected_card') //added class so only two cards will be "selected"
      if (first_click !== '' && second_click !== '') {
        console.log(first_click, second_click)
        if (first_click === second_click) {
          setTimeout(card_match, delay);
        } else {
          tries--;
        }

        if (tries === 0) {
          $(".over_modal").show(200);
          game_over();
        } else {
          setTimeout(reset, delay);
          
        }
      }
    }

  })
  $(".modal").show(200);


  close_modal();

})

