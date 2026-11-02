const ROOMS = [
  {
    name: 'Balcony', floor: 2, guests: [
      { name: 'Aigerim', color: 'green', time: '20:45', aitu: true, things: ['cup', 'crumbs'] },
      { name: 'Aliya', color: 'black', time: '21:15', aitu: false, things: ['phone', 'cup'] },
      { name: 'Madina', color: 'green', time: '22:10', aitu: false, things: ['phone', 'bag', 'crumbs'] },
      { name: 'Ivan', color: 'black', time: '20:10', aitu: true, things: ['cup'] }
    ]
  },
  {
    name: 'Hall', floor: 2, guests: [
      { name: 'Arman', color: 'yellow', time: '20:35', aitu: false, things: ['bag', 'glasses'] },
      { name: 'Sophia', color: 'purple', time: '21:20', aitu: true, things: ['phone'] },
      { name: 'Dias', color: 'green', time: '19:45', aitu: true, things: [] },
      { name: 'Bekzat', color: 'purple', time: '20:55', aitu: false, things: ['bag', 'cup', 'crumbs'] },
      { name: 'Aruzhan', color: 'blue', time: '21:50', aitu: true, things: ['phone'] },
      { name: 'Saule', color: 'green', time: '21:25', aitu: false, things: ['glasses'] }
    ]
  },
  {
    name: 'Kitchen', floor: 1, guests: [
      { name: 'Nurlan', color: 'red', time: '19:40', aitu: true, things: ['phone', 'cup'] },
      { name: 'Emma', color: 'black', time: '20:15', aitu: false, things: ['bag'] },
      { name: 'Timur', color: 'green', time: '21:05', aitu: true, things: ['phone', 'bag', 'crumbs'] },
      { name: 'Sergey', color: 'yellow', time: '20:50', aitu: false, things: [] },
      { name: 'Yerlan', color: 'red', time: '21:40', aitu: true, things: ['glasses', 'phone'] },
      { name: 'Kamila', color: 'green', time: '20:05', aitu: false, things: ['cup'] }
    ]
  },
  {
    name: 'Living room', floor: 1, guests: [
      { name: 'Daniel', color: 'blue', time: '19:55', aitu: true, things: ['glasses'] },
      { name: 'Zarina', color: 'green', time: '21:10', aitu: false, things: ['bag', 'phone', 'crumbs'] },
      { name: 'Natasha', color: 'yellow', time: '20:30', aitu: true, things: [] },
      { name: 'Askar', color: 'black', time: '21:00', aitu: true, things: ['phone'] },
      { name: 'Inkar', color: 'purple', time: '20:20', aitu: false, things: ['bag'] }
    ]
  }
];

const MIRAS = { name: 'Miras', color: 'blue', time: '21:20', aitu: true, things: ['phone'] };

const ICONS = {
  phone: '<rect x="5" y="2" width="6" height="12" rx="1.5"/><path d="M7.5 12h1"/>',
  glasses: '<circle cx="4.5" cy="9" r="2.5"/><circle cx="11.5" cy="9" r="2.5"/><path d="M7 9h2"/>',
  bag: '<path d="M3.5 6h9l-1 8h-7z"/><path d="M6 6V4.5a2 2 0 0 1 4 0V6"/>',
  cup: '<path d="M3 6h8v4a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3z"/><path d="M11 7h1.5a1.5 1.5 0 0 1 0 3H11"/>',
  crumbs: '<path d="M2 12l3-6h9v6z"/><path d="M5 9h8"/>'
};

function toMinutes(time) {
  const parts = time.split(':');
  return Number(parts[0]) * 60 + Number(parts[1]);
}

function makeCard(guest) {
  const $card = $('<div>', { class: 'guest color-' + guest.color + (guest.aitu ? ' aitu' : ' visitor') });
  $card.attr({
    'data-name': guest.name,
    'data-color': guest.color,
    'data-time': guest.time,
    'data-minutes': toMinutes(guest.time),
    'data-aitu': guest.aitu,
    'data-things': guest.things.join(' ')
  });
  const $things = $('<div class="things">');
  guest.things.forEach(function (thing) {
    $card.addClass('has-' + thing);
    $things.append('<span class="thing ' + thing + '"><svg viewBox="0 0 16 16">' + ICONS[thing] + '</svg></span>');
  });
  const $box = $('<div class="box">');
  $box.append($('<img class="avatar">').attr({ src: 'assets/avatars/' + guest.name + '.svg', alt: guest.name }));
  if (guest.aitu) {
    $box.append('<span class="badge">AITU</span>');
  }
  $box.append($('<div class="gname">').text(guest.name));
  $box.append($('<div class="gtime">').text(guest.time));
  $box.append($things);
  return $card.append($box);
}

