export const template = {
  name: '',
  skills: {
    a: {
      desc: '',
      visualisation: {
        tiles: [''],
        overlay: [],
      },
    },
    b: {
      desc: '',
      visualisation: {
        tiles: [''],
        overlay: [],
      },
    },
    m: { desc: '' },
  },
};

const lv = {
  name: 'Lord Vader',
  skills: {
    a: {
      desc: 'Strzał, 1 obrażenie. Zadaj 1 obrażenie na każdym polu przyległym do celu.',
      visualisation: {
        tiles: ['nnnen', 'rneden', 'nnnen'],
        overlay: [
          { type: 'dotted-line', data: { start: { x: 20, y: 30 }, end: { x: 60, y: 30 } } },
        ],
      },
    },
    b: {
      desc:
        'Atak wręcz, tył, 2 obrażenia. Przesuń Lorda Vadera 1 pole do przodu i cel 1 pole do tyłu.',
      visualisation: {
        tiles: ['ndrn'],
        overlay: [
          { type: 'arrow', data: { type: 'L', offset: { x: 0, y: 0 } } },
          { type: 'arrow', data: { type: 'R', offset: { x: 60, y: 0 } } },
        ],
      },
    },
    m: { desc: 'Przesuń Lorda Vadera 1 lub 2 pola do przodu.' },
  },
};

const st = {
  name: 'Stormtrooper',
  skills: {
    a: {
      desc: 'Atak wręcz, 2 obrażenia.',
      visualisation: {
        tiles: ['nrddn'],
        overlay: [],
      },
    },
    b: {
      desc:
        'Sparaliżuj jednostki po prawej i lewej stronie Stormtroopera (jednostki sparaliżowane nie rozpatrują efektu kolejnej swojej odkrytej karty).',
      visualisation: {
        tiles: ['neuen'],
        overlay: [],
      },
    },
    m: { desc: 'Przesuń Stormtroopera 1 pole w dowolnym kierunku.' },
  },
};

const bh = {
  name: 'Bounty Hunter',
  skills: {
    a: {
      desc:
        'Przesuń Bounty Huntera dowolną lość pól do przodu ignorując przeszkody, zadaj 1 obrażenie każdej jednostce i budynkowi, na polach przez które przesunąłeś Bounty Huntera.',
      visualisation: {
        tiles: [''],
        overlay: [],
      },
    },
    b: {
      desc:
        'Zamień miejscami Bounty Huntera i dowolną jednostkę znajdującą się w tym samym wierszu albo kolumnie.',
      visualisation: {
        tiles: [''],
        overlay: [],
      },
    },
    m: { desc: 'Przesuń Bounty Huntera dowolną ilosć pól do przodu ignorując przeszkody.' },
  },
};

const pl = {
  name: 'Księżniczka Leia',
  skills: {
    a: {
      desc: 'Strzał, 1 obrażenie, obróć cel w kierunku Ksieżniczki Lei.',
      visualisation: {
        tiles: ['nrnndn'],
        overlay: [
          { type: 'dotted-line', data: { start: { x: 40, y: 10 }, end: { x: 80, y: 10 } } },
        ],
      },
    },
    b: {
      desc: 'Ściągnij jeden żeton obrażeń z jednostek znajdujących się przed i za Księżniczką.',
      visualisation: {
        tiles: ['neren'],
        overlay: [],
      },
    },
    m: {
      desc: 'Przesuś się o jedno lub dwa pola do przodu. Po ruchu możesz wykonać obrót o 90 st.',
    },
  },
};

const cb = {
  name: 'Chewbacca',
  skills: {
    a: {
      desc:
        'Atak wręcz, 2 obrażenia. Przesuń atakowany cel 1 pole do przodu, jeśli nie możesz tego zrobić, zadaj mu dodatkowe obrażenie.',
      visualisation: {
        tiles: ['nrdn'],
        overlay: [{ type: 'arrow', data: { type: 'R', offset: { x: 60, y: 0 } } }],
      },
    },
    b: {
      desc: 'Atak wręcz, 1 obrażenie.',
      visualisation: {
        tiles: ['ndddn', 'ndudn'],
        overlay: [],
      },
    },
    m: {
      desc:
        'Przesuń Chewbaccę o 1 lub 2 pola do przodu. Możesz wchodzić na pola zajęte przez inne jednostki, jeśli mozesz przesunąć je o 1 pole w kierunku, w którym porusza się Chewbacca.',
    },
  },
};

const rd = {
  name: 'R2-D2',
  skills: {
    a: {
      desc: 'Zadaj jedno obrażenie wszystkim jednostkom znajdującym się przed R2-D2.',
      visualisation: {
        tiles: ['rddddd'],
        overlay: [],
      },
    },
    b: {
      desc:
        'Przesuń R2-D2 o jedno pole w bok. Następnie zadaj 1 obrażenie jednoskom znajdującym się po obu stronach R2-D2.',
      visualisation: {
        tiles: ['ndudn'],
        overlay: [
          { type: 'arrow', data: { type: 'L', offset: { x: 20, y: 0 } } },
          { type: 'arrow', data: { type: 'R', offset: { x: 60, y: 0 } } },
        ],
      },
    },
    m: {
      desc: 'Przesuń R2-D2 o 1 lub 2 pola do przodu albo odepchnij sąsiadującą jednostkę o 1 pole.',
    },
  },
};

export const units = {
  template,
  lv,
  st,
  bh,
  pl,
  cb,
  rd,
};
