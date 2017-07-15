function update_chart(pen_dict) {
  xmax0=Math.max(...pen_dict.distance);
  xmax=Math.ceil(xmax0/5.)*5;
  console.log(xmax);
  xcount=xmax/5+1;
  c3.generate({
    bindto: '#chart',
    data: {
      x: 'distance',
      columns: [
        ['distance'].concat(pen_dict.distance),
        ['vertical armor'].concat(pen_dict.armor_vert),
        ['deck armor'].concat(pen_dict.armor_hori)
      ],
      //type:"spline",
      style:"dashed"
    },
    axis: {
      y: {
        label: { // ADD
          text: 'Penetration (mm)',
          position: 'outer-middle'
        }
      },
      x: {
        max: xmax*1.0,
        min: 0.,
        label: { // ADD
          text: 'Range (km)',
          position: 'outer-center'
        },

        tick: {
              //  fit: true
                format: d3.format('.2f'),
                count: xcount

            }
      },
    }
  });
}