function buildPage() {
  const $house = $('#house').empty();
  [2, 1].forEach(function (floor) {
    const $floor = $('<section class="floor">').attr('data-floor', floor);
    $floor.append($('<div class="floor-label">').text('Floor ' + floor));
    const $rooms = $('<div class="rooms">');
    ROOMS.filter(function (room) { return room.floor === floor; }).forEach(function (room) {
      const $room = $('<div class="room">').attr('data-room', room.name);
      $room.append($('<div class="room-head">').append($('<h2>').text(room.name)));
      const $guests = $('<div class="guests">');
      room.guests.forEach(function (guest) { $guests.append(makeCard(guest)); });
      $rooms.append($room.append($guests));
    });
    $house.append($floor.append($rooms));
  });
}

const CASES = [
  { text: 'Who is in the hall?', run: function () {
    return $('.room[data-room="Hall"] .guest');
  } },
  { text: 'Who is dressed in yellow or purple?', run: function () {
    return $('.guest[data-color="yellow"], .guest[data-color="purple"]');
  } },
  { text: 'Which AITU students are upstairs?', run: function () {
    return $('.floor[data-floor="2"] .guest.aitu');
  } },
  { text: 'Who has glasses or a bag?', run: function () {
    return $('.guest.has-glasses, .guest.has-bag');
  } },
  { text: 'Who came with nothing at all?', run: function () {
    return $('.guest').not(':has(.thing)');
  } },
  { text: 'Who has a phone but no bag?', run: function () {
    return $('.guest.has-phone:not(.has-bag)');
  } },
  { text: 'Who arrived between 20:30 and 21:00?', run: function () {
    return $('.guest').filter(function () { return $(this).data('minutes') >= 1230 && $(this).data('minutes') <= 1260; });
  } },
  { text: 'Who arrived after 21:00 and is not AITU?', run: function () {
    return $('.guest:not(.aitu)').filter(function () { return $(this).data('minutes') > 1260; });
  } },
  { text: 'Who stands right next to Askar?', run: function () {
    return $('.guest[data-name="Askar"]').prev().add('.guest[data-name="Askar"] + .guest');
  } },
  { text: 'Who stands last in each room?', run: function () {
    return $('.guests .guest:last-child');
  } },
  { text: 'Who stands third in each room?', run: function () {
    return $('.guests .guest:nth-child(3)');
  } },
  { text: 'Who stands after Timur in his room?', run: function () {
    return $('.guest[data-name="Timur"]').nextAll();
  } },
  { text: 'Who stands right before someone in black?', run: function () {
    return $('.guest[data-color="black"]').prev();
  } },
  { text: 'In which room is Aruzhan?', rooms: true, run: function () {
    return $('.guest[data-name="Aruzhan"]').closest('.room');
  } },
  { text: 'Which rooms have fewer than 6 guests?', rooms: true, run: function () {
    return $('.room').filter(function () { return $(this).find('.guest').length < 6; });
  } },
  { text: 'Which rooms have a cup but no glasses?', rooms: true, run: function () {
    return $('.room:has(.has-cup):not(:has(.has-glasses))');
  } },
  { text: 'Who came first to each room?', run: function () {
    return $('.guest').filter(function () {
      const minutes = $(this).data('minutes');
      return $(this).siblings().filter(function () { return $(this).data('minutes') < minutes; }).length === 0;
    });
  } },
  { text: 'Miras comes and stands between Askar and Inkar', run: function () {
    return makeCard(MIRAS).hide().insertAfter('.guest[data-name="Askar"]').fadeIn(600);
  } },
  { text: 'Natasha says goodbye and goes home', run: function () {
    return $('.guest[data-name="Natasha"]').fadeOut(600, function () { $(this).remove(); });
  } },
  { text: 'Who took the cake?', run: function () {
    return $('.floor[data-floor="1"] .guest.has-crumbs:not(.has-cup)').filter(function () {
      const minutes = $(this).data('minutes');
      return minutes > 1260 && minutes < 1290 && $(this).prev().add($(this).next()).is('.aitu');
    });
  } }
];

