const rutas = [
  {
    ruta: 'Ruta 1',
    unit: 'Unidad A',
    fecha: '2025-05-10',
    paradas: [
      { nombre: 'Parada 1', hora: '08:00 AM' },
      { nombre: 'Parada 2', hora: '08:30 AM' },
      { nombre: 'Parada 3', hora: '09:00 AM' },
    ],
    quejas: [
      { parada: 'Parada 1', descripcion: 'El camión llegó tarde.' },
      { parada: 'Parada 2', descripcion: 'El camión no se detuvo.' },
    ],
  },
  {
    ruta: 'Ruta 2',
    unit: 'Unidad A',
    fecha: '2025-05-10',
    paradas: [
      { nombre: 'Parada A', hora: '09:00 AM' },
      { nombre: 'Parada B', hora: '09:30 AM' },
      { nombre: 'Parada C', hora: '10:00 AM' },
    ],
    quejas: [
      { parada: 'Parada A', descripcion: 'El servicio fue muy lento.' },
    ],
  },
    {
        ruta: 'Ruta 3',
        unit: 'Unidad B',
        fecha: '2025-05-11',
        paradas: [
        { nombre: 'Parada X', hora: '10:00 AM' },
        { nombre: 'Parada Y', hora: '10:30 AM' },
        { nombre: 'Parada Z', hora: '11:00 AM' },
        ],
        quejas: [
        { parada: 'Parada X', descripcion: 'El camión estaba sucio.' },
        { parada: 'Parada Y', descripcion: 'El aire acondicionado no funcionaba.' },
        ],
    },

    {
        ruta: 'Ruta 4',
        unit: 'Unidad C',
        fecha: '2025-05-12',
        paradas: [
        { nombre: 'Parada M', hora: '11:00 AM' },
        { nombre: 'Parada N', hora: '11:30 AM' },
        { nombre: 'Parada O', hora: '12:00 PM' },
        ],
        quejas: [
        { parada: 'Parada M', descripcion: 'El conductor fue grosero.' },
        ],
    },

    {
        ruta: 'Ruta 5',
        unit: 'Unidad D',
        fecha: '2025-05-13',
        paradas: [
        { nombre: 'Parada P', hora: '12:00 PM' },
        { nombre: 'Parada Q', hora: '12:30 PM' },
        { nombre: 'Parada R', hora: '01:00 PM' },
        ],
        quejas: [
        { parada: 'Parada P', descripcion: 'El camión estaba lleno.' },
        { parada: 'Parada Q', descripcion: 'El conductor no paró en la parada.' },
        ],
    },
];

export default rutas;
