export const absorbtionTable = {
  frequencies: [125, 250, 500, 1000, 2000, 4000],
  SDI: {
    "High Diffusion SDI=1": {
      text: "Coffered ceiling with deep recesses and Random diffusing elements over the whole surface",
      value: 1,
    },
    "Mid Diffusion SDI = 0.5": {
      text: "Broken surfaces with shallow recesses. Flat surface behind a semitransparent hard screen",
      value: 0.5,
    },
    "Low Diffusion SDI = 0": {
      text: "Smooth flat or curved surfaces. Absorptive surface",
      value: 0,
    },
  },

  materials: {
    "Acoustic tile, rigid mount": [0.2, 0.4, 0.7, 0.8, 0.6, 0.4],
    "Acoustic tile, suspended": [0.5, 0.7, 0.6, 0.7, 0.7, 0.5],
    "Acoustical plaster": [0.1, 0.2, 0.5, 0.6, 0.7, 0.7],
    "Ordinary plaster, on lath": [0.2, 0.15, 0.1, 0.05, 0.04, 0.05],
    'Gypsum wallboard, 1/2" on studs': [0.3, 0.1, 0.05, 0.04, 0.07, 0.1],
    'Plywood sheet, 1/4" on studs': [0.6, 0.3, 0.1, 0.1, 0.1, 0.1],
    "Concrete block, unpainted": [0.4, 0.4, 0.3, 0.3, 0.4, 0.3],
    "Concrete block, painted": [0.1, 0.05, 0.06, 0.07, 0.1, 0.1],
    "Concrete, poured": [0.01, 0.01, 0.02, 0.02, 0.02, 0.03],
    Brick: [0.03, 0.03, 0.03, 0.04, 0.05, 0.07],
    "Vinyl tile on concrete": [0.02, 0.03, 0.03, 0.03, 0.03, 0.02],
    "Heavy carpet on concrete": [0.02, 0.06, 0.15, 0.4, 0.6, 0.6],
    "Heavy carpet on felt backing": [0.1, 0.3, 0.4, 0.5, 0.6, 0.7],
    "Platform floor, wooden": [0.4, 0.3, 0.2, 0.2, 0.15, 0.1],
    "Ordinary window glass": [0.3, 0.2, 0.2, 0.1, 0.07, 0.04],
    "Heavy plate glass": [0.2, 0.06, 0.04, 0.03, 0.02, 0.02],
    "Draperies, medium velour": [0.07, 0.3, 0.5, 0.7, 0.7, 0.6],
    "Upholstered seating, unoccupied": [0.2, 0.4, 0.6, 0.7, 0.6, 0.6],
    "Upholstered seating, occupied": [0.4, 0.6, 0.8, 0.9, 0.9, 0.9],
    "Wood seating, unoccupied": [0.02, 0.03, 0.03, 0.06, 0.06, 0.05],
    "Wooden pews, occupied": [0.4, 0.4, 0.7, 0.7, 0.8, 0.7],
  },
};