function showFound($found, rooms) {
  $('.found').removeClass('found');
  $found.addClass('found');
  if (!rooms) {
    $found.find('.box').stop(true).animate({ top: -14 }, 140).animate({ top: 0 }, 140);
  }
  const names = $found.map(function () {
    return $(this).attr('data-name') || $(this).attr('data-room');
  }).get();
  const what = rooms ? (names.length === 1 ? ' room: ' : ' rooms: ') : ' guests: ';
  $('#result').html('<b>Found ' + names.length + '</b>' + what + (names.join(', ') || 'nobody'));
}

$(function () {
  CASES.forEach(function (item, index) {
    $('<button type="button" class="case">').attr('data-case', index + 1)
      .html('<b>' + (index + 1) + '</b>' + item.text).appendTo('#cases');
  });
  $('#cases').on('click', '.case', function () {
    const item = CASES[$(this).data('case') - 1];
    $('.case').removeClass('active');
    $(this).addClass('active');
    buildPage();
    showFound(item.run(), item.rooms);
  });
  buildPage();
});

let sortedRooms = {};
let $pop = null;

const THING_WORDS = { phone: 'a phone', glasses: 'glasses', bag: 'a bag', cup: 'a cup', crumbs: 'cake crumbs' };

function readGuest($guest) {
  const things = $guest.attr('data-things');
  return {
    name: $guest.attr('data-name'),
    color: $guest.attr('data-color'),
    time: $guest.attr('data-time'),
    aitu: $guest.attr('data-aitu') === 'true',
    things: things ? things.split(' ') : []
  };
}

function settleAll() {
  $('.flyer, .slot, .pop').finish();
  $('.guest').finish('flip');
}

function closeCardNow() {
  $('.pop').stop(true).remove();
  $pop = null;
}

const showFoundBase = showFound;
showFound = function ($found, rooms) {
  showFoundBase($found, rooms);
  const $keep = rooms ? $found.find('.guest') : $found;
  $('.guest').not($keep).stop(true).fadeTo(300, 0.2);
};

const buildPageBase = buildPage;
buildPage = function () {
  settleAll();
  closeCardNow();
  sortedRooms = {};
  buildPageBase();
  $('.room-head').append('<button type="button" class="sort">Sort by time</button>');
};

function describe(info, roomName) {
  const items = info.things.map(function (thing) { return THING_WORDS[thing]; });
  const has = items.length === 0 ? 'Has nothing with them'
    : 'Has ' + (items.length > 1 ? items.slice(0, -1).join(', ') + ' and ' + items[items.length - 1] : items[0]);
  const floor = ROOMS.find(function (room) { return room.name === roomName; }).floor;
  return [
    'Came at ' + info.time,
    info.aitu ? 'AITU student' : 'Not an AITU student',
    'Wears ' + info.color,
    has,
    'Stands in the ' + roomName.toLowerCase() + ', floor ' + floor
  ];
}

function openCard($guest) {
  const name = $guest.attr('data-name');
  const same = $pop && $pop.attr('data-name') === name;
  closeCard();
  if (same) {
    return;
  }
  const info = readGuest($guest);
  const roomName = $guest.closest('.room').attr('data-room');
  const $list = $('<ul>');
  describe(info, roomName).forEach(function (line) { $list.append($('<li>').text(line)); });
  const $body = $('<div class="pop-body">').append($('<h3>').text(name), $list);
  ROOMS.forEach(function (room) {
    if (room.name !== roomName) {
      $body.append($('<button type="button" class="move">').attr('data-room', room.name).text('Move to the ' + room.name.toLowerCase()));
    }
  });
  const $card = $('<div class="pop">').attr('data-name', name).append($body)
    .css({ left: -9999, top: 0, width: 260 }).appendTo('body');
  const height = $card.outerHeight();
  const $avatar = $guest.find('.avatar');
  const a = $avatar.offset();
  const size = $avatar.outerWidth();
  const view = { left: $(window).scrollLeft(), top: $(window).scrollTop(), width: $(window).width(), height: $(window).height() };
  const left = Math.min(Math.max(a.left + size / 2 - 130, view.left + 8), view.left + view.width - 268);
  const top = Math.min(Math.max(a.top - 10, view.top + 8), view.top + view.height - height - 8);
  $body.css('opacity', 0);
  $card.css({ left: a.left, top: a.top, width: size, height: size, opacity: 0.3, borderRadius: size / 2 });
  $pop = $card;
  $card.animate({ left: left, top: top, width: 260, height: height, opacity: 1, borderRadius: 14 }, 280, function () {
    $body.fadeTo(150, 1);
  });
}

