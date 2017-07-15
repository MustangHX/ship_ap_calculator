function update_chart(pen_dict) {
  c3.generate({
    bindto: '#chart',
    data: {
      x: 'distance',
      columns: [
        ['distance'].concat(pen_dict.distance),
        ['vertical'].concat(pen_dict.armor_vert),
        ['horizontal'].concat(pen_dict.armor_hori)
      ]
    }
  });
}