function closeCard() {
  if (!$pop) {
    return;
  }
  const $old = $pop;
  $pop = null;
  const $avatar = $('#house .guest[data-name="' + $old.attr('data-name') + '"] .avatar').first();
  $old.stop(true).addClass('closing').find('.pop-body').stop(true).css('opacity', 0);
  const now = $old.offset();
  const target = $avatar.length
    ? { left: $avatar.offset().left, top: $avatar.offset().top, size: $avatar.outerWidth() }
    : { left: now.left + $old.outerWidth() / 2, top: now.top + $old.outerHeight() / 2, size: 0 };
  $old.animate({ left: target.left, top: target.top, width: target.size, height: target.size, opacity: 0.3, borderRadius: target.size / 2 }, 220, function () {
    $(this).remove();
  });
}

function moveGuest(name, toName) {
  settleAll();
  closeCardNow();
  const $card = $('#house .guest[data-name="' + name + '"]').first();
  const $target = $('.room[data-room="' + toName + '"] .guests');
  const fromName = $card.closest('.room').attr('data-room');
  if (!$card.length || !$target.length || fromName === toName) {
    return;
  }
  const from = ROOMS.find(function (room) { return room.name === fromName; });
  const to = ROOMS.find(function (room) { return room.name === toName; });
  const index = from.guests.findIndex(function (guest) { return guest.name === name; });
  to.guests.push(index >= 0 ? from.guests.splice(index, 1)[0] : readGuest($card));
  sortedRooms[toName] = false;
  $target.closest('.room').find('.sort').removeClass('active');

  const width = $card.outerWidth();
  const height = $card.outerHeight();
  const margin = parseFloat($card.css('marginRight'));
  const start = $card.offset();
  const $flyer = $card.clone().addClass('flyer').css({ left: start.left, top: start.top, width: width }).appendTo('body');
  const $oldSlot = $('<div class="slot">').css({ width: width, height: height });
  const $newSlot = $('<div class="slot">').css({ width: width, height: height, marginRight: margin }).appendTo($target);
  $card.replaceWith($oldSlot);
  const end = $newSlot.offset();
  $newSlot.css({ width: 0, marginRight: 0 });

  $flyer.animate({ left: end.left, top: end.top }, 600, function () {
    $newSlot.stop(true).replaceWith($card);
    $flyer.remove();
  });
  $newSlot.animate({ width: width, marginRight: margin }, 600);
  $oldSlot.animate({ width: 0, marginRight: 0 }, 600, function () { $oldSlot.remove(); });
}

function arrayPosition(list, element) {
  const index = list.findIndex(function (guest) { return guest.name === $(element).attr('data-name'); });
  return index < 0 ? 999 : index;
}

function sortRoom($room) {
  $('.flyer, .slot').finish();
  const name = $room.attr('data-room');
  const sorted = !sortedRooms[name];
  sortedRooms[name] = sorted;
  $room.find('.sort').toggleClass('active', sorted);
  const $guests = $room.find('.guests');
  const $cards = $guests.children('.guest').stop('flip', true);
  const before = $cards.map(function () { return $(this).offset(); }).get();
  $cards.css({ left: 0, top: 0 });
  const list = ROOMS.find(function (room) { return room.name === name; }).guests;
  const order = $cards.toArray().sort(function (a, b) {
    return sorted ? $(a).data('minutes') - $(b).data('minutes') : arrayPosition(list, a) - arrayPosition(list, b);
  });
  $guests.append(order);
  $cards.each(function (i) {
    const now = $(this).offset();
    $(this).css({ left: before[i].left - now.left, top: before[i].top - now.top })
      .animate({ left: 0, top: 0 }, { duration: 500, queue: 'flip' }).dequeue('flip');
  });
}

$(function () {
  $('<button type="button" id="clear">Clear</button>').appendTo('#cases');
  $('#cases').on('click', '#clear', function () {
    $('.guest').stop(true).fadeTo(200, 1);
    $('.found').removeClass('found');
    $('.case').removeClass('active');
    $('#result').text('Choose a case.');
  });
  $('#house').on('click', '.guest', function () { openCard($(this)); });
  $(document).on('click', '.pop .move', function () {
    moveGuest($(this).closest('.pop').attr('data-name'), $(this).attr('data-room'));
  });
  $(document).on('click', '.sort', function () { sortRoom($(this).closest('.room')); });
  $(document).on('click', function (event) {
    if (!$(event.target).closest('.pop, .guest').length) {
      closeCard();
    }
  });
  $(document).on('keydown', function (event) {
    if (event.key === 'Escape') {
      closeCard();
    }
  });
});
